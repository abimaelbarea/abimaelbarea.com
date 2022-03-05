import fs from "fs";

export const readContentDirectory = (directory: string) =>
  fs.readdirSync(directory);
export const readContentFile = (filePath: string) =>
  fs.readFileSync(filePath, "utf8");
