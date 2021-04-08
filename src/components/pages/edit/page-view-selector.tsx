import { VFC } from "react";
import { Button, DropdownItemProps, Icon, Select } from "semantic-ui-react";

export type PageViewType = "desktop" | "tablet" | "mobile";

interface PageViewSelectorProps {
  compact?: boolean;
  selection: PageViewType;
  onSelect?: (selection: PageViewType) => void;
}

export const PageViewSelector: VFC<PageViewSelectorProps> = ({
  compact,
  selection,
  onSelect,
}) => {
  function handleClick(type: PageViewType) {
    onSelect && onSelect(type);
  }
  if (compact) {
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
  }
  const options: DropdownItemProps[] = [
    {
      // icon: "desktop",
      value: "desktop",
      text: (
        <span>
          <Icon name="desktop" style={{ margin: "0 .75em 0 0" }}></Icon>
          Desktop
        </span>
      ),
    },
    {
      value: "tablet",
      text: (
        <span>
          <Icon
            name="tablet alternate"
            style={{ margin: "0 .75em 0 0" }}
          ></Icon>
          Tablet
        </span>
      ),
    },
    {
      value: "mobile",
      text: (
        <span>
          <Icon
            name="mobile alternate"
            style={{ margin: "0 .75em 0 0" }}
          ></Icon>
          Mobile
        </span>
      ),
    },
  ];
  console.log({ selection });
  return (
    <Select
      value={selection}
      options={options}
      onChange={(_event, data) => handleClick(data.value as PageViewType)}
    ></Select>
  );
};
