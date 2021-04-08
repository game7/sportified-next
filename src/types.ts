export type BlockType = "text" | "divider" | "markdown" | "image";

export interface BaseBlock {
  id: number;
  type: BlockType;
}

export interface DividerBlock extends BaseBlock {
  type: "divider";
}
export interface ImageBlock extends BaseBlock {
  type: "image";
}

export interface TextBlock extends BaseBlock {
  type: "text";
  body: string;
}

export interface MarkdownBlock extends BaseBlock {
  type: "markdown";
  body: string;
}

export type Block = DividerBlock | TextBlock | MarkdownBlock | ImageBlock;
