import { random } from "lodash";
import { useEffect, useState, VFC } from "react";
import { useMutation } from "react-query";
import { Button, Grid, Menu } from "semantic-ui-react";
import { Message, useHub } from "../../../../hooks/use-hub";
import { Block } from "../../../../types";
import { inferQueryOutput, trpc } from "../../../../utils/trpc";
import { AddBlockDialog } from "../../../blocks/add-block-dialog";
import { Actions } from "../actions";
import { PageViewSelector, PageViewType } from "../page-view-selector";
import { LeftPanel } from "./left-panel";
import { MainPanel } from "./main-panel";
import { RightPanel } from "./right-panel";

type Page = inferQueryOutput<"pages.get">;

export const PageEditor: VFC<{ page: Page }> = (props) => {
  const [view, setView] = useState<PageViewType>("desktop");
  const [page, setPage] = useState<Page>(props.page);
  const updatePage = trpc.useMutation("pages.update")
  const [action, setAction] = useState<Message<Actions, keyof Actions> | null>(null);
  const hub = useHub<Actions>();

  function moveBlock(id: number, offset: number) {
    setPage((page) => {
      const blockToMove = page.blocks.find((block) => block.id === id);
      if(!blockToMove) { return page }
      const position = page.blocks.indexOf(blockToMove);
      const updated = [...page.blocks];
      const [removed] = updated.splice(position, 1);
      updated.splice(position + offset, 0, removed);
      return {
        ...page,
        blocks: updated,
      };
    });
  }

  useEffect(() => {
    const subs = [
      hub.subscribe("EditorSelect", (payload) => {
        if (!payload) {
          setAction(null);
        }
      }),
      hub.subscribe("EditPage", (payload) => {
        hub.send("EditorSelect", { context: "page", id: "title" });
        setAction({
          name: "EditPage",
          payload,
        });
      }),
      hub.subscribe("AddBlock", (payload) =>
        setAction({
          name: "AddBlock",
          payload,
        })
      ),
      hub.subscribe("MoveBlockUp", ({ id }) => moveBlock(id, -1)),
      hub.subscribe("MoveBlockDown", ({ id }) => moveBlock(id, 1)),
      hub.subscribe("EditBlock", (payload) => {
        hub.send("EditorSelect", { context: "block", id: payload.id });
        setAction({
          name: "EditBlock",
          payload,
        });
      }),
      hub.subscribe("UpdateBlock", ({ block }) => {
        const updated = {
          ...page,
          blocks: page.blocks.map((existing) => {
            return existing.id === block.id ? block : existing;
          }),
        };
        setPage(updated);
      }),
    ];
    return () => subs.forEach((sub) => sub.unsubscribe());
  });

  useEffect(() => {
    hub.send("PageUpdated", { page });
  }, [page]);

  function addBlock(type: string) {
    const block = { type, id: random(-1000, -1) } as Block;
    setPage({ ...page, blocks: [...page.blocks, block] });
    hub.send("EditBlock", { id: block.id });
  }

  function savePage() {
    alert('save page!')
    updatePage.mutateAsync({ id: page.id, data: {
      title: page.title,
      blocks: page.blocks
    } })
  }

  return (
    <div style={{ height: "100%" }}>
      <Menu>
        <Menu.Item>
          <div>
            <Button basic icon="list" title="Outline View"></Button>
            <PageViewSelector
              selection={view}
              onSelect={setView}
            ></PageViewSelector>
          </div>
        </Menu.Item>
        <Menu.Item position="right">
          <Button onClick={savePage}>Save</Button>
        </Menu.Item>
      </Menu>
      <Grid padded divided style={{ height: "100%" }}>
        <Grid.Column width="3" style={{ padding: 0 }}>
          <LeftPanel
            page={page}
            action={action}
            addBlock={addBlock}
          ></LeftPanel>
        </Grid.Column>
        <Grid.Column width="10">
          <MainPanel page={page} view={view} setView={setView}></MainPanel>
        </Grid.Column>
        <Grid.Column width="3">
          <RightPanel
            page={page}
            setPage={setPage}
            action={action}
          ></RightPanel>
        </Grid.Column>
      </Grid>
      <AddBlockDialog
        open={action && action.name === "AddBlock"}
        onBlockSelected={addBlock}
        onClose={() => {
          hub.send("EditorSelect", null);
        }}
      ></AddBlockDialog>
    </div>
  );
};
