import type React from "react";
import type { Editor as CoreEditor } from "@tiptap/core";
import type { Editor } from "@tiptap/react";
import type { EditorState } from "@tiptap/pm/state";
import type { EditorView } from "@tiptap/pm/view";

export type MenuProps = {
  editor: Editor;
  appendTo?: React.RefObject<any>;
  shouldHide?: boolean;
};

export type ShouldShowProps = {
  editor?: CoreEditor;
  view: EditorView;
  state?: EditorState;
  oldState?: EditorState;
  from?: number;
  to?: number;
};
