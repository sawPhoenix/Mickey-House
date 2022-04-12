import { useRouter } from "next/router";
import Button from "components/PublicComponents/Button";
export default function Demo() {
  const history = useRouter();
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
        <Button
          btnType="primary"
          onClick={() => history.push("/Demo/Demos/ButtonType")}
        >
          Button Type
        </Button>
        <Button
          btnType="primary"
          onClick={() => history.push("/Demo/Demos/LazyMan")}
        >
          梅花效果
        </Button>
        <Button
          btnType="primary"
          onClick={() => history.push("/Demo/Demos/MineSweeper")}
        >
          扫雷
        </Button>
      </div>
    </div>
  );
}
