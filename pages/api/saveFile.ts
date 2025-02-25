import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { title, content } = req.body;

    // 生成数据
    const noteData = {
      title,
      date: new Date().toISOString(),
      code: uuidv4(), // 生成唯一代码
      content: content.split("\n"), // 将内容按行转换为数组
    };

    // 创建notes目录（如果不存在）
    const dir = path.join(process.cwd(), "notes");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // 生成文件名
    const filename = path.join(dir, `${noteData.code}.json`);

    try {
      fs.writeFileSync(filename, JSON.stringify(noteData, null, 2));
      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "保存失败" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
