import { ReactNode } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import styles from "./code.module.css";

const retrieveLanguage = (className: string): string | undefined => {
  return className.split("-").pop();
};

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};

type CodeProps = {
  language: string;
  code: ReactNode;
};

const Code = ({ language, code }: CodeProps) => {
  const myLanguage = retrieveLanguage(language);

  return (
    <section className={styles.container}>
      <SyntaxHighlighter
        style={a11yDark}
        language={myLanguage}
        showLineNumbers={true}
        wrapLongLines={true}
      >
        {code}
      </SyntaxHighlighter>
      <h1>{myLanguage}</h1>
      <button onClick={() => copyToClipboard(code as string)}>Copy</button>
    </section>
  );
};

export default Code;
