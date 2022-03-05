import * as mdx from "@mdx-js/react";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import Image from "next/image";
import remarkGfm from "remark-gfm";
import Code from "../components/Code";

const MDXComponentMapper: React.ComponentProps<
  typeof mdx.MDXProvider
>["components"] = {
  a: (props: any) => <a {...props} target="_blank"></a>,
  img: (props: any) => <Image src={props.src} width={500} height={250} />,
  code: (props: any) => <Code {...props}></Code>,
};

const MDXSerializer = (source: string): Promise<MDXRemoteSerializeResult> =>
  serialize(source, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
    },
    parseFrontmatter: true,
  });

export { MDXComponentMapper, MDXSerializer };
