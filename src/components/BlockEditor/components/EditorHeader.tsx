"use client";

import type { Editor } from "@tiptap/core";
import { useEditorState } from "@tiptap/react";
import type { JSX } from "react";
import { useCallback } from "react";

import { Icon } from "@/components/ui/Icon";

import { EditorInfo } from "./EditorInfo";
import { Toolbar } from "@/components/ui/Toolbar";
import { logout } from "@/app/actions/auth";

type EditorHeaderProps = {
  editor: Editor;
};

export const EditorHeader = ({ editor }: EditorHeaderProps): JSX.Element => {
  const { characters, words } = useEditorState({
    editor,
    selector: (ctx): { characters: number; words: number } => {
      const { characters, words } = ctx.editor?.storage.characterCount || {
        characters: (): number => 0,
        words: (): number => 0,
      };

      return { characters: characters(), words: words() };
    },
  });

  const toggleEditable = useCallback(() => {
    editor.setOptions({ editable: !editor.isEditable });
    editor.view.dispatch(editor.view.state.tr);
  }, [editor]);

  const handlePrint = (): void => {
    if (editor) {
      const htmlContent = editor?.getHTML();

      const iframe = document.createElement("iframe");
      iframe.style.position = "absolute";
      iframe.style.left = "-9999px";
      document.body.appendChild(iframe);

      iframe.contentDocument?.write(`
        <html>
          <head>
            <title>Печать документа</title>
            <style>
              body { font-family: Arial, sans-serif; }
            </style>
          </head>
          <body>
            ${htmlContent}
          </body>
        </html>
      `);
      iframe.contentDocument?.close();

      iframe.contentWindow?.print();

      document.body.removeChild(iframe);
    }
  };

  return (
    <div className="flex flex-row items-center justify-between flex-none py-2 pl-6 pr-3 text-black bg-white border-b border-neutral-200 dark:bg-black dark:text-white dark:border-neutral-800">
      <div className="flex flex-row gap-x-1.5 items-center">
        <div className="flex items-center gap-x-1.5">
          <Toolbar.Button onClick={toggleEditable}>
            <Icon name={editor.isEditable ? "PenOff" : "Pen"} />
          </Toolbar.Button>
          <Toolbar.Button onClick={handlePrint}>
            <Icon name="Printer" />
          </Toolbar.Button>
        </div>
      </div>
      <EditorInfo characters={characters} words={words} />
      <Toolbar.Button onClick={() => logout()}>
        <Icon name="LogOut" />
      </Toolbar.Button>
    </div>
  );
};
