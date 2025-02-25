// src/models/MenuModel.ts
import { directoryTree, FileData } from "../data";
export interface MenuItem extends FileData {}

export class MenuModel {
  private items: MenuItem[] = [];
  private selectedItemKey: string | null = null;

  constructor() {
    // 初始化菜单项
    this.items = directoryTree.children!;
  }

  // 获取所有菜单项
  public getItems(): MenuItem[] {
    return this.items;
  }

  // 获取选中的菜单项
  public getSelectedItem(): MenuItem | null {
    if (!this.selectedItemKey) return null;

    // 递归查找函数
    const findInTree = (items: MenuItem[]): MenuItem | null => {
      for (const item of items) {
        if (item.key === this.selectedItemKey) return item;
        if (item.children) {
          const found = findInTree(item.children);
          if (found) return found;
        }
      }
      return null;
    };

    return findInTree(this.items) || null;
  }

  // 设置选中的菜单项
  public setSelectedItem(key: string): void {
    this.selectedItemKey = key;
  }
}
