import React, { useState, useEffect } from "react";
import { MenuModel, MenuItem } from "./models/MenuModel";
import MenuBar from "./components/MenuBar";
import ContentDisplay from "./components/ContentDisplay";

// ... existing code ...
// 样式
import styles from "./index.module.css";
// ViewModel
const MainPage: React.FC = () => {
  const [selectedKey, setselectedKey] = useState<string>("");
  const menuModel = new MenuModel(); // Model实例

  useEffect(() => {
    const initialItem = menuModel.getSelectedItem();
    if (initialItem) {
      setselectedKey(initialItem.key);
    }
  }, []);

  const handleMenuItemSelect = (key: string) => {
    console.log(key, "key");
    menuModel.setSelectedItem(key);
    const selectedItem = menuModel.getSelectedItem();
    if (selectedItem) {
      setselectedKey(selectedItem.key);
    }
  };

  const menuItems: MenuItem[] = menuModel.getItems();
  console.log(selectedKey, "selectedKey");

  return (
    <div className={styles["main-page"]}>
      <MenuBar items={menuItems} onMenuItemSelect={handleMenuItemSelect} />
      <ContentDisplay selectedKey={selectedKey} />
    </div>
  );
};

export default MainPage;
