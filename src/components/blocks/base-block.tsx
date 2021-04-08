import { VFC } from "react";
import { Block } from "../../types";
import { DividerBlockCommponent } from "./divider-block";
import { TextBlockComponent } from "./text-block";

interface Props {
  block: Block;
}

export const BaseBlockComponent: VFC<Props> = ({ block }) => {
  switch (block.type) {
    case "divider":
      return <DividerBlockCommponent block={block} />;
    case "text":
      return <TextBlockComponent block={block} />;
  }
};
