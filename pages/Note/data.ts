// This file is auto-generated. Do not edit manually.

// 导入文件数据

export interface FileData {
  name: string;
  key: string;
  path: string; // 记录文件的完整相对路径
  children?: FileData[]; // 子节点（文件夹下的文件或子文件夹）
}

export const directoryTree: FileData = {
  name: "markdown",
  key: "markdown",
  path: "markdown",
  children: [
    {
      name: "Brower",
      key: "Brower",
      path: "Brower/Brower",
      children: [
        {
          name: "basic.md",
          key: "basic",
          path: "Brower/basic.md",
        },
      ],
    },
    {
      name: "computerBase",
      key: "computerBase",
      path: "computerBase/computerBase",
      children: [
        {
          name: "base.md",
          key: "base",
          path: "computerBase/base.md",
        },
      ],
    },
    {
      name: "config",
      key: "config",
      path: "config/config",
      children: [
        {
          name: "prettier.md",
          key: "prettier",
          path: "config/prettier.md",
        },
      ],
    },
    {
      name: "Docker",
      key: "Docker",
      path: "Docker/Docker",
      children: [
        {
          name: "readme.md",
          key: "readme",
          path: "Docker/readme.md",
        },
      ],
    },
    {
      name: "Http",
      key: "Http",
      path: "Http/Http",
      children: [
        {
          name: "httpBasic.md",
          key: "httpBasic",
          path: "Http/httpBasic.md",
        },
      ],
    },
    {
      name: "JavaScript",
      key: "JavaScript",
      path: "JavaScript/JavaScript",
      children: [
        {
          name: "basic",
          key: "basic",
          path: "JavaScript\\basic/basic",
          children: [
            {
              name: "ES6.md",
              key: "ES6",
              path: "JavaScript\\basic/ES6.md",
            },
            {
              name: "jsBase.md",
              key: "jsBase",
              path: "JavaScript\\basic/jsBase.md",
            },
            {
              name: "jsScope.md",
              key: "jsScope",
              path: "JavaScript\\basic/jsScope.md",
            },
            {
              name: "jsThis.md",
              key: "jsThis",
              path: "JavaScript\\basic/jsThis.md",
            },
          ],
        },
        {
          name: "jsComponent.md",
          key: "jsComponent",
          path: "JavaScript/jsComponent.md",
        },
        {
          name: "questions.md",
          key: "questions",
          path: "JavaScript/questions.md",
        },
        {
          name: "React.md",
          key: "React",
          path: "JavaScript/React.md",
        },
      ],
    },
    {
      name: "Node.js",
      key: "Node.js",
      path: "Node.js/Node.js",
      children: [
        {
          name: "readme.md",
          key: "readme",
          path: "Node.js/readme.md",
        },
      ],
    },
    {
      name: "webpack",
      key: "webpack",
      path: "webpack/webpack",
      children: [
        {
          name: "webpack.md",
          key: "webpack",
          path: "webpack/webpack.md",
        },
      ],
    },
  ],
};
