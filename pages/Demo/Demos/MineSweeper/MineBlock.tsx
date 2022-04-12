import { BlockState } from "./type";
import boom from "assets/boom.svg";
import flag from "assets/flag.svg";
import classNames from "classnames";
import React from "react";

interface MineBlockProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  block: BlockState;
}
interface MineBlockRef {}
const numberColors = [
  "mine-revealed",
  "mine-blue",
  "mine-green",
  "mine-yellow",
  "mine-orange",
  "mine-purple",
  "mine-pink",
  "mine-pink",
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
  console.log(block);

  React.useImperativeHandle(ref, () => ({}));
  const BlockRender = () => {
    if (block.flagged) {
      return <img className="mine-flag" src={flag} />;
    } else if (block.revealed) {
      if (block.mine) {
        return <img className="mine-boom" src={boom} />;
      } else {
        <div>{block.adjacentMines}</div>;
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
