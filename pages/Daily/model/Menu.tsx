import React, { useState } from "react";
import { DailyType } from "../type";
import Button from "components/PublicComponents/Button";
interface NormalProps {
  data: DailyType[];
  onDataChange?: (val: string) => void;
}
const Normal: React.FC<NormalProps> = ({ data, onDataChange }) => {
  const [nowYear, setNowYear] = useState<number>(data[0].year);
  const yearList = Array.from(new Set(data.map((v) => v.year)));

  return (
    <div>
      <div
        style={{
          margin: "20px 0",
        }}
      >
        {yearList.map((year) => (
          <Button btnType="primary" onClick={() => setNowYear(year)}>
            {year}
          </Button>
        ))}
      </div>
      <div>
        {data
          .filter((v) => v.year === nowYear)
          .map((v) => (
            <Button btnType="primary" onClick={() => onDataChange?.(v.code)}>
              {v.title}
            </Button>
          ))}
      </div>
    </div>
  );
};
export default Normal;
