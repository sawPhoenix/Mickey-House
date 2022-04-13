import { BlockState } from "./type";
import boom from "assets/boom.svg";
import flag from "assets/flag.svg";
import classNames from "classnames";
import React from "react";
import Image from "next/image";
interface MineBlockProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  block: BlockState;
}
interface MineBlockRef {}
const numberColors = [
  "mine-revealed",
  "mine-one",
  "mine-two",
  "mine-three",
  "mine-four",
  "mine-five",
  "mine-six",
  "mine-seven",
];
const MineBlock: React.ForwardRefRenderFunction<
  MineBlockRef,
  MineBlockProps
> = ({ block, ...restProps }, ref) => {
  const BlockClass = (block: BlockState) => {
    if (block.flagged) return "mine-normal";
    if (!block.revealed) {
      return "mine-normal";
    }
    return block.mine ? "mine-self" : numberColors[block.adjacentMines];
  };

  React.useImperativeHandle(ref, () => ({}));
  const BlockRender = () => {
    if (block.flagged) {
      return <Image className="mine-flag" src={flag} />;
    } else if (block.revealed) {
      if (block.mine) {
        return <Image className="mine-boom" src={boom} />;
      } else {
        return <div>{block.adjacentMines > 0 ? block.adjacentMines : ""}</div>;
      }
    }
    return <></>;
  };

  return (
    <button
      className={classNames("MineBlock-btn", {
        [BlockClass(block)]: true,
      })}
      {...restProps}
    >
      {BlockRender()}
    </button>
  );
};
export default React.forwardRef(MineBlock);
