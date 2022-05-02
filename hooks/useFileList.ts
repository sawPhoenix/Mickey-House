import { useRef, useLayoutEffect } from "react";

interface FlipProps {
  root: React.RefObject<HTMLUListElement>;
  invert: any;
  play: any;
}

interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

const useFlip = ({ root, invert, play }: FlipProps) => {
  const origins = useRef<{ [key: string]: ClientRect }>({});
  const firstRun = useRef(true);
  useLayoutEffect(() => {
    if (root.current === null) return;
    const list = root.current;
    const children: HTMLElement[] = Array.prototype.slice.call(list.children);

    for (const child of children) {
      const key = child.dataset.key!;

      const next = child.getBoundingClientRect();
      if (!firstRun.current) {
        if (key in origins.current) {
          const previous = origins.current[key];
          const delta = getDelta(previous, next);
          if (!isZero(delta)) {
            invertAndPlay(delta, child);
            invert(delta, child);
            requestAnimationFrame(() => {
              play(child);
            });
          }
        }
      }
      origins.current[key] = next;
    }
    firstRun.current = false;
  }, [root, invert, play]);
};

const getDelta = (start: Rect, target: Rect) => ({
  top: start.top - target.top,
  left: start.left - target.left,
  width: start.width / target.width,
  height: start.height / target.height,
});

const isZero = (delta: Rect) =>
  delta.left === 0 &&
  delta.top === 0 &&
  delta.width === 1 &&
  delta.height === 1;

const invertAndPlay = (delta: Rect, elem: HTMLElement) => {
  elem.animate(
    [
      {
        transform: `translate(${delta.left}px,${delta.top}px)`,
      },
      {
        transform: "none",
      },
    ],
    { duration: 300 }
  );
};

export default useFlip;
