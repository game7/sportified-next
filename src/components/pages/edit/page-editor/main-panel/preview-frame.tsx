import { CSSProperties, useRef, VFC } from "react";
import { inferQueryOutput } from "../../../../../utils/trpc";
import { PageViewType } from "../../page-view-selector";

type Page = inferQueryOutput<"pages.get">;

interface Props {
  page: Page;
  view: PageViewType;
}

export const PreviewFrame: VFC<Props> = ({ page, view }) => {
  const frameRef = useRef<HTMLIFrameElement>(null);

  let style: Partial<CSSProperties> = {
    padding: 1,
    border: "1px solid #dedede",
    transitionProperty: "width, height",
    transitionDuration: "0.5s",
    transitionTimingFunction: "ease-out",
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
      // maxHeight: 1080,
    };
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        height: "calc(100% - 76px)",
      }}
    >
      <iframe
        ref={frameRef}
        style={style}
        src={`/admin/pages/${page.id}/preview`}
      ></iframe>
    </div>
  );
};
