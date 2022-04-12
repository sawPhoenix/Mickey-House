import React, { useEffect, useState } from "react";
import Button from "../PublicComponents/Button";
import classnames from "classnames";

const bgNumber = Math.floor(Math.random() * 30) + 1;
const BgImg = "bg_img";
const Layout: React.FC = (props) => {
  const [background, setBackground] = useState(0);

  useEffect(() => {
    setBackGround();
  }, []);
  const setBackGround = (bgImg?: number) => {
    const Bg_img =
      bgImg || Number(window.sessionStorage.getItem(BgImg) || bgNumber);
    window.sessionStorage.setItem(BgImg, Bg_img.toString());
    setBackground(Bg_img);
  };
  const className_bg = classnames("container", {
    [`bg${background}`]: true,
  });
  return (
    <div className={className_bg}>
      <main className="main">{props.children}</main>
      <div className="changebg_btn">
        <Button
          btnType="primary"
          onClick={() => {
            setBackGround(background >= 31 ? 1 : background + 1);
          }}
        >
          切换背景
        </Button>
      </div>
    </div>
  );
};
export default Layout;
