import { Page } from ".prisma/client";
import { VFC } from "react";
import { Form, Header } from "semantic-ui-react";

interface Props {
  page: Page;
  onPageChanged: (page: Page) => void;
}

export const PageSettings: VFC<Props> = ({ page, onPageChanged }) => {
  function patchPage(attrs: Partial<Page>) {
    const updated = {
      ...page,
      ...attrs,
    };
    onPageChanged && onPageChanged(updated);
  }
  return (
    <div>
      <Header as="h3" dividing content="Page Settings" />
      <Form>
        <Form.Input
          label="Title"
          value={page.title}
          onChange={(_, data) => patchPage({ title: data.value })}
        ></Form.Input>
      </Form>
    </div>
  );
};
