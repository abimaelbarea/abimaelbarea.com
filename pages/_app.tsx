import type { AppProps } from "next/app";
import Link from "next/link";
import "../styles/globals.css";

// Add newsletter
// Add about
// Inspection mode

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <header>
        <nav>
          <Link href="/">Abimael Barea</Link>
          <Link href="/blog">Blog</Link>
          <a href="https://github.com/abimaelbarea/abimaelbarea.com" target="_blank">Repo</a>
        </nav>
        <div>Theme</div>
      </header>
      <main>
        <Component {...pageProps} />
      </main>
      <footer>
        <nav>
          <a href="https://twitter.com/abimaelbarea" target="_blank">Twitter</a>
          <a href="https://www.linkedin.com/in/abimaelbarea" target="_blank">Linkedin</a>
          <a href="https://github.com/abimaelbarea" target="_blank">Github</a>
          <a href="https://abimaelbarea.medium.com/" target="_blank">Medium</a>
          <a href="https://dev.to/abimaelbarea" target="_blank">Dev.to</a>
        </nav>
      </footer>
    </>
  );
}

export default MyApp;
