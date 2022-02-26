import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";

const components = {};

export default function Post({ source }: any) {
  console.log(source.frontmatter);
  return (
    <article>
      <MDXRemote {...source} components={components} />
    </article>
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
  const res = await fetch(`http://localhost:3000/content/blog/test.mdx`);
  const source = await res.text();

  const mdxSource = await serialize(source, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
    },
    parseFrontmatter: true,
  });

  return { props: { source: mdxSource } };
}
