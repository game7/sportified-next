import { VFC } from "react";
import { Button } from "semantic-ui-react";

export type PageViewType = "desktop" | "tablet" | "mobile";

interface PageViewSelectorProps {
  selection: PageViewType;
  onSelect?: (selection: PageViewType) => void;
}

export const PageViewSelector: VFC<PageViewSelectorProps> = ({
  selection,
  onSelect,
}) => {
  function handleClick(type: PageViewType) {
    onSelect && onSelect(type);
  }
  return (
    <Button.Group>
      <Button
        icon={"desktop"}
        active={selection === "desktop"}
        onClick={() => handleClick("desktop")}
        title="Desktop View"
      ></Button>
      <Button
        icon={["tablet", "alternate"].join(" ")}
        active={selection === "tablet"}
        onClick={() => handleClick("tablet")}
        title="Tablet View"
      ></Button>
      <Button
        icon={["mobile", "alternate"].join(" ")}
        active={selection === "mobile"}
        onClick={() => handleClick("mobile")}
        title="Mobile View"
      ></Button>
    </Button.Group>
  );
};
