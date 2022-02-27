import styled from "styled-components";

const Debug = styled.div`
  border: 1px dashed red;
`;

type DebugOptions = {
  fileName?: string;
  componentName?: string;
  line?: number;
  host?: string;
};

type DebugOptionsProps = DebugOptions;

// Add a component for the Link
// add link with an icon an position absolute?
const withDebug = (Component: any, file: string) => (props: any) => {
  console.log(file);
  return (
    <Debug>
      <a>{file}</a>
      <Component {...props} />
    </Debug>
  );
};

export default withDebug;

//export default withDebug(Post, 'index.tsx');