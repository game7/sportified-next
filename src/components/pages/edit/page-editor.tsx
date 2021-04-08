import { Page } from ".prisma/client";
import { CSSProperties, useEffect, useRef, useState, VFC } from "react";
import { Grid, Segment } from "semantic-ui-react";
import { Message, useHub } from "../../../hooks/use-hub";
import { Block } from "../../../types";
import { BlockCatalog } from "../../blocks/block-catalog";
import { BlockEditor } from "../../blocks/block-editor";
import { Actions } from "./actions";
import { PageSettings } from "./page-settings";
import { PageViewSelector, PageViewType } from "./page-view-selector";

const makeBlocks: () => Block[] = () => {
  return [
    {
      id: 1,
      type: "divider",
    },
    { id: 2, type: "text", body: "this is a text block!" },
  ];
};

export const PageEditor: VFC<{ page: Page }> = (props) => {
  const [view, setView] = useState<PageViewType>("desktop");
  const [page, setPage] = useState<Page>(props.page);
  const [blocks, setBlocks] = useState(makeBlocks());
  const [action, setAction] = useState<Message<Actions, keyof Actions>>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const hub = useHub<Actions>({ target: frameRef });

  // hub.on(EditPage, (_, message) => {
  //   setAction(message);
  // });
  // hub.on(AddBlock, (_, message) => {
  //   setAction(message);
  // });

  useEffect(() => {
    function pushBlocks() {
      console.log("pushing blocks!");
      hub.send("BlocksUpdated", { blocks });
      frameRef.current.removeEventListener("load", pushBlocks);
    }
    if (frameRef.current?.contentDocument?.readyState === "complete") {
      return pushBlocks();
    }
    frameRef.current.addEventListener("load", pushBlocks);
  }, []);

  useEffect(() => {
    const subs = [
      hub.subscribe("EditPage", (payload) =>
        setAction({
          name: "EditPage",
          payload,
        })
      ),
      hub.subscribe("AddBlock", (payload) =>
        setAction({
          name: "AddBlock",
          payload,
        })
      ),
      hub.subscribe("EditBlock", (payload) => {
        setAction({
          name: "EditBlock",
          payload,
        });
      }),
    ];
    return () => subs.forEach((sub) => sub.unsubscribe());
  });

  useEffect(() => {
    hub.send("PageUpdated", { page });
  }, [page]);

  useEffect(() => {
    hub.send("BlocksUpdated", { blocks });
  }, [blocks]);

  let style: Partial<CSSProperties> = {
    padding: 1,
    border: "1px solid #dedede",
  };
  if (view === "tablet") {
    style = {
      ...style,
      width: 768,
      height: 1024,
    };
  }
  if (view === "mobile") {
    style = {
      ...style,
      width: 414,
      height: 736,
    };
  }

  if (view === "desktop") {
    style = {
      ...style,
      width: "100%",
      height: "100%",
      maxWidth: 1920,
      maxHeight: 1080,
    };
  }

  function addBlock(type) {
    const block = { type, id: blocks.length + 1 } as Block;
    const result = [...blocks];
    (action as Message<Actions, "AddBlock">).payload.position;
    result.splice(
      (action as Message<Actions, "AddBlock">).payload.position,
      0,
      block
    );
    setBlocks(result);
    setAction(null);
  }

  function leftPane() {
    switch (action?.name) {
      case "EditPage":
        return <PageSettings page={page} onPageChanged={setPage} />;
      case "AddBlock":
        return <BlockCatalog onBlockTypeSelected={addBlock} />;
      case "EditBlock":
        const block = blocks.find(
          (block) =>
            block.id === (action as Message<Actions, "EditBlock">).payload.id
        );
        return <BlockEditor block={block}></BlockEditor>;
      default:
        return <div />;
    }
  }

  return (
    <div style={{ height: "100%" }}>
      <Segment>
        <PageViewSelector selection={view} onSelect={setView} />
      </Segment>
      <Grid padded style={{ height: "calc(100% - 80px)" }}>
        <Grid.Column width="4">
          {leftPane()}
          <hr />
          <pre>{JSON.stringify(action || "", null, 2)}</pre>
        </Grid.Column>
        <Grid.Column width="12">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              backgroundColor: "#f5f5f5",
              height: "100%",
            }}
          >
            <iframe
              ref={frameRef}
              style={style}
              src={`/admin/pages/${page.id}/preview`}
            ></iframe>
          </div>
        </Grid.Column>
      </Grid>
    </div>
  );
};
