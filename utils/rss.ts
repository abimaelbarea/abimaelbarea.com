import { Feed, Item } from "feed";
import { PostInfo } from "../types/post.types";
import { writeFile } from "./fileSystem.utils";

const baseUrl = "https://www.abimaelbarea.com";
const author = {
  name: "Abimael Barea",
  email: "abimaelbarea@gmail.com",
  link: "https://twitter.com/abimaelbarea",
};

const postTopFeed = ({
  title,
  path,
  description,
  date,
  ogImage,
}: PostInfo): Item => {
  return {
    title,
    id: path,
    link: `${baseUrl}/blog/${path}`,
    image: `${baseUrl}/${ogImage}`,
    description,
    //published
    //category 
    //copyright
    author: [author],
    date: new Date(date), //last update
  };
};

const generateRSSFeed = (posts: PostInfo[]) => {
  const feed = new Feed({
    title: "Abimael Barea's blog",
    description: "Talks about software",
    id: baseUrl,
    link: baseUrl,
    language: "en",
    feedLinks: {
      rss2: `${baseUrl}/rss.xml`,
    },
    author,
    copyright: "2022",
  });

  // Add each article to the feed
  posts.map(postTopFeed).forEach((item) => {
    feed.addItem(item);
  });

  writeFile("public/rss.xml", feed.rss2());
};

export { generateRSSFeed };
