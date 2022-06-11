import type { GetStaticProps, NextPage } from "next";
import { NextSeo } from "next-seo";
import BlogPost from "../../components/BlogPost";
import styles from "../../stylesPages/blog.module.css";
import { PostInfo } from "../../types/post.types";
import {
  contentPaths,
  readContentDirectory,
  readContentFile
} from "../../utils/fileSystem.utils";
import { MDXSerializer } from "../../utils/mdx.utils";
import { generateRSSFeed } from "../../utils/rss";

type BlogProps = {
  posts: PostInfo[];
};

const Blog: NextPage<BlogProps> = ({ posts }: BlogProps) => {
  return (
    <>
      <div className={styles.container}>
        {posts?.map((post, index) => (
          <BlogPost key={index} post={post} />
        ))}
      </div>
      <NextSeo
        title="Abimael Barea's Blog"
        description="Personal blog of Abimael Barea"
      />
    </>
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
  const posts = postsContent
    .map((post) => post.frontmatter)
    .sort((postA, postB) => postB.date.localeCompare(postA.date));
  generateRSSFeed(posts);
  return { props: { posts } };
};
