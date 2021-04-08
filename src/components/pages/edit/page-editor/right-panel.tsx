import React, { VFC } from "react";
import { Message, useHub } from "../../../../hooks/use-hub";
import { inferQueryOutput } from "../../../../utils/trpc";
import { Actions } from "../actions";
import { PageSettings } from "../page-settings";
import { BlockCatalog } from "../../../blocks/block-catalog";
import { BlockSettings } from "../../../blocks/block-settings";
import { Block } from "../../../../types";
import { random } from "lodash";
import { Icon, Menu } from "semantic-ui-react";

type Page = inferQueryOutput<"pages.get">;

interface Props {
  page: Page;
  setPage: (page: Page) => void;
  action: Message<Actions, keyof Actions>;
}

export const RightPanel: VFC<Props> = ({ page, setPage, action }) => {
  const hub = useHub<Actions>();

  function onBlockUpdated(block: Block) {
    hub.send("UpdateBlock", { block });
  }

  function addBlock(type) {
    const block = { type, id: random(-1000, -1) } as Block;
    setPage({ ...page, blocks: [...page.blocks, block] });
    hub.send("EditBlock", { id: block.id });
  }

  function leftPane() {
    switch (action?.name) {
      case "EditPage":
        return <PageSettings page={page} onPageChanged={setPage} />;
      case "AddBlock":
        return <BlockCatalog onBlockTypeSelected={addBlock} />;
      case "EditBlock":
        const block = page.blocks.find(
          (block) =>
            block.id === (action as Message<Actions, "EditBlock">).payload.id
        );
        return (
          <BlockSettings
            block={block}
            onBlockUpdated={onBlockUpdated}
          ></BlockSettings>
        );
      default:
        return <React.Fragment></React.Fragment>;
    }
  }

  return (
    <React.Fragment>
      <Menu tabular>
        <Menu.Item
          active
          style={{ marginLeft: 10 }}
          // icon="window close outline"
          // content="Edit Block"
        >
          Edit Block
          <Icon
            name="times"
            style={{
              marginLeft: "0.357143em",
              marginRight: 0,
              fontWeight: "normal",
            }}
            link
            onClick={() => console.log("click!")}
            title="Close Tab"
            color="grey"
          ></Icon>
        </Menu.Item>
        <Menu.Item content="Blocks"></Menu.Item>
      </Menu>
      {leftPane()}
      <pre
        style={{
          border: "1px dashed #ccc",
          padding: 5,
          backgroundColor: "#f5f5f5",
          marginTop: 15,
        }}
      >
        {JSON.stringify(action || "", null, 2)}
      </pre>
    </React.Fragment>
  );
};
