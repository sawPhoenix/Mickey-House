// This file is auto-generated. Do not edit manually.
  
// 导入文件数据
import BrowerBasic from './markdown/Brower/BrowerBasic.md';
import computerBase from './markdown/computerBase.md';
import prettier from './markdown/config/prettier.md';
import DailyNote2025 from './markdown/Daily/DailyNote2025.md';
import Docker from './markdown/Docker.md';
import httpBasic from './markdown/Http/httpBasic.md';
import ES6 from './markdown/JavaScript/basic/ES6.md';
import jsBase from './markdown/JavaScript/basic/jsBase.md';
import jsScope from './markdown/JavaScript/basic/jsScope.md';
import jsThis from './markdown/JavaScript/basic/jsThis.md';
import questions from './markdown/JavaScript/questions.md';
import ReactNote from './markdown/JavaScript/ReactNote.md';
import NodeNote from './markdown/NodeNote.md';
import webpack from './markdown/webpack/webpack.md';

export interface FileData {
  name: string;
  key: string;
  path: string;  // 记录文件的完整相对路径
  children?: FileData[];  // 子节点（文件夹下的文件或子文件夹）
}

export const directoryTree: FileData = {
  "name": "markdown",
  "key": "markdown",
  "path": "markdown",
  "children": [
    {
      "name": "Brower",
      "key": "Brower",
      "path": "Brower/Brower",
      "children": [
        {
          "name": "BrowerBasic.md",
          "key": "BrowerBasic",
          "path": "Brower/BrowerBasic.md"
        }
      ]
    },
    {
      "name": "computerBase.md",
      "key": "computerBase",
      "path": "computerBase.md"
    },
    {
      "name": "config",
      "key": "config",
      "path": "config/config",
      "children": [
        {
          "name": "prettier.md",
          "key": "prettier",
          "path": "config/prettier.md"
        }
      ]
    },
    {
      "name": "Daily",
      "key": "Daily",
      "path": "Daily/Daily",
      "children": [
        {
          "name": "DailyNote2025.md",
          "key": "DailyNote2025",
          "path": "Daily/DailyNote2025.md"
        }
      ]
    },
    {
      "name": "Docker.md",
      "key": "Docker",
      "path": "Docker.md"
    },
    {
      "name": "Http",
      "key": "Http",
      "path": "Http/Http",
      "children": [
        {
          "name": "httpBasic.md",
          "key": "httpBasic",
          "path": "Http/httpBasic.md"
        }
      ]
    },
    {
      "name": "JavaScript",
      "key": "JavaScript",
      "path": "JavaScript/JavaScript",
      "children": [
        {
          "name": "basic",
          "key": "basic",
          "path": "JavaScript\\basic/basic",
          "children": [
            {
              "name": "ES6.md",
              "key": "ES6",
              "path": "JavaScript\\basic/ES6.md"
            },
            {
              "name": "jsBase.md",
              "key": "jsBase",
              "path": "JavaScript\\basic/jsBase.md"
            },
            {
              "name": "jsScope.md",
              "key": "jsScope",
              "path": "JavaScript\\basic/jsScope.md"
            },
            {
              "name": "jsThis.md",
              "key": "jsThis",
              "path": "JavaScript\\basic/jsThis.md"
            }
          ]
        },
        {
          "name": "questions.md",
          "key": "questions",
          "path": "JavaScript/questions.md"
        },
        {
          "name": "ReactNote.md",
          "key": "ReactNote",
          "path": "JavaScript/ReactNote.md"
        }
      ]
    },
    {
      "name": "NodeNote.md",
      "key": "NodeNote",
      "path": "NodeNote.md"
    },
    {
      "name": "webpack",
      "key": "webpack",
      "path": "webpack/webpack",
      "children": [
        {
          "name": "webpack.md",
          "key": "webpack",
          "path": "webpack/webpack.md"
        }
      ]
    }
  ]
};
