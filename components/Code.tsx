import SyntaxHighlighter from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

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
      style={darcula}
      language={retrieveLanguage(className)}
      showLineNumbers={true}
      wrapLongLines={true}
    >
      {children}
    </SyntaxHighlighter>
  );
};

export default Code;
