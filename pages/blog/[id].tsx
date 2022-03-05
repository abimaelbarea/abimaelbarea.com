/* eslint-disable react/jsx-key */

import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { MDXRemote } from "next-mdx-remote";
import Image from "next/image";
import styles from "../../styles/article.module.css";
import { PostInfo } from "../../types/post.types";
import {
  contentPaths,
  readContentDirectory,
  readContentFile
} from "../../utils/fileSystem.utils";
import { MDXComponentMapper, MDXSerializer } from "../../utils/mdx.utils";

type PostProps = {
  info: PostInfo;
  source: string;
};

// MAC OS - article mode -> understand better
// Review how to do the time properly

const Post = ({ info, source }: PostProps) => {
  return (
    <div className={styles.articleHolder}>
      <article className={styles.article}>
        <header className={styles.articleHeader}>
          <time>{info.date}</time>
          <h1>{info.title}</h1>
          <h2>{info.subtitle}</h2>
          <Image src={info.headline} width={1000} height={420} />
        </header>
        <MDXRemote compiledSource={source} components={MDXComponentMapper} />
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

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  const source = readContentFile(contentPaths.posts.item(params?.id as string));
  const mdxSource = await MDXSerializer(source);
  return {
    props: { info: mdxSource.frontmatter, source: mdxSource.compiledSource },
  };
};
