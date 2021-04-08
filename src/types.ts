export type BlockType = "text" | "divider";

export interface BaseBlock {
  id: number;
  type: BlockType;
}

export interface DividerBlock extends BaseBlock {
  type: "divider";
}

export interface TextBlock extends BaseBlock {
  type: "text";
  body: string;
}

export type Block = DividerBlock | TextBlock;
