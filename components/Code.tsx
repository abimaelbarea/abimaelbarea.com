import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

const retrieveLanguage = (className: string) => {
  return className.split("-").pop();
};

const Code = (props: any) => {
  return (
    <SyntaxHighlighter
      language={retrieveLanguage(props.className)}
      showLineNumbers={true}
      wrapLongLines={true}
    >
      {props.children}
    </SyntaxHighlighter>
  );
};

export default Code;
