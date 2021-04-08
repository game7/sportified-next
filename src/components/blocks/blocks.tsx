import { VFC } from "react";
import { Block } from "../../types";
import { BaseBlockComponent } from "./base-block";
import { BlockEditor } from "./block-editor";
import { BlockSeparator } from "./block-separator";

export const Blocks: VFC<{
  blocks: Block[];
}> = ({ blocks }) => {
  return (
    <div>
      <BlockSeparator position={0}></BlockSeparator>
      {blocks.map((block, i) => (
        <div key={block.id}>
          <BlockEditor block={block}>
            <BaseBlockComponent block={block}></BaseBlockComponent>
          </BlockEditor>
          <BlockSeparator position={i + 1}></BlockSeparator>
        </div>
      ))}
    </div>
  );
};
