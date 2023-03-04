import * as React from "react";
import { useBoolean } from "ahooks";
import { sleep } from "utils/utils";
import Button from "components/PublicComponents/Button";
import { Sorted } from "./MapData";
function cx(val = "") {
  return "demo-map" + val;
}
function init() {
  let list = Array(10000).fill(0);
  //  for(let y = 0; y < 100; y++) {
  //     for()
  //  }
}
export default function Map() {
  let mousedown = false,
    clear = false;
  const mapRef = React.useRef<number[]>();
  const boxRef = React.createRef<HTMLDivElement>();
  mapRef.current = Array(10000).fill(0);
  React.useEffect(() => {
    document.addEventListener("mousedown", (e) => {
      mousedown = true;
      clear = e.which === 3;
    });
    document.addEventListener("mouseup", () => (mousedown = false));
    document.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });
  });
  /**
   * 寻路算法
   * 深度优先搜索：stack 搜索 pop  和 push 出入栈
   * 广度优先搜索：queue 搜索 shift 和 push 出入队列
   * @param map
   * @param start
   * @param end
   * @returns
   */
  function path(map: number[], start: number[], end: number[]) {
    var queue = [start];

    function insert(x: number, y: number) {
      if (x < 0 || x >= 100 || y < 0 || y >= 100) return;
      if (map[y * 100 + x]) return;
      map[y * 100 + x] = 2;
      queue.push([x, y]);
    }
    while (queue.length) {
      //shift 改成 pop 为深度优先搜索
      let [x, y] = queue.shift() as number[];
      console.log(x, y);
      if (x === end[0] && y === end[1]) {
        return true;
      }
      insert(x - 1, y);
      insert(x, y - 1);
      insert(x + 1, y);
      insert(x, y + 1);
    }
  }
  // 异步处理
  async function pathAsync(map: number[], start: number[], end: number[]) {
    var queue = [start];

    async function insert(x: number, y: number) {
      if (x < 0 || x >= 100 || y < 0 || y >= 100) return;
      if (map[y * 100 + x]) return;
      await sleep(30);
      boxRef.current!.children[y * 100 + x]!.style.backgroundColor =
        "lightgreen";
      map[y * 100 + x] = 2;
      queue.push([x, y]);
    }
    while (queue.length) {
      //shift 改成 pop 为深度优先搜索
      let [x, y] = queue.shift() as number[];
      //   console.log(x, y);
      if (x === end[0] && y === end[1]) {
        return true;
      }
      await insert(x - 1, y);
      await insert(x, y - 1);
      await insert(x + 1, y);
      await insert(x, y + 1);
    }
  }

  // 寻找最短路径 启发式搜索  A*
  async function findPathAsync(map: any[], start: number[], end: number[]) {
    let table = Object.create(map);
    var queue = new Sorted<number[]>(
      [start],
      (a: number[], b: number[]) => distance(a) - distance(b)
    );

    async function insert(x: number, y: number, pre: number[]) {
      if (x < 0 || x >= 100 || y < 0 || y >= 100) return;
      //TODO: 最短路径可优化
      if (map[y * 100 + x]) return;
      await sleep(30);
      boxRef.current!.children[y * 100 + x].style.backgroundColor =
        "lightgreen";
      //TODO: 最短路径可优化
      map[y * 100 + x] = pre;
      queue.give([x, y]);
    }
    function distance(point: number[]): number {
      return point[0] - end[0] ** 2 + (point[1] - end[1]) ** 2;
    }
    while (queue.data.length) {
      //shift 改成 pop 为深度优先搜索
      let [x, y] = queue.take() as number[];
      //   console.log(x, y);
      if (x === end[0] && y === end[1]) {
        let path = [];
        while (x != start[0] || y != start[1]) {
          path.push(map[y * 100 + x]);
          [x, y] = table[y * 100 + x];
          boxRef.current!.children[y * 100 + x].style.backgroundColor =
            "purple";
        }
        return path;
      }

      await insert(x - 1, y, [x, y]);
      await insert(x, y - 1, [x, y]);
      await insert(x + 1, y, [x, y]);
      await insert(x, y + 1, [x, y]);
      // 斜向
      await insert(x - 1, y - 1, [x, y]);
      await insert(x + 1, y - 1, [x, y]);
      await insert(x - 1, y + 1, [x, y]);
      await insert(x + 1, y + 1, [x, y]);
    }
    return null;
  }
  return (
    <div>
      <Button
        onClick={() => {
          mapRef.current && pathAsync(mapRef.current, [0, 0], [50, 50]);
        }}
      >
        触发
      </Button>
      <div ref={boxRef} className={cx()}>
        {mapRef.current.map((v, idx) => {
          const ref = React.createRef<HTMLDivElement>();

          return (
            <div
              key={idx}
              ref={ref}
              onMouseMove={(e) => {
                if (mousedown) {
                  if (clear) {
                    if (ref.current) {
                      ref.current.style.backgroundColor = "";
                      //   mapRef.current?.[idx] = 1
                    }
                  } else {
                    if (ref.current) {
                      ref.current.style.backgroundColor = "black";
                    }
                  }
                }
              }}
              className={cx("-cell")}
            ></div>
          );
        })}
      </div>
    </div>
  );
}
