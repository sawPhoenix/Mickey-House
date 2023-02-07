import React, { useReducer } from "react";
import { useRouter } from "next/router";
import Button from "../../components/PublicComponents/Button";

const initialState = { count: 0 };

const WolCome: React.FC = () => {
  const history = useRouter();
  return (
    <div>
      <div className="menu_model">
        <Button
          data-cy="to_Algorithm"
          onClick={() => {
            console.log(history.push("/Algorithm"));
          }}
        >
          to Algorithm
        </Button>
        <Button
          data-cy="to_Daily"
          onClick={() => {
            console.log(history.push("/Daily"));
          }}
        >
          to Daily
        </Button>
        <Button
          data-cy="to_Daily"
          onClick={() => {
            console.log(history.push("/Demo"));
          }}
        >
          to Demo
        </Button>
        <Button
          data-cy="to_Daily"
          onClick={() => {
            console.log(history.push("/ThreeD"));
          }}
        >
          to ThreeD Demo
        </Button>

        <div>
          待解决问题：
          <ul>
            <li>断点续传</li>
            <li>从输入url到显示发成了什么</li>
            <li>npm线上打包</li>
          </ul>
        </div>
        <div>
          待办事项：
          <ul>
            <li>做一个有趣的menu组件</li>
            <li>Markdown文件编译成js显示在页面中</li>
            <li>跨路由动画组件</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default WolCome;
