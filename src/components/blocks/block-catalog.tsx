import { VFC } from "react";
import { Header, Menu } from "semantic-ui-react";
import { BlockType } from "../../types";

interface BlockCatalogItem {
  title: string;
  description: string;
  type: BlockType;
}

const items: BlockCatalogItem[] = [
  {
    title: "Divider",
    description: "a simple horizontal line to divide content",
    type: "divider",
  },
  {
    title: "Text",
    description: "A block of text",
    type: "text",
  },
  { title: "Markdown", description: "A block of Markdown", type: "markdown" },
  { title: "Image", description: "An Image... duh", type: "image" },
];

export const BlockCatalog: VFC<{
  onBlockTypeSelected?: (type: string) => void;
}> = ({ onBlockTypeSelected }) => {
  return (
    <Menu vertical fluid>
      {items.map((item) => (
        <Menu.Item
          key={item.type}
          onClick={() => onBlockTypeSelected && onBlockTypeSelected(item.type)}
        >
          <Header as="h4">{item.title}</Header>
          <p>{item.description}</p>
        </Menu.Item>
      ))}
    </Menu>
  );
};
