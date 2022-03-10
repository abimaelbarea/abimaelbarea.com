import type { AppProps } from "next/app";
import AppFooter from "../components/appFooter";
import AppHeader from "../components/appHeader";
import "../styles/globals.css";
import styles from "../stylesPages/app.module.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <AppHeader />
      <main className={styles.content}>
        <Component {...pageProps} />
      </main>
      <AppFooter />
    </>
  );
};

export default MyApp;
