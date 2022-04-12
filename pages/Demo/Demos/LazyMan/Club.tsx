import React, { useRef, useState } from "react";
import { useMount } from "ahooks";
import { WIDTH, HEIGHT } from "./index";
interface Point {
  x: number;
  y: number;
}
interface Branch {
  start: Point;
  length: number;
  theta: number;
}
const CanvasDemo: React.FC = () => {
  const el = useRef<HTMLCanvasElement>(null);
  const ctx = () => el.current?.getContext("2d");

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
        length: 50,
        theta: -Math.PI / 2,
      };
      step(branch);
      drawBranch(branch);

      let frameCount = 0;
      function startFrame() {
        requestAnimationFrame(() => {
          frameCount += 1;
          if (frameCount % 6 === 0) frame();
          startFrame();
        });
      }
      startFrame();
    })();
  });

  const pendingTasks: Function[] = [];

  function step(b: Branch, depth = 0) {
    const end = getEndPoint(b);
    drawBranch(b);
    if (depth < 4 || Math.random() < 0.5) {
      pendingTasks.push(() =>
        step(
          {
            start: end,
            length: b.length + (Math.random() * 10 - 5),
            theta: b.theta - 0.4 * Math.random(),
          },
          depth + 1
        )
      );
    }
    if (depth < 4 || Math.random() < 0.5) {
      pendingTasks.push(() =>
        step(
          {
            start: end,
            length: b.length + (Math.random() * 10 - 5),
            theta: b.theta + 0.4 * Math.random(),
          },
          depth + 1
        )
      );
    }
  }
  function frame() {
    const tasks = [...pendingTasks];
    pendingTasks.length = 0;
    tasks.forEach((fn) => fn());
  }
  return (
    <div>
      <canvas ref={el} width={WIDTH} height={HEIGHT}></canvas>
    </div>
  );
};
export default CanvasDemo;
