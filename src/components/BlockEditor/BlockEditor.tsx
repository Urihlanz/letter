import { EditorContent } from "@tiptap/react";
import type { JSX } from "react";
import React, { useRef, useState } from "react";

import { LinkMenu, TextMenu } from "@/components/Menus";
import { useBlockEditor } from "@/hooks/useBlockEditor";
import "@/styles/index.css";
import { TableColumnMenu, TableRowMenu } from "@/extensions/Table/menus";

import { EditorHeader } from "./components/EditorHeader";

export const BlockEditor = (): JSX.Element | null => {
  const [, setIsEditable] = useState(true);
  const menuContainerRef = useRef(null);

  const { editor } = useBlockEditor({
    onTransaction({ editor: currentEditor }) {
      setIsEditable(currentEditor.isEditable);
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="flex h-full" ref={menuContainerRef}>
      <div className="relative flex flex-col flex-1 h-full overflow-hidden">
        <EditorHeader editor={editor} />
        <EditorContent editor={editor} className="flex-1 overflow-y-auto" />
        <LinkMenu editor={editor} appendTo={menuContainerRef} />
        <TextMenu editor={editor} />
        <TableRowMenu editor={editor} appendTo={menuContainerRef} />
        <TableColumnMenu editor={editor} appendTo={menuContainerRef} />
      </div>
    </div>
  );
};
