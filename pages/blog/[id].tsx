/* eslint-disable react/jsx-key */

import { MDXRemote } from "next-mdx-remote";
import Image from "next/image";
import {
  MDXComponentMapper,
  MDXFetcher,
  MDXSerializer
} from "../../utils/mdx.utils";

// Module with styles for the header
// Article styles width
// MAC OS - article mode -> understand better

// Copy Dev.to but in the right side and mobile bottom!!!

// Share -> share on social media: Twitter, Facebook, Linkedin?
// Share -> copy link
// Share -> rss feed
// Share -> subscribe to newsletter
// Share -> send by email

// Footer -> categories with some chips??

const Post = ({ source }: any) => {
  console.log(source.frontmatter);
  return (
    <article>
      <header>
        <p>{source.frontmatter.date}</p>
        <h1>{source.frontmatter.title}</h1>
        <p>{source.frontmatter.subtitle}</p>
        <Image src={source.frontmatter.headline} width={1000} height={420} />
      </header>
      <main>
        <MDXRemote {...source} components={MDXComponentMapper} />
      </main>
      <footer>Categories</footer>
    </article>
  );
};

export default Post;

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch("http://localhost:3000/content/blog/index.json");
  const posts = await res.json();

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths: posts, fallback: false };
}

/**
 * https://www.npmjs.com/package/next-mdx-remote
 * @returns
 */
export async function getStaticProps({ params }: any) {
  const source = await MDXFetcher(params.id);
  const mdxSource = await MDXSerializer(source);
  return { props: { source: mdxSource } };
}
