import { VFC } from "react";
import { Divider } from "semantic-ui-react";
import { DividerBlock } from "../../types";

interface Props {
  block: DividerBlock;
}

export const DividerBlockCommponent: VFC<Props> = () => {
  return <Divider></Divider>;
};
