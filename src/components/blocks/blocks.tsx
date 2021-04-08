import { VFC } from "react";
import { Button, Header, Icon, Segment } from "semantic-ui-react";
import { useHub } from "../../hooks/use-hub";
import { Block } from "../../types";
import { Actions, EditorSelection } from "../pages/edit/actions";
import { BaseBlockComponent } from "./base-block";
import { BlockSelector } from "./block-selector";

export const Blocks: VFC<{
  blocks: Block[];
  editable: boolean;
  selection: EditorSelection;
}> = ({ blocks, editable, selection }) => {
  const hub = useHub<Actions>({
    target: typeof window !== "undefined" && window.parent,
  });
  function addBlock() {
    hub.send("AddBlock", { position: 0 });
  }
  return (
    <div>
      {editable && blocks.length === 0 && (
        <Segment placeholder>
          <Header icon>
            {" "}
            <Icon name="block layout" />
            No Blocks have been created for this page.
          </Header>
          <Button primary onClick={addBlock}>
            Add Block
          </Button>
        </Segment>
      )}
      {blocks.map((block, i) => (
        <div key={block.id}>
          <BlockSelector block={block} selection={selection}>
            <BaseBlockComponent block={block}></BaseBlockComponent>
          </BlockSelector>
        </div>
      ))}
    </div>
  );
};
