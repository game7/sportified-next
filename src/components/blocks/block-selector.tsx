import { FC, useEffect, useRef } from "react";
import { Menu } from "semantic-ui-react";
import { Hub, useHub } from "../../hooks/use-hub";
import { Block } from "../../types";
import { Actions, EditorSelection } from "../pages/edit/actions";
import styles from "./block-selector.module.css";

interface Props {
  block: Block;
  selection: EditorSelection;
  onBlockSelected?: (id: number) => void;
}

export const BlockSelector: FC<Props> = ({ block, children, selection }) => {
  let hub: Hub<Actions>;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    hub = useHub<Actions>({ target: window, origin: "*" });
  }, [])
 
  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as any)) {
      hub.send("EditorSelect", null);
    }
  };
  
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const active =
    selection?.context === "block" &&
    selection?.id === block.id &&
    styles["block-editor-active"];

  function handleClick() {
    if (!active) {
      hub.send("EditBlock", { id: block.id });
    }
  }

  return (
    <div
      ref={ref}
      className={`${styles["block-editor"]} ${active}`}
      onClick={() => handleClick()}
    >
      <div className={styles["block-menu"]}>
        <Menu size="tiny">
          <Menu.Item header>{block.type}</Menu.Item>
          <Menu.Item icon="edit" content="Edit" />
        </Menu>
      </div>

      <div className={styles["block-id"]}>{block.type}</div>
      <div className={styles.block}>{children}</div>
    </div>
  );
};
