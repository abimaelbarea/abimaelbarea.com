/* eslint-disable react/jsx-key */

import type { NextPage } from "next";
import Link from "next/link";
import { useQuery } from "react-query";
import styles from "../../styles/blog.module.css"; // NOT WORKING!!!

const generatePath = (path: string) => `/blog/${path}`;

const BlogItem = (props: any) => {
  return (
    <Link href={generatePath(props.post.path)}>
      <div className={styles.blogItem}>
        <p className={styles.blogItemImage}>IMAGE</p>
        <div className={styles.blogItemTitle}>
          <p>{props.post.date}</p>
          <p>{props.post.title}</p>
        </div>
      </div>
    </Link>
  );
};

const Blog: NextPage = (props: any) => {
  const { data } = useQuery("posts", getPosts, { initialData: props.posts });

  // TODO: review how to do this properly with reactQuery
  if (data?.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.blog}>
      {data.map((post: any, index: number) => (
        <BlogItem key={index} post={post}></BlogItem>
      ))}
    </div>
  );
};

export default Blog;

export async function getStaticProps() {
  const posts = await getPosts();
  return { props: { posts } };
}

// Add here more info from medium & dev.to
const getPosts = async () => {
  const res = await fetch("http://localhost:3000/content/blog/index.json");
  return res.json();
};

// API - create an API call that handle this

// Glob read directories on blog??
// fetch all blog posts
