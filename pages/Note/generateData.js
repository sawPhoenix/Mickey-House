const fs = require("fs");
const path = require("path");
const dataFileName = "markdown";
// 指定要读取的目录路径（比如 test 文件夹）
const directoryPath = path.join(__dirname, dataFileName); // 指定读取 test 文件夹

// 用于递归读取文件夹并生成树形结构
const generateDirectoryTree = (dirPath, basePath = "") => {
  const result = {
    name: path.basename(dirPath),
    key: path.basename(dirPath),
    path: path.posix.join(basePath, path.basename(dirPath)), // 记录文件夹的完整相对路径
    children: [],
  };

  const filesAndDirs = fs.readdirSync(dirPath);

  filesAndDirs.forEach((fileOrDir) => {
    const fullPath = path.join(dirPath, fileOrDir);
    const stats = fs.lstatSync(fullPath);

    if (stats.isDirectory()) {
      // 如果是文件夹，递归调用，传递当前路径
      result.children.push(
        generateDirectoryTree(fullPath, path.join(basePath, fileOrDir))
      );
    } else if (stats.isFile() && path.extname(fileOrDir) === ".md") {
      // 如果是 .md 文件，加入到当前目录的子节点中
      result.children.push({
        name: fileOrDir, // 文件名
        key: path.basename(fileOrDir, path.extname(fileOrDir)), // 去掉扩展名作为 key
        path: path.posix.join(basePath, fileOrDir), // 记录文件的完整相对路径
      });
    }
  });

  return result;
};
// 生成 TypeScript 定义文件，包含相对路径的 import 语句
const generateTypeScriptFile = (directoryTree) => {
  // TypeScript 文件头部内容
  const tsContent = `// This file is auto-generated. Do not edit manually.
  
// 导入文件数据
`;

  // 递归生成 import 语句
  const generateImports = (dir) => {
    let imports = "";
    if (dir.children) {
      dir.children.forEach((item) => {
        if (item.children) {
          // 如果是文件夹，递归处理
          imports += generateImports(item);
        } else {
          // 如果是文件，生成 import 语句
          const relativePath = item.path.replace(/\\/g, "/"); // 替换反斜杠为正斜杠
          console.log(relativePath, "relativePath");

          imports += `import ${item.key} from './${dataFileName}/${relativePath}';\n`;
        }
      });
    }
    return imports;
  };

  // 获取所有文件的 import 语句
  const importStatements = generateImports(directoryTree);

  // 生成最终的 TypeScript 文件内容
  const tsFooter = `
export interface FileData {
  name: string;
  key: string;
  path: string;  // 记录文件的完整相对路径
  children?: FileData[];  // 子节点（文件夹下的文件或子文件夹）
}

export const directoryTree: FileData = ${JSON.stringify(
    directoryTree,
    null,
    2
  )};
`;

  // 写入到 data.ts 文件
  fs.writeFileSync(
    path.join(__dirname, "data.ts"),
    tsContent + importStatements + tsFooter,
    "utf-8"
  );
};

// 生成树形目录结构并写入 TypeScript 文件
const directoryTree = generateDirectoryTree(directoryPath);
generateTypeScriptFile(directoryTree);

console.log("data.ts file has been generated successfully!");
