import { useEffect, useState, VFC } from "react";
import { MarkdownBlock } from "../../types";
import remark from "remark";
import html from "remark-html";

interface Props {
  block: MarkdownBlock;
}

const DUMMY_TEXT = "add some Markdown here...";

export const MarkdownBlockComponent: VFC<Props> = ({ block }) => {
  const [markup, setMarkup] = useState("");

  useEffect(() => {
    remark()
      .use(html)
      .process(block.body || DUMMY_TEXT)
      .then((result) => setMarkup(result.toString()));
  }, [block]);

  return <div dangerouslySetInnerHTML={{ __html: markup }}></div>;
};
