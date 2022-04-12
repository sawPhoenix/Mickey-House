import { useBoolean } from "ahooks";
import Button from "components/PublicComponents/Button";
import LazyManClass from "./LazyMan";
import ClubCanvas from "./Club";

export const WIDTH = 600;
export const HEIGHT = 600;
export default function LazyMan() {
  const [
    visibleClub,
    { setTrue: setVisibleClubTrue, setFalse: setVisibleClubFalse },
  ] = useBoolean();
  function LazyManText(name: string) {
    return new LazyManClass(name);
  }
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
          height: HEIGHT,
          width: WIDTH,
          margin: "auto",
        }}
      >
        {visibleClub && <ClubCanvas />}
      </div>
    </div>
  );
}
