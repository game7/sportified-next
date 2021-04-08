import { FC } from "react";
import { useHub } from "../../hooks/use-hub";
import { Block } from "../../types";
import { Actions } from "../pages/edit/actions";
import styles from "./block-editor.module.css";

interface Props {
  block: Block;
  onBlockSelected?: (id: number) => void;
}

export const BlockEditor: FC<Props> = ({ block, children }) => {
  const hub = useHub<Actions>({ target: window, origin: "*" });
  return (
    <div
      className={styles["block-editor"]}
      onClick={() => hub.send("EditBlock", { id: block.id })}
    >
      <div className={styles["block-id"]}>
        {block.type}-{block.id}
      </div>
      <div className={styles.block}>{children}</div>
    </div>
  );
};
