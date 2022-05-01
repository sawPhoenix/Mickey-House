// import { useRouter } from "next/router";
// import Image from "next/image";
// import Button from "components/PublicComponents/Button";
// import React from "react";
// import one from "assets/background/1.jpg";
// export default function Demo() {
//   const history = useRouter();
//   React.useEffect(() => {});

//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//       }}
//     >
//       <div
//         style={{ overflow: "hidden", width: 100 }}
//         onClick={() => {
//           history.push("../");
//         }}
//       >
//         <Image layout="responsive" width={200} height={200} src={one} alt="" />
//       </div>
//     </div>
//   );
// }

import React, { useLayoutEffect, useRef, useState } from "react";

interface ViewProps {
  items: any[];
}

export default function List({ items }: ViewProps) {
  const listRef = React.createRef<HTMLUListElement>();
  useFlip({
    root: listRef,
    invert,
    play,
  });
  return (
    <ul ref={listRef}>
      {items.map((item) => (
        <li data-key={item} key={item}>
          {item}
        </li>
      ))}
    </ul>
  );
}

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
            // invert(delta, child);
            // requestAnimationFrame(() => {
            //     play(child)
            // })
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

const invert = (delta: ClientRect, elem: HTMLElement) => {
  elem.style.transform = `translate(${delta.left}px,${delta.top}px)`;
  elem.style.transition = `transform 0s`;
};

const play = (elem: HTMLElement) => {
  elem.style.transform = ``;
  elem.style.transition = `transform 300ms ease`;
};

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
