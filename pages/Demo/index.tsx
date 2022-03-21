import Demojs from "./demojs";
import ClubCanvas from "./Club";
import { useBoolean } from "ahooks";
import Button from "components/PublicComponents/Button";
export default function () {
  const [
    visibleClub,
    { setTrue: setVisibleClubTrue, setFalse: setVisibleClubFalse },
  ] = useBoolean();
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
        <Button btnType="primary" onClick={setVisibleClubTrue}>
          梅花效果
        </Button>
        <Button btnType="danger" onClick={setVisibleClubFalse}>
          RESET
        </Button>
      </div>
      {/* <Demojs /> */}

      <div
        style={{
          background: "#222",
          opacity: "0.5",
          height: 600,
          width: 800,
          margin: "auto",
        }}
      >
        {visibleClub && <ClubCanvas />}
      </div>
    </div>
  );
}
