/* eslint-disable react/jsx-key */

import type { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { useQuery } from "react-query";
import styles from "../../styles/blog.module.css"; // NOT WORKING!!!

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
  // I should rely here on a selector applying a filter for category
  const { data, isLoading } = useQuery("posts", getPosts, {
    initialData: posts,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.blog}>
      {data?.map((post: any, index: number) => (
        <BlogPost key={index} post={post}></BlogPost>
      ))}
    </div>
  );
};

export default Blog;

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getPosts();
  return { props: { posts } };
};

// Add here more info from medium & dev.to
const getPosts = async (): Promise<PostInfo[]> => {
  const res = await fetch("http://localhost:3000/content/blog/index.json");
  return res.json();
};

// API - create an API call that handle this
// Glob read directories on blog??
// fetch all blog posts
