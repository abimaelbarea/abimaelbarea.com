import type { NextPage } from "next";
import Link from "next/link";

const Blog: NextPage = () => {
  return (
    <>
      <Link href="/blog/posts">Click me</Link>
    </>
  );
};

export default Blog;

// Glob read directories on blog??
// fetch all blog posts
// Retrieve metadata from blog posts
// Add thumbnails to blog posts - metadata
// Let's have category and subcategory - like the excel

// How to play with rehydration? I don´t want to block the UI until all are ready
// can I cache the request on backend? react query on back?
