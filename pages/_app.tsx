import {
  faDev,
  faGithub,
  faGithubSquare,
  faLinkedin,
  faMedium,
  faTwitter,
  IconDefinition
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";
import Link from "next/link";
import "../styles/globals.css";
import styles from "../stylesPages/app.module.css";

const socialNetworks: NavigationItemProps[] = [
  {
    icon: faDev,
    url: "https://dev.to/abimaelbarea",
    aria: "Dev.to",
  },
  {
    icon: faGithub,
    url: "https://github.com/abimaelbarea",
    aria: "Github",
  },
  {
    icon: faLinkedin,
    url: "https://www.linkedin.com/in/abimaelbarea/",
    aria: "LinkedIn",
  },
  {
    icon: faTwitter,
    url: "https://twitter.com/abimaelbarea",
    aria: "Twitter",
  },
  {
    icon: faMedium,
    url: "https://medium.com/@abimaelbarea",
    aria: "Medium",
  },
];

const headerLink: NavigationItemProps = {
  icon: faGithubSquare,
  url: "https://github.com/abimaelbarea/abimaelbarea.com",
  aria: "Github project",
};

type NavigationItemProps = {
  icon: IconDefinition;
  url: string;
  aria: string;
};

const NavigationItem = ({ icon, url, aria }: NavigationItemProps) => {
  return (
    <a key={url} href={url} aria-label={aria} target="_blank" rel="noreferrer">
      <FontAwesomeIcon icon={icon} />
    </a>
  );
};

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <header className={styles.header}>
        <Link href="/">
          <a className={styles.title}>Abimael Barea</a>
        </Link>
        <nav className={styles.navigation}>
          <NavigationItem {...headerLink} />
        </nav>
      </header>
      <main className={styles.container}>
        <Component {...pageProps} />
      </main>
      <footer className={styles.footer}>
        <nav className={styles.navigation}>
          {socialNetworks.map(NavigationItem)}
        </nav>
      </footer>
      <DefaultSeo />
    </>
  );
};

export default MyApp;
