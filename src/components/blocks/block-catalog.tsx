import { VFC } from "react";
import { Header, Menu } from "semantic-ui-react";

interface BlockCatalogItem {
  title: string;
  description: string;
  type: string;
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
];

export const BlockCatalog: VFC<{
  onBlockTypeSelected: (type: string) => void;
}> = ({ onBlockTypeSelected }) => {
  return (
    <Menu vertical fluid>
      {items.map((item) => (
        <Menu.Item
          key={item.type}
          onClick={() => onBlockTypeSelected(item.type)}
        >
          <Header as="h4">{item.title}</Header>
          <p>{item.description}</p>
        </Menu.Item>
      ))}
    </Menu>
  );
};
