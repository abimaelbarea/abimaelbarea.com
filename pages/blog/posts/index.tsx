import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import Image from "next/image";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import remarkGfm from "remark-gfm";
import styled from "styled-components";

const CSSVariables = styled.div`
  --color-h1: red;
  --color-h2: green;
  --color: black;
`;

const Code = (props: any) => {
  const retrieveLanguage = (className: string) => {
    return className.split("-").pop();
  };
  return (
    <SyntaxHighlighter
      language={retrieveLanguage(props.className)}
      showLineNumbers={true}
      wrapLongLines={true}
    >
      {props.children}
    </SyntaxHighlighter>
  );
};

const Article = styled.article`
  padding: 2.5rem;
`;

const H1 = styled.h1`
  color: var(--color-h1);
`;

const H2 = styled.h2`
  color: var(--color-h2);
`;

const P = styled.p`
  color: var(--color);
`;

const A = styled.a`
  color: var(--color);
  cursor: pointer;
  text-decoration: underline;
`;

const LI = styled.li`
  color: var(--color); 
`;

const components = {
  h1: (props: any) => <H1>{props.children}</H1>,
  h2: (props: any) => <H2>{props.children}</H2>,
  p: (props: any) => <P>{props.children}</P>,
  a: (props: any) => <A>{props.children}</A>,
  li: (props: any) => <LI>{props.children}</LI>,
  img: (props: any) => <Image src={props.src} width={500} height={250} />,
  code: (props: any) => <Code {...props}></Code>,
};

export default function Post({ source }: any) {
  console.log(source.frontmatter);
  return (
    <CSSVariables>
      <Article>
        <MDXRemote {...source} components={components} />
      </Article>
    </CSSVariables>
  );
}

/*
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch("http://localhost:3000/content/blog/index.json");
  const posts = await res.json();

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths: posts, fallback: false };
}
*/

/**
 * https://www.npmjs.com/package/next-mdx-remote
 * @returns
 */
export async function getStaticProps() {
  //const res = await fetch(`http://localhost:3000/content/blog/{params.id}.mdx`);
  /*const res = await fetch(
    `http://localhost:3000/content/blog/angular/index.mdx`
  );*/
  const res = await fetch(`http://localhost:3000/content/blog/medium/index.mdx`);
  const source = await res.text();

  const mdxSource = await serialize(source, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
    },
    parseFrontmatter: true,
  });

  return { props: { source: mdxSource } };
}
