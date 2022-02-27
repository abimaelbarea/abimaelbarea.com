/* eslint-disable react/jsx-key */

import type { NextPage } from "next";
import Link from "next/link";
import { useQuery } from "react-query";
import "../../styles/blog.module.css"; // NOT WORKING!!!

const generatePath = (path: string) => `/blog/${path}`;

const BlogItem = (props: any) => {
  return (
    <Link href={generatePath(props.post.path)}>
      <div className="blog-item">
        <p>{props.post.title}</p>
      </div>
    </Link>
  );
};

const Blog: NextPage = (props: any) => {
  const { data } = useQuery("posts", getPosts, { initialData: props.posts });

  return (
    <>
      {data &&
        data.map((post: any, index: number) => (
          <BlogItem key={index} post={post}></BlogItem>
        ))}
    </>
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
