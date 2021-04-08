import { VFC } from "react";
import { Modal } from "semantic-ui-react";
import { BlockCatalog } from "./block-catalog";

export const AddBlockDialog: VFC<{
  open: boolean;
  onBlockSelected: (type: string) => void;
  onClose: () => void;
}> = ({ open, onBlockSelected, onClose }) => {
  return (
    <Modal centered={false} size="tiny" onClose={onClose} open={open}>
      <Modal.Header>Add Block</Modal.Header>
      <Modal.Content>
        <BlockCatalog onBlockTypeSelected={onBlockSelected}></BlockCatalog>
      </Modal.Content>
    </Modal>
  );
};
