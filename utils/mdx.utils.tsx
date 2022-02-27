import { serialize } from "next-mdx-remote/serialize";
import Image from "next/image";
import remarkGfm from "remark-gfm";
import {
  CodeStyled
} from "../components/Basic";

const MDXComponentMapper: any = {
  a: (props: any) => <a {...props} target="_blank"></a>,
  img: (props: any) => <Image src={props.src} width={500} height={250} />,
  code: (props: any) => <CodeStyled {...props}></CodeStyled>,
};

const MDXSerializer = (source: string) =>
  serialize(source, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
    },
    parseFrontmatter: true,
  });

export { MDXComponentMapper, MDXSerializer };
