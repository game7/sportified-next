import { VFC } from "react";
import { Form } from "semantic-ui-react";
import { TextBlock } from "../../../types";

export const TextBlockSettings: VFC<{
  block: TextBlock;
  onBlockUpdated?: (block: TextBlock) => void;
}> = ({ block, onBlockUpdated }) => {
  const update = <TKey extends keyof TextBlock>(
    prop: TKey,
    value: TextBlock[TKey]
  ) => {
    if (onBlockUpdated) {
      onBlockUpdated({
        ...block,
        [prop]: value,
      });
    }
  };
  return (
    <div>
      <Form>
        <Form.TextArea
          value={block.body}
          rows="10"
          onChange={(_, data) => update("body", data.value as string)}
        ></Form.TextArea>
      </Form>
    </div>
  );
};
