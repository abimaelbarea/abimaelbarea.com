import Image from "next/image";
import Link from "next/link";
import { PostInfo } from "../types/post.types";
import { toDateString } from "../utils/dates.utils";
import styles from "./blogPost.module.css";

const generatePostPath = (path: string) => `/blog/${path}`;

type BlogPostProps = {
  post: PostInfo;
};

const BlogPost = ({
  post: { path, headline, category, subcategories, date, title },
}: BlogPostProps) => {
  return (
    <Link href={generatePostPath(path)}>
      <a className={styles.container}>
        <div className={styles.imageContainer}>
          <Image
            alt={path}
            src={headline}
            layout="responsive"
            width={400}
            height={225}
            quality={30}
            priority={true}
          />
          <div className={styles.categoriesContainer}>
            <button onClick={(e) => e.preventDefault()}>{category}</button>
            <button onClick={(e) => e.preventDefault()}>
              {subcategories[0]}
            </button>
          </div>
        </div>
        <div className={styles.title}>
          <time>{toDateString(date)}</time>
          <p>{title}</p>
        </div>
      </a>
    </Link>
  );
};

export default BlogPost;
