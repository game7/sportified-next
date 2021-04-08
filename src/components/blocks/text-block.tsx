import { VFC } from "react";
import { TextBlock } from "../../types";

interface Props {
  block: TextBlock;
}

const DUMMY_TEXT = "add some text here...";

export const TextBlockComponent: VFC<Props> = ({ block }) => {
  return <div>{block.body || DUMMY_TEXT}</div>;
};
