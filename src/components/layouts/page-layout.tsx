import React, { FC } from "react";
import { useHub } from "../../hooks/use-hub";
import { Actions } from "../pages/edit/actions";
import styles from "./page-layout.module.css";

interface Props {
  title: string;
  editable?: boolean;
}

const PageLayout: React.FC<Props> = ({ title, editable, children }) => {
  if (editable) {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: 960 }}>
          <PageTitleSelector>
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

export const PageTitleSelector: FC = ({ children }) => {
  const hub = useHub<Actions>();
  const select = () => {
    hub.send("EditPage", null);
  };
  return (
    <div className={styles["page-title-selector"]} onClick={select}>
      {children}
    </div>
  );
};
