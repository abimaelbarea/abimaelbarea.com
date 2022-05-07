import * as mdx from "@mdx-js/react";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import Image from "next/image";
import Link from "next/link";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import Code from "../components/Code";

const header = ({ level, children, id }: any) => {
  const CustomHeader = `h${level}` as keyof JSX.IntrinsicElements;
  return (
    <CustomHeader id={id}>
      <Link href={`#${id}`}>{children}</Link>
    </CustomHeader>
  );
};

const MDXComponentMapper: React.ComponentProps<
  typeof mdx.MDXProvider
>["components"] = {
  h1: (props) => header({ ...props, level: 1 }),
  h2: (props) => header({ ...props, level: 2 }),
  h3: (props) => header({ ...props, level: 3 }),
  h4: (props) => header({ ...props, level: 4 }),
  h5: (props) => header({ ...props, level: 5 }),
  h6: (props) => header({ ...props, level: 6 }),
  a: (props) => <a {...props} target="_blank" rel="noreferrer"></a>,
  img: (props) => (
    <Image
      alt={props.alt}
      src={props.src ?? ""}
      layout="responsive"
      width={500}
      height={281}
      quality={30}
    />
  ),
  code: (props) => {
    const sanitizedCode = (props.children as string).trim();
    return <Code language={props.className!} code={sanitizedCode}></Code>;
  },
  table: (props) => (
    <div className="table-wrapper">
      <table {...props}></table>
    </div>
  ),
};

const MDXSerializer = (source: string): Promise<MDXRemoteSerializeResult> =>
  serialize(source, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [[rehypeSlug, { fragment: true }]],
    },
    parseFrontmatter: true,
  }) as Promise<MDXRemoteSerializeResult>;

export { MDXComponentMapper, MDXSerializer };
