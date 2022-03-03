/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react/jsx-key */

import {
  faDev,
  faGithub,
  faGithubSquare,
  faLinkedin,
  faMedium,
  faTwitter
} from "@fortawesome/free-brands-svg-icons";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { AppProps } from "next/app";
import Link from "next/link";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import styles from "../styles/app.module.css";
import "../styles/globals.css";
import "../styles/theme.css";

type Theme = "light" | "dark";

type HeaderProps = {
  onThemeChange: (newTheme: Theme) => void;
};

const Header = ({ onThemeChange }: HeaderProps) => {
  const [theme, setTheme] = useState(false);

  useEffect(() => {
    onThemeChange(theme ? "light" : "dark");
  }, [theme]);

  return (
    <header className={styles.appHeader}>
      <Link href="/">Abimael Barea</Link>
      <nav>
        <Link href="/blog">Blog</Link>
      </nav>
      <div className={styles.appHeaderActions}>
        <a
          href="https://github.com/abimaelbarea/abimaelbarea.com"
          target="_blank"
        >
          <FontAwesomeIcon icon={faGithubSquare} />
        </a>
        <button onClick={() => setTheme(!theme)}>
          <FontAwesomeIcon icon={theme ? faSun : faMoon} />
        </button>
      </div>
    </header>
  );
};

const Footer = () => {
  return (
    <footer className={styles.appFooter}>
      <nav className={styles.appFooterNav}>
        <a href="https://twitter.com/abimaelbarea" target="_blank">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a href="https://www.linkedin.com/in/abimaelbarea" target="_blank">
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
        <a href="https://github.com/abimaelbarea" target="_blank">
          <FontAwesomeIcon icon={faGithub} />
        </a>
        <a href="https://abimaelbarea.medium.com/" target="_blank">
          <FontAwesomeIcon icon={faMedium} />
        </a>
        <a href="https://dev.to/abimaelbarea" target="_blank">
          <FontAwesomeIcon icon={faDev} />
        </a>
      </nav>
    </footer>
  );
};

const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [theme, setTheme] = useState<Theme>();

  return (
    <QueryClientProvider client={queryClient}>
      <div className={`${styles.app} ${theme}`}>
        <Header onThemeChange={(newTheme: Theme) => setTheme(newTheme)} />
        <main className={styles.appContent}>
          <Component {...pageProps} />
        </main>
        <Footer />
        <ReactQueryDevtools initialIsOpen={false} />
      </div>
    </QueryClientProvider>
  );
};

export default MyApp;
