import type { AppProps } from "next/app";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <header>Test header</header>
      <main>
        <Component {...pageProps} />
      </main>
      <footer>footer</footer>
    </>
  );
}

export default MyApp;
