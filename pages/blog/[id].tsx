/* eslint-disable react/jsx-key */

import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import Image from "next/image";
import { ParsedUrlQuery } from "querystring";
import styles from "../../styles/article.module.css";
import {
  MDXComponentMapper,
  MDXFetcher,
  MDXSerializer
} from "../../utils/mdx.utils";

type PostProps = MDXRemoteSerializeResult;

// MAC OS - article mode -> understand better
// Review how to do the time properly

const Post = ({ frontmatter, ...source }: PostProps) => {
  return (
    <div className={styles.articleHolder}>
      <article className={styles.article}>
        <header className={styles.articleHeader}>
          <time>{frontmatter?.date}</time>
          <h1>{frontmatter?.title}</h1>
          <h2>{frontmatter?.subtitle}</h2>
          <Image src={frontmatter?.headline} width={1000} height={420} />
        </header>
        <MDXRemote {...source} components={MDXComponentMapper} />
      </article>
      <aside className={styles.articleShare}></aside>
    </div>
  );
};

export default Post;

export const getStaticPaths: GetStaticPaths = async () => {
  // Call an external API endpoint to get posts
  const res = await fetch("http://localhost:3000/content/blog/index.json");
  const posts = await res.json();

  const paths = posts.map((post: any) => {
    return { params: { id: post.path } };
  });

  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
};

type IParams = ParsedUrlQuery & {
  id: string;
};

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  const source = await MDXFetcher((params as IParams).id);
  const mdxSource = await MDXSerializer(source);
  return { props: { ...mdxSource } };
};
