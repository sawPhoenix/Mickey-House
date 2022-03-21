import { useRef, useState } from "react";
import { useMount } from "ahooks";

type CanvasProps = CanvasRenderingContext2D | null;
interface Point {
  x: number;
  y: number;
}
const WIDTH = 400;
const HEIGHT = 400;
interface Branch {
  start: Point;
  length: number;
  theta: number;
}
export default function canvasDemo() {
  const el = useRef<HTMLCanvasElement>(null);
  const ctx = () => el.current!.getContext("2d");

  function drawBranch(b: Branch) {
    lineTo(b.start, getEndPoint(b));
  }
  function lineTo(p1: Point, p2: Point) {
    ctx()?.beginPath();
    ctx()?.moveTo(p1.x, p1.y);
    ctx()?.lineTo(p2.x, p2.y);
    ctx()?.stroke();
  }

  function getEndPoint(b: Branch) {
    return {
      x: b.start.x + b.length * Math.cos(b.theta),
      y: b.start.y + b.length * Math.sin(b.theta),
    };
  }
  useMount(async () => {
    (function init() {
      ctx()!.strokeStyle = "#fff";

      const branch: Branch = {
        start: { x: WIDTH / 2, y: HEIGHT },
        length: 100,
        theta: -Math.PI / 2,
      };
      step(branch);
      drawBranch(branch);
    })();
  });

  function step(b: Branch) {
    const end = getEndPoint(b);
    drawBranch(b);
    if (Math.random() < 0.5) {
      step({
        start: end,
        length: b.length,
        theta: b.theta - 0.1,
      });
    }
    if (Math.random() < 0.5) {
      step({
        start: end,
        length: b.length,
        theta: b.theta + 0.1,
      });
    }
  }

  return (
    <div>
      <canvas
        ref={el}
        style={{ background: "#222" }}
        width={WIDTH}
        height={HEIGHT}
      ></canvas>
    </div>
  );
}
