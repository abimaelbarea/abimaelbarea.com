import * as mdx from "@mdx-js/react";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import Image from "next/image";
import remarkGfm from "remark-gfm";
import Code from "../components/code";

const MDXComponentMapper: React.ComponentProps<
  typeof mdx.MDXProvider
>["components"] = {
  a: (props: any) => <a {...props} target="_blank"></a>,
  img: (props: any) => (
    <div className="img-wrapper">
      <Image src={props.src} width={500} height={250} />
    </div>
  ),
  code: (props: any) => <Code {...props}></Code>,
  table: (props: any) => (
    <div className="table-wrapper">
      <table {...props}></table>
    </div>
  ),
};

const MDXSerializer = (source: string): Promise<MDXRemoteSerializeResult> =>
  serialize(source, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
    },
    parseFrontmatter: true,
  });

export { MDXComponentMapper, MDXSerializer };
