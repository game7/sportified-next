import { useRef } from "react";
import { useEffect } from "react";
import { VFC } from "react";
import { Form, Header, Ref, Input, Label } from "semantic-ui-react";
import { inferQueryOutput } from "../../../utils/trpc";

type Page = inferQueryOutput<"pages.get">;
interface Props {
  page: Page;
  onPageChanged: (page: Page) => void;
}

export const PageSettings: VFC<Props> = ({ page, onPageChanged }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current && inputRef.current.focus();
  }, []);

  function patchPage(attrs: Partial<Page>) {
    const updated = {
      ...page,
      ...attrs,
    };
    onPageChanged && onPageChanged(updated);
  }

  function focus() {
    inputRef.current.focus();
  }

  return (
    <div>
      <Header as="h3" dividing content="Page Settings" />
      <Form>
        <Form.Field>
          <label>Text</label>
          <Input
            value={page.title}
            onChange={(_, data) => patchPage({ title: data.value })}
            ref={inputRef}
          ></Input>
        </Form.Field>
      </Form>
      <button onClick={() => focus()}>focus pocus!</button>
    </div>
  );
};
