/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react/jsx-key */

import type { AppProps } from "next/app";
import Link from "next/link";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "../styles/app.css";
import "../styles/globals.css";
import "../styles/theme.css";

// how to make to themes??
// variables css - find a good way to structure

// Add newsletter
// Add about
// Include font icons


// GRID ROWS 3!!!!!!!!!!!!! 

const Header = () => {
  return (
    <header className="app__header">
      <nav>
        <Link href="/">Abimael Barea</Link>
        <div className="app__header-menu">
          <Link href="/blog">Blog</Link>
          <a
            href="https://github.com/abimaelbarea/abimaelbarea.com"
            target="_blank"
          >
            Repo
          </a>
          <div>Theme</div>
        </div>
      </nav>
    </header>
  );
};

const Footer = () => {
  return (
    <footer className="app_footer">
      <nav>
        <a href="https://twitter.com/abimaelbarea" target="_blank">
          Twitter
        </a>
        <a href="https://www.linkedin.com/in/abimaelbarea" target="_blank">
          Linkedin
        </a>
        <a href="https://github.com/abimaelbarea" target="_blank">
          Github
        </a>
        <a href="https://abimaelbarea.medium.com/" target="_blank">
          Medium
        </a>
        <a href="https://dev.to/abimaelbarea" target="_blank">
          Dev.to
        </a>
      </nav>
    </footer>
  );
};

const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <Header />
        <main className="app__content">
          <Component {...pageProps} />
        </main>
        <Footer />
        <ReactQueryDevtools initialIsOpen={false} />
      </div>
    </QueryClientProvider>
  );
};

export default MyApp;
