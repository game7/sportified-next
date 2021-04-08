import { create } from "lodash";
import { VFC } from "react";
import { Form, Message, Segment } from "semantic-ui-react";
import { useForm } from "../../hooks/use-form";
import { trpc } from "../../utils/trpc";

interface AddPageProps {
  onPageCreated?: () => void;
}

export const AddPage: VFC<AddPageProps> = ({ onPageCreated }) => {
  const createPage = trpc.useMutation("pages.create");
  const form = useForm<{ title: string }>({}, (data, setError) => {
    createPage.mutate(data, {
      onSuccess() {
        onPageCreated && onPageCreated();
        form.reset();
      },
      onError(error) {
        setError(
          error.shape.results || {
            formErrors: [error.shape.message],
            fieldErrors: [],
          }
        );
      },
    });
  });

  return (
    <Segment>
      <Form {...form.form}>
        {form.error?.formErrors.map((e) => (
          <Message error key={e} content={e}></Message>
        ))}
        <Form.Input {...form.input("title")}></Form.Input>
        <Form.Button>Create Page</Form.Button>
      </Form>
    </Segment>
  );
};
