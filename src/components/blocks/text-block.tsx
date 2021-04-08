import { VFC } from "react";
import { TextBlock } from "../../types";

interface Props {
  block: TextBlock;
}

const DUMMY_TEXT = "add some text here...";

export const TextBlockComponent: VFC<Props> = ({ block }) => {
  const markup = (block.body || DUMMY_TEXT)
    .split("\n")
    .map((line) => (line === "" ? line : `<p>${line}</p>`))
    .join("\n");
  return <div dangerouslySetInnerHTML={{ __html: markup }}></div>;
};
