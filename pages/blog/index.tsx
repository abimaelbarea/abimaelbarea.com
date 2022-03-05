/* eslint-disable react/jsx-key */

import type { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import styles from "../../styles/blog.module.css"; // NOT WORKING!!!
import { PostInfo } from "../../types/post.types";
import {
  contentPaths,
  readContentDirectory,
  readContentFile
} from "../../utils/fileSystem.utils";
import { MDXSerializer } from "../../utils/mdx.utils";

const generatePostPath = (path: string) => `/blog/${path}`;

type BlogPostProps = {
  post: PostInfo;
};

const BlogPost = ({ post }: BlogPostProps) => {
  return (
    <Link href={generatePostPath(post.path)}>
      <a className={styles.blogItem}>
        <p className={styles.blogItemImage}>IMAGE</p>
        <div className={styles.blogItemTitle}>
          <p>{post.date}</p>
          <p>{post.title}</p>
        </div>
      </a>
    </Link>
  );
};

type BlogProps = {
  posts: PostInfo[];
};

const Blog: NextPage<BlogProps> = ({ posts }: BlogProps) => {
  return (
    <div className={styles.blog}>
      {posts?.map((post: any, index: number) => (
        <BlogPost key={index} post={post}></BlogPost>
      ))}
    </div>
  );
};

export default Blog;

export const getStaticProps: GetStaticProps = async () => {
  const names = readContentDirectory(contentPaths.posts.folder);
  const postsContent = await Promise.all(
    names
      .map((postFolder) => readContentFile(contentPaths.posts.item(postFolder)))
      .map(MDXSerializer)
  );
  const posts = postsContent.map((post) => post.frontmatter);
  return { props: { posts } };
};
