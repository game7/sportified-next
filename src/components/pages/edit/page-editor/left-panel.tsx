import { useCallback } from "react";
import { FC, useState } from "react";
import { Button, List, Menu } from "semantic-ui-react";
import { Message, useHub } from "../../../../hooks/use-hub";
import { Block } from "../../../../types";
import { inferQueryOutput } from "../../../../utils/trpc";
import { BlockCatalog } from "../../../blocks/block-catalog";
import { Actions } from "../actions";

type Page = inferQueryOutput<"pages.get">;

type LeftPanelTab = "outline" | "blocks";

interface Props {
  page: Page;
  action?: Message<Actions, keyof Actions>;
  addBlock?: (type: string) => void;
}

export const LeftPanel: FC<Props> = ({ page, action, addBlock }) => {
  const [activeTab, setActiveTab] = useState<LeftPanelTab>("outline");

  const hub = useHub<Actions>();

  const select = useCallback((id: number) => {
    hub.send("EditBlock", { id });
  }, []);

  const moveUp = useCallback((id: number) => {
    hub.send("EditBlock", { id });
    hub.send("MoveBlockUp", { id });
  }, []);

  const moveDown = useCallback((id: number) => {
    hub.send("EditBlock", { id });
    hub.send("MoveBlockDown", { id });
  }, []);

  function isActive(block: Block) {
    return (
      action?.name === "EditBlock" &&
      (action as Message<Actions, "EditBlock">).payload.id === block.id
    );
  }

  return (
    <>
      <Menu tabular>
        <Menu.Item
          content="Outline"
          style={{ marginLeft: 10 }}
          active={activeTab === "outline"}
          onClick={() => setActiveTab("outline")}
        ></Menu.Item>
        <Menu.Item
          content="Blocks"
          active={activeTab === "blocks"}
          onClick={() => setActiveTab("blocks")}
        ></Menu.Item>
      </Menu>
      <div style={{ padding: 10 }}>
        {activeTab === "outline" && (
          <List divided relaxed>
            {page.blocks.map((block, i) => (
              <List.Item key={block.id}>
                <List.Content floated="right">
                  <Button.Group size="mini" basic>
                    <Button
                      icon="crosshairs"
                      title="Select Block"
                      active={isActive(block)}
                      onClick={() => select(block.id)}
                    ></Button>
                    <Button
                      icon="angle up"
                      title="Move Block Up"
                      disabled={i === 0}
                      onClick={() => moveUp(block.id)}
                    ></Button>
                    <Button
                      icon="angle down"
                      title="Move Block Down"
                      disabled={i === page.blocks.length - 1}
                      onClick={() => moveDown(block.id)}
                    ></Button>
                  </Button.Group>
                </List.Content>
                <List.Icon name="image" size="large" verticalAlign="middle" />
                <List.Content>
                  <List.Header>{block.type}</List.Header>
                </List.Content>
              </List.Item>
            ))}
          </List>
        )}
        {activeTab === "blocks" && (
          <BlockCatalog onBlockTypeSelected={addBlock}></BlockCatalog>
        )}
      </div>
    </>
  );
};
