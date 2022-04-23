import fs from "fs";

const contentPaths = {
  posts: {
    folder: `${process.cwd()}/public/blog`,
    item: (folder: string) =>
      `${process.cwd()}/public/blog/${folder}/readme.mdx`,
  },
};

const readContentDirectory = (directory: string) => fs.readdirSync(directory);

const readContentFile = (filePath: string) => fs.readFileSync(filePath, "utf8");

export { contentPaths, readContentDirectory, readContentFile };
