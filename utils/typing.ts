import { PostInfo } from "../types/post.types";

declare module "next-mdx-remote" {
  export type MDXRemoteSerializeResult = {
    compiledSource: string;
    frontmatter: PostInfo;
  };
}
