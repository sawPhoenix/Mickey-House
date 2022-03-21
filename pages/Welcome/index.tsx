import React from "react";
import { useRouter } from "next/router";
import Button from "../../components/PublicComponents/Button";
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
      </div>
    </div>
  );
};
export default WolCome;
