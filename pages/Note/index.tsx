import React, { useState, useEffect } from "react";
import { MenuModel, MenuItem } from "./models/MenuModel";
import MenuBar from "./components/MenuBar";
import ContentDisplay from "./components/ContentDisplay";

// 数据
// import basic from "./markdown/Brower/basic.md";
// import base from "./markdown/computerBase/base.md";
// import prettier from "./markdown/config/prettier.md";
// import readme from "./markdown/Docker/readme.md";
// import httpBasic from "./markdown/Http/httpBasic.md";
// import ES6 from "./markdown/JavaScript/basic/ES6.md";
// import jsBase from "./markdown/JavaScript/basic/jsBase.md";
// import jsScope from "./markdown/JavaScript/basic/jsScope.md";
// import jsThis from "./markdown/JavaScript/basic/jsThis.md";
// import jsComponent from "./markdown/JavaScript/jsComponent.md";
// import questions from "./markdown/JavaScript/questions.md";
// import JavaScriptReact from "./markdown/JavaScript/React.md";
// import Nodereadme from "./markdown/Node.js/readme.md";
// import webpack from "./markdown/webpack/webpack.md";

// 样式
import styles from "./index.module.css";
// ViewModel
const MainPage: React.FC = () => {
  const [selectedContent, setSelectedContent] = useState<string>("");
  const menuModel = new MenuModel(); // Model实例

  useEffect(() => {
    const initialItem = menuModel.getSelectedItem();
    if (initialItem) {
      setSelectedContent(initialItem.key);
    }
  }, []);

  const handleMenuItemSelect = (key: string) => {
    menuModel.setSelectedItem(key);
    const selectedItem = menuModel.getSelectedItem();
    if (selectedItem) {
      setSelectedContent(selectedItem.key);
    }
  };

  const menuItems: MenuItem[] = menuModel.getItems();

  return (
    <div className={styles["main-page"]}>
      <MenuBar items={menuItems} onMenuItemSelect={handleMenuItemSelect} />
      <ContentDisplay content={selectedContent} />
    </div>
  );
};

export default MainPage;
