import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

/**
 syntax-highlighter theme
 syntax-highlighter - copy code & view raw
 */

const retrieveLanguage = (className: string): string | undefined => {
  return className.split("-").pop();
};

type CodeProps = {
  className: string;
  children: any; // TODO: review this
};

const Code = ({ className, children }: CodeProps) => {
  return (
    <SyntaxHighlighter
      language={retrieveLanguage(className)}
      showLineNumbers={true}
      wrapLongLines={true}
    >
      {children}
    </SyntaxHighlighter>
  );
};

export default Code;
