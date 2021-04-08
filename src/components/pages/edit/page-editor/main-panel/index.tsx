import React, { VFC } from "react";
import { Menu } from "semantic-ui-react";
import { inferQueryOutput } from "../../../../../utils/trpc";
import { PageViewSelector, PageViewType } from "../../page-view-selector";
import { PreviewFrame } from "./preview-frame";

type Page = inferQueryOutput<"pages.get">;

interface Props {
  page: Page;
  view: PageViewType;
  setView: (view: PageViewType) => void;
}

export const MainPanel: VFC<Props> = ({ page, view, setView }) => {
  return (
    <React.Fragment>
      <Menu>
        <Menu.Item>
          <PageViewSelector
            selection={view}
            onSelect={setView}
            compact={true}
          />
        </Menu.Item>
      </Menu>
      <PreviewFrame page={page} view={view}></PreviewFrame>
    </React.Fragment>
  );
};
