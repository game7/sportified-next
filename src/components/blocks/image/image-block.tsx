import { VFC } from "react";
import { ImageBlock } from "../../../types";

interface Props {
  block: ImageBlock;
}

export const ImageBlockCommponent: VFC<Props> = () => {
  return <div>Image goes here!</div>;
};
