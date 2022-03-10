import Link from "next/link";
import { PostInfo } from "../types/post.types";
import styles from "./blogPost.module.css";

const generatePostPath = (path: string) => `/blog/${path}`;

type BlogPostProps = {
  post: PostInfo;
};

const BlogPost = ({ post }: BlogPostProps) => {
  return (
    <Link href={generatePostPath(post.path)}>
      <a className={styles.item}>
        <p className={styles.image}>IMAGE</p>
        <div className={styles.title}>
          <p>{post.date}</p>
          <p>{post.title}</p>
        </div>
      </a>
    </Link>
  );
};

export default BlogPost;
