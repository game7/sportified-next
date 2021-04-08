import { capitalize } from "lodash";
import { VFC } from "react";
import { Header } from "semantic-ui-react";
import {
  Block,
  DividerBlock,
  ImageBlock,
  MarkdownBlock,
  TextBlock,
} from "../../types";
import { DividerBlockSettings } from "./divider/divider-block-settings";
import { ImageBlockSettings } from "./image/image-block-settings";
import { MarkdownBlockSettings } from "./markdown/markdown-block-settings";
import { TextBlockSettings } from "./text/text-block-settings";

export const BlockSettings: VFC<{
  block: Block;
  onBlockUpdated?: (block: Block) => void;
}> = ({ block, onBlockUpdated }) => {
  const title = `${capitalize(block.type)} Settings`;

  const components = {
    text: (
      <TextBlockSettings
        block={block as TextBlock}
        onBlockUpdated={onBlockUpdated}
      />
    ),
    divider: <DividerBlockSettings block={block as DividerBlock} />,
    markdown: (
      <MarkdownBlockSettings
        block={block as MarkdownBlock}
        onBlockUpdated={onBlockUpdated}
      />
    ),
    image: (
      <ImageBlockSettings
        block={block as ImageBlock}
        onBlockUpdated={onBlockUpdated}
      />
    ),
  };

  const Noop = <div>Unknown Block Type</div>;

  return (
    <div>
      <Header as="h3" dividing content={title}></Header>
      {components[block.type] || Noop}
    </div>
  );
};
