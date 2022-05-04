import React from "react";
import useFlip from "../../hooks/useFileList";

interface ItemType {
  key: React.Key;
  value: React.ReactNode;
}
interface ViewProps {
  items: ItemType[];
}

export const invert = (delta: ClientRect, elem: HTMLElement) => {
  elem.style.transform = `translate(${delta.left}px,${delta.top}px)`;
  elem.style.transition = `transform 0s`;
};

export const play = (elem: HTMLElement) => {
  elem.style.transform = ``;
  elem.style.transition = `transform 300ms ease`;
};

export default function List({ items }: ViewProps) {
  const listRef = React.createRef<HTMLUListElement>();
  useFlip({
    root: listRef,
    invert,
    play,
  });
  return (
    <ul ref={listRef} style={{ listStyle: "none" }}>
      {items.map((item) => (
        <li data-key={item.key} key={item.key}>
          {item.value}
        </li>
      ))}
    </ul>
  );
}
