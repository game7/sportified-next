import React, { FC } from "react";
import { useHub } from "../../hooks/use-hub";
import { Actions, EditorSelection } from "../pages/edit/actions";
import styles from "./page-layout.module.css";

interface Props {
  title: string;
  editable?: boolean;
  selection?: EditorSelection;
}

const PageLayout: React.FC<Props> = ({
  title,
  editable,
  selection,
  children,
}) => {
  if (editable) {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: 960 }}>
          <PageTitleSelector selection={selection}>
            <h1 style={{ borderBottom: "1px solid #dedede" }}>{title}</h1>
          </PageTitleSelector>
          {children}
        </div>
      </div>
    );
  }
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: 960 }}>
        <h1 style={{ borderBottom: "1px solid #dedede" }}>{title}</h1>
        {children}
      </div>
    </div>
  );
};

export default PageLayout;

export const PageTitleSelector: FC<{ selection: EditorSelection }> = ({
  children,
  selection,
}) => {
  const hub = useHub<Actions>();

  const select = () => {
    hub.send("EditPage", null);
  };

  const active =
    selection?.context === "page" &&
    selection.id === "title" &&
    styles["page-title-selector-active"];

  return (
    <div
      className={`${styles["page-title-selector"]} ${active}`}
      onClick={select}
    >
      {children}
    </div>
  );
};
