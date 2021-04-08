import { VFC } from "react";
import { Form } from "semantic-ui-react";
import { MarkdownBlock } from "../../../types";

export const MarkdownBlockSettings: VFC<{
  block: MarkdownBlock;
  onBlockUpdated?: (block: MarkdownBlock) => void;
}> = ({ block, onBlockUpdated }) => {
  const update = <TKey extends keyof MarkdownBlock>(
    prop: TKey,
    value: MarkdownBlock[TKey]
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
