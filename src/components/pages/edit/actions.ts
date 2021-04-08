import { Page } from ".prisma/client";
import { Block } from "../../../types";

export interface Actions {
  EditPage: void;
  PageUpdated: { page: Page };
  EditBlock: { id: number };
  DeleteBlock: { id: number };
  AddBlock: { position: number };
  BlocksUpdated: { blocks: Block[] };
}
