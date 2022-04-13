import { useEffect, useRef, useState } from "react";
import { useBoolean, useSetState } from "ahooks";
import Button from "components/PublicComponents/Button";
import MineBlock from "./MineBlock";
import type { BlockState } from "./type";
import { log } from "console";
import moment from "moment";
const directions = [
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, 1],
];
type GameStatus = "play" | "won" | "lost";
interface GameState {
  board: BlockState[][];
  mineGenerated: boolean;
  status: GameStatus;
  startMS: number;
  endMS: number;
}

interface BoardOptions {
  width: number;
  height: number;
  mines: number;
}
const difficulty = {
  easy: {
    width: 9,
    height: 9,
    mines: 10,
  },
  medium: {
    width: 16,
    height: 16,
    mines: 40,
  },
  hard: {
    width: 16,
    height: 30,
    mines: 99,
  },
};
const now = Date.now();
export default function MineSweeper() {
  const [size, setSize] = useSetState<BoardOptions>(difficulty.easy);
  const [state, setState] = useSetState<GameState>({
    board: [[]],
    mineGenerated: false,
    status: "play",
    startMS: 0,
    endMS: 0,
  });

  const timerMS = useRef(0);

  useEffect(() => {
    timerMS.current = Math.round((state.endMS - state.startMS) / 1000);
  }, []);
  const isOver = useRef(false);

  const reset = (s?: BoardOptions) => {
    s && setSize(s);
    const rows = s?.height || size.height;
    const cols = s?.width || size.width;
    const newBoard = Array.from({ length: rows }, (_, y) =>
      Array.from(
        { length: cols },
        (_, x): BlockState => ({
          x,
          y,
          revealed: false,
          adjacentMines: 0,
        })
      )
    );
    setState({
      startMS: +Date.now(),
      board: newBoard,
      mineGenerated: false,
      status: "play",
    });
    isOver.current = false;
  };

  function randomRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  function randomInt(min: number, max: number) {
    return Math.round(randomRange(min, max));
  }

  function generateMines(nowstate: BlockState[][], initial: BlockState) {
    const placeRandom = () => {
      const x = randomInt(0, size.width - 1);
      const y = randomInt(0, size.height - 1);

      const block = nowstate[y][x];
      if (
        Math.abs(initial.x - block.x) <= 1 &&
        Math.abs(initial.y - block.y) <= 1
      )
        return false;
      if (block.mine) return false;
      block.mine = true;
      return true;
    };
    Array.from({ length: size.mines }, () => null).forEach(() => {
      let placed = false;
      while (!placed) placed = placeRandom();
    });

    updateNumbers();
  }

  function updateNumbers() {
    let newboard = state.board;
    newboard.forEach((row) => {
      row.forEach((block) => {
        if (block.mine) return;
        getSiblings(block).forEach((b) => {
          if (b.mine) block.adjacentMines += 1;
        });
      });
    });
    setState({
      board: newboard,
    });
  }
  function checkGameState() {
    if (!state.mineGenerated) return;

    const blocks = state.board!.flat();

    if (
      blocks.every((block) => block.revealed || block.flagged || block.mine)
    ) {
      if (blocks.some((block) => block.flagged && !block.mine)) {
        onGameOver("lost");
      } else {
        onGameOver("won");
      }
    }
  }
  function getSiblings(block: BlockState) {
    return directions
      .map(([dx, dy]) => {
        const x2 = block.x + dx;
        const y2 = block.y + dy;
        if (x2 < 0 || x2 >= size.width || y2 < 0 || y2 >= size.height)
          return undefined;

        return state.board![y2][x2];
      })
      .filter(Boolean) as unknown as BlockState[];
  }
  useEffect(() => {
    checkGameState();
  }, []);
  function showAllMines() {
    state.board.flat().forEach((i) => {
      if (i.mine) i.revealed = true;
    });
  }
  function onGameOver(status: GameStatus) {
    state.status = status;
    state.endMS = +Date.now();
    if (status === "lost") {
      showAllMines();
      setTimeout(() => {
        alert("lost");
      }, 10);
    }
  }

  function onBlockClick(block: BlockState) {
    if (state.status !== "play" || block.flagged) return;

    if (!state.mineGenerated) {
      generateMines(state.board, block);
      state.mineGenerated = true;
    }
    block.revealed = true;
    if (block.mine) {
      onGameOver("lost");
    }
    expendZero(block);
    setState({ board: onSetStateHandle(block) });
  }
  function autoExpand(block: BlockState) {
    if (state.status !== "play" || block.flagged) return;

    const siblings = getSiblings(block);
    const flags = siblings.reduce((a, b) => a + (b.flagged ? 1 : 0), 0);
    const notRevealed = siblings.reduce(
      (a, b) => a + (!b.revealed && !b.flagged ? 1 : 0),
      0
    );
    if (flags === block.adjacentMines) {
      siblings.forEach((i) => {
        if (i.revealed || i.flagged) return;
        i.revealed = true;
        expendZero(i);
        if (i.mine) onGameOver("lost");
      });
    }
    const missingFlags = block.adjacentMines - flags;
    if (notRevealed === missingFlags) {
      siblings.forEach((i) => {
        if (!i.revealed && !i.flagged) {
          i.flagged = true;
        }
      });
    }
    setState({ board: onSetStateHandle(block) });
  }
  function onRightClick(block: BlockState) {
    if (state.status !== "play") {
      return;
    }
    if (!block.revealed) {
      block.flagged = !block.flagged;
    }

    setState({ board: onSetStateHandle(block) });
  }
  function expendZero(block: BlockState) {
    if (block.adjacentMines) return;
    getSiblings(block).forEach((s) => {
      if (!s.revealed) {
        s.revealed = true;
        expendZero(s);
      }
    });
    setState({ board: onSetStateHandle(block) });
  }
  function onSetStateHandle(block: BlockState) {
    let board = state.board;
    board[block.y][block.x] = block;
    return board;
  }

  console.log(state);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          margin: 20,
        }}
      >
        <Button btnType="primary" onClick={() => reset(difficulty.easy)}>
          Easy
        </Button>
        <Button btnType="primary" onClick={() => reset(difficulty.medium)}>
          Medium
        </Button>
        <Button btnType="primary" onClick={() => reset(difficulty.hard)}>
          Hard
        </Button>
        <Button btnType="danger" onClick={() => reset()}>
          RESET
        </Button>
      </div>
      <div style={{ color: "#fff" }}>{timerMS.current}</div>
      <div style={{ color: "#fff" }}>{timerMS.current}</div>
      <div
        style={{
          background: "#222",
          margin: "auto",
        }}
      >
        {state.board?.map((row, y) => (
          <div key={y} className="mine-rows">
            {row.map((block, x) => (
              <MineBlock
                key={x}
                block={block}
                onClick={() => onBlockClick(block)}
                onDoubleClick={() => autoExpand(block)}
                onContextMenu={(e) => {
                  e.preventDefault();
                  onRightClick(block);
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
