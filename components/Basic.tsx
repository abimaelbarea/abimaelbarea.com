import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

const CodeStyled = (props: any) => {
  const retrieveLanguage = (className: string) => {
    return className.split("-").pop();
  };
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

export {
  CodeStyled,
};

// img -> take a look to the sizing - not sure
// blockquote
// br
// em
// ol
// strong
// ul
// table ********* try the one that I'm working on but vertical
// syntax-highlighter theme
// syntax-highlighter copy code
