import { Block } from "../../../types";
import { inferQueryOutput } from "../../../utils/trpc";

interface IEditorSelection {
  context: "page" | "block";
  id: number | string;
}
interface EditorBlockSelection extends IEditorSelection {
  context: "block";
  id: number;
}

interface EditorPageSelection extends IEditorSelection {
  context: "page";
  id: "title";
}

export type EditorSelection = null | EditorPageSelection | EditorBlockSelection;

type Page = inferQueryOutput<"pages.get">;

export interface Actions {
  PreviewReady: void;
  EditPage: void;
  PageUpdated: { page: Page };
  AddBlock: { position: number };
  EditBlock: { id: number };
  UpdateBlock: { block: Block };
  DeleteBlock: { id: number };
  MoveBlockUp: { id: number };
  MoveBlockDown: { id: number };
  EditorSelect: EditorSelection;
}
