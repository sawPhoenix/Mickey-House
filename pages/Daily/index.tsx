import React, { useState, useEffect } from "react";
import { Data2021, Data2020, Data2022, Data2025 } from "./note/data";
import Button from "../../components/PublicComponents/Button";
import Normal from "./model/Normal";
import Menu from "./model/Menu";
import { DailyType } from "./type";

const dataSoure: DailyType[] = [
  ...Data2020.map((v) => ({ ...v, year: 2020 })),
  ...Data2021.map((v) => ({ ...v, year: 2021 })),
  ...Data2022.map((v) => ({ ...v, year: 2022 })),
  ...Data2025.map((v) => ({ ...v, year: 2025 })),
];
const Daily: React.FC = () => {
  const [index, setIndex] = useState(dataSoure.length - 1);
  console.log(dataSoure);

  return (
    <div style={{ padding: 24 }}>
      <Menu
        index={index}
        data={dataSoure}
        onDataChange={(code) => {
          console.log(dataSoure.findIndex((v) => v.code === code));

          setIndex(dataSoure.findIndex((v) => v.code === code));
        }}
      />
      <Normal data={dataSoure[index]} />
      <Button
        disabled={index === 0}
        onClick={() => {
          if (index > 0) {
            setIndex(index - 1);
          }
        }}
      >
        上一篇
      </Button>
      <Button
        disabled={index === dataSoure.length - 1}
        onClick={() => {
          setIndex(index + 1);
        }}
      >
        下一篇
      </Button>
    </div>
  );
};
export default Daily;
