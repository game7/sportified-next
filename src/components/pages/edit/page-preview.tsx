import { useEffect, useState, VFC } from "react";
import { useHub } from "../../../hooks/use-hub";
import { inferQueryOutput } from "../../../utils/trpc";
import { Blocks } from "../../blocks/blocks";
import PageLayout from "../../layouts/page-layout";
import { Actions, EditorSelection } from "./actions";

type Page = inferQueryOutput<"pages.get">;

export const PagePreview: VFC<{ page: Page }> = (props) => {
  const [page, setPage] = useState<Page>(props.page);
  const [selection, setSelection] = useState<EditorSelection>();

  const hub = useHub<Actions>({
    target: typeof window !== "undefined" && window.parent,
  });

  useEffect(() => {
    hub.send("PreviewReady", null);
  }, []);

  useEffect(() => {
    const subs = [
      hub.subscribe("EditorSelect", (selection) => {
        setSelection(selection);
      }),
      hub.subscribe("PageUpdated", ({ page }) => {
        setPage(page);
      }),
    ];
    return () => subs.forEach((sub) => sub.unsubscribe());
  }, []);

  return (
    <PageLayout title={page.title} editable={true} selection={selection}>
      <Blocks
        blocks={page.blocks}
        editable={true}
        selection={selection}
      ></Blocks>
    </PageLayout>
  );
};
