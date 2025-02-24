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
    if (this.selectedItemKey !== null) {
      return (
        this.items.find((item) => item.key === this.selectedItemKey) || null
      );
    }
    return null;
  }

  // 设置选中的菜单项
  public setSelectedItem(key: string): void {
    this.selectedItemKey = key;
  }
}
