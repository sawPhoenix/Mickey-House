import React, { useState } from "react";
import { MenuItem } from "../models/MenuModel";
import styles from "../index.module.css";

interface MenuBarProps {
  items: MenuItem[];
  onMenuItemSelect: (key: string) => void;
}

const MenuBar: React.FC<MenuBarProps> = ({ items, onMenuItemSelect }) => {
  // 状态来追踪当前选中的菜单项和展开的菜单项
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set());
  const [isOpen, setIsOpen] = useState(false); // 用于控制菜单的显示和隐藏

  // 处理菜单项选择
  const handleMenuItemSelect = (key: string) => {
    setSelectedKey(key); // 更新选中的菜单项
    onMenuItemSelect(key); // 执行外部的选择回调
  };

  // 处理展开或收起子菜单
  const handleToggleExpand = (key: string) => {
    const newExpandedKeys = new Set(expandedKeys);
    if (newExpandedKeys.has(key)) {
      newExpandedKeys.delete(key);
    } else {
      newExpandedKeys.add(key);
    }
    setExpandedKeys(newExpandedKeys); // 更新展开的菜单项
  };

  // 切换菜单栏的显示或隐藏
  const onMenuShow = () => {
    setIsOpen(true);
  };
  const onMenuHide = () => {
    setIsOpen(false);
  };

  // 渲染树形菜单项
  const renderMenuItems = (items: MenuItem[]) => {
    return items.map((item) => (
      <li key={item.key} className={styles["menu-item"]}>
        <div
          className={`${styles["menu-item-content"]} ${
            selectedKey === item.key ? styles.selected : ""
          }`}
          onClick={() => handleMenuItemSelect(item.key)}
        >
          {item.children && item.children.length > 0 && (
            <span
              className={styles["expand-icon"]}
              onClick={(e) => {
                e.stopPropagation(); // 防止点击展开图标时触发选择事件
                handleToggleExpand(item.key);
              }}
            >
              {expandedKeys.has(item.key) ? "[-]" : "[+]"}
            </span>
          )}
          {item.name}
        </div>

        {item.children &&
          item.children.length > 0 &&
          expandedKeys.has(item.key) && (
            <ul
              className={`${styles["sub-menu"]} ${
                expandedKeys.has(item.key) ? styles.expanded : ""
              }`}
            >
              {renderMenuItems(item.children)}
            </ul>
          )}
      </li>
    ));
  };

  return (
    <>
      <button
        className={styles["menu-open-toggle"]}
        onMouseEnter={onMenuShow}
      />
      <div
        onMouseLeave={onMenuHide}
        className={`${styles["menu-bar"]}  ${isOpen ? styles.open : ""}`}
      >
        <ul>{renderMenuItems(items)}</ul>
      </div>
    </>
  );
};

export default MenuBar;
