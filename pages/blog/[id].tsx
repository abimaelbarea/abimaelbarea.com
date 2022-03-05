/* eslint-disable react/jsx-key */

import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import Image from "next/image";
import { ParsedUrlQuery } from "querystring";
import styles from "../../styles/article.module.css";
import { PostInfo } from "../../types/post.types";
import {
  contentPaths,
  readContentDirectory,
  readContentFile
} from "../../utils/fiileSystem.utils";
import { MDXComponentMapper, MDXSerializer } from "../../utils/mdx.utils";

type PostProps = MDXRemoteSerializeResult & {
  frontmatter: PostInfo;
};

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
  const names = readContentDirectory(contentPaths.posts.folder);
  const paths = names.map((post: any) => {
    return { params: { id: post } };
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
  const source = readContentFile(
    contentPaths.posts.item((params as IParams).id)
  );
  const mdxSource = await MDXSerializer(source);
  return { props: { ...mdxSource } };
};
