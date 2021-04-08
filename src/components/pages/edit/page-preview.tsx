import { Page } from ".prisma/client";
import { useEffect, useState, VFC } from "react";
import { useHub } from "../../../hooks/use-hub";
import { Block } from "../../../types";
import { Blocks } from "../../blocks/blocks";
import PageLayout from "../../layouts/page-layout";
import { Actions } from "./actions";

export const PagePreview: VFC<{ page: Page }> = (props) => {
  const [page, setPage] = useState<Page>(props.page);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const hub = useHub<Actions>();

  useEffect(() => {
    const subs = [
      hub.subscribe("PageUpdated", ({ page }) => {
        setPage(page);
      }),
      hub.subscribe("BlocksUpdated", ({ blocks }) => {
        setBlocks(blocks);
      }),
    ];
    return () => subs.forEach((sub) => sub.unsubscribe());
  }, []);

  return (
    <PageLayout title={page.title} editable={true}>
      <Blocks blocks={blocks}></Blocks>
    </PageLayout>
  );
};
