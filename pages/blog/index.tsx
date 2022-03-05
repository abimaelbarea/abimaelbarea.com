/* eslint-disable react/jsx-key */

import fs from "fs";
import type { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import styles from "../../styles/blog.module.css"; // NOT WORKING!!!
import { MDXSerializer } from "../../utils/mdx.utils";

const generatePostPath = (path: string) => `/blog/${path}`;

type PostInfo = {
  title: string;
  subtitle: string;
  headline: string;
  description: string;
  path: string;
  date: string;
  categories: string[];
  keywords: string[];
};

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
  const postsDirectory = `${process.cwd()}/content/blog`;
  const filenames = fs.readdirSync(postsDirectory);

  const postsFiles = filenames.map((postFolder) => {
    const filePath = `${postsDirectory}/${postFolder}/readme.mdx`;
    return fs.readFileSync(filePath, "utf8");
  });

  const postsContent = await Promise.all(
    postsFiles.map((source) => MDXSerializer(source))
  );
  const posts = postsContent.map((post) => post.frontmatter);

  return { props: { posts } };
};
