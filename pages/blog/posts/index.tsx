import { MDXRemote } from "next-mdx-remote";
import { MDXComponentMapper, MDXSerializer } from "../../../utils/mdx.utils";

// -------------------------------------------------------------

// Find a fucking good typography using google fonts
// how to make to themes??
// variables css - find a good way to structure

// -------------------------------------------------------------

// Remove css modules from the bundle
// Good names for articles in the content folder
// Load an article from a remote server - properly!!!
// Fix reload nextjs + styled components
// Document title - use the content on metadata
// RSS

const Post = ({ source }: any) => {
  console.log(source.frontmatter);
  return (
    <article>
      <MDXRemote {...source} components={MDXComponentMapper} />
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
  const res = await fetch(
    `http://localhost:3000/content/blog/angular/index.mdx`
  );
  /*const res = await fetch(
    `http://localhost:3000/content/blog/medium/index.mdx`
  );*/
  const source = await res.text();

  const mdxSource = await MDXSerializer(source);
  return { props: { source: mdxSource } };
}
