import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { MDXRemote } from "next-mdx-remote";
import { NextSeo } from "next-seo";
import Image from "next/image";
import styles from "../../stylesPages/article.module.css";
import { PostInfo } from "../../types/post.types";
import { toDateString } from "../../utils/dates.utils";
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

const Post = ({
  info: { title, subtitle, description, date, path, headline, ogImage },
  source,
}: PostProps) => {
  return (
    <>
      <div className={styles.container}>
        <article className={styles.article}>
          <header className={styles.header}>
            <time>{toDateString(date)}</time>
            <h1>{title}</h1>
            <span className={styles.subtitle}>{subtitle}</span>
            <Image
              alt={path}
              src={headline}
              layout="responsive"
              width={900}
              height={506}
              quality={30}
              priority={true}
            />
          </header>
          <MDXRemote compiledSource={source} components={MDXComponentMapper} />
        </article>
        <aside className={styles.share}></aside>
      </div>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          title,
          description,
          site_name: "Abimael Barea's Blog",
          url: `https://www.abimaelbarea.com/blog${path}`,
          images: [
            {
              url: `https://www.abimaelbarea.com/${ogImage}`,
              width: 1200,
              height: 630,
              alt: title,
            },
          ],
        }}
        twitter={{
          handle: "@abimaelbarea",
          site: "@abimaelbarea",
          cardType: "summary_large_image",
        }}
      />
    </>
  );
};

export default Post;

export const getStaticPaths: GetStaticPaths = async () => {
  const names = readContentDirectory(contentPaths.posts.folder);
  const paths = names.map((post) => {
    return { params: { id: post } };
  });

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
