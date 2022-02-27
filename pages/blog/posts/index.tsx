import { MDXRemote } from "next-mdx-remote";
import Image from "next/image";
import { MDXComponentMapper, MDXSerializer } from "../../../utils/mdx.utils";

// -------------------------------------------------------------

// how to make to themes??
// variables css - find a good way to structure

// -------------------------------------------------------------

// Good names for articles in the content folder
// Load an article from a remote server - properly!!!
// Fix reload nextjs + styled components
// Document title - use the content on metadata
// RSS

const Post = ({ source }: any) => {
  console.log(source.frontmatter);
  return (
    <article>
      <header>
        <h1>{source.frontmatter.title}</h1>
        <Image src={source.frontmatter.headline} width={1000} height={420} />
        <p>{source.frontmatter.subtitle}</p>
        <p>{source.frontmatter.date}</p>
      </header>
      <main>
        <MDXRemote {...source} components={MDXComponentMapper} />
      </main>
    </article>
  );
};

export default Post;

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
  const res = await fetch(
    `http://localhost:3000/content/blog/medium/index.mdx`
  );
  const source = await res.text();

  const mdxSource = await MDXSerializer(source);
  return { props: { source: mdxSource } };
}
