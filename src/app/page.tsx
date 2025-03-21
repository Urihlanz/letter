"use client";

import type { JSX } from "react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { BlockEditor } from "@/components/BlockEditor";
import { Surface } from "@/components/ui/Surface";
import { Icon } from "@/components/ui/Icon";
import { useDarkmode } from "@/hooks/useDarkMode";
import { Toolbar } from "@/components/ui/Toolbar";

const Document = (): JSX.Element => {
  const { isDarkMode, darkMode, lightMode } = useDarkmode();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  let DarkModeSwitcher = null;

  if (isClient) {
    DarkModeSwitcher = createPortal(
      <Surface className="flex items-center gap-1 fixed bottom-6 right-6 z-[99999] p-1">
        <Toolbar.Button onClick={lightMode} active={!isDarkMode}>
          <Icon name="Sun" />
        </Toolbar.Button>
        <Toolbar.Button onClick={darkMode} active={isDarkMode}>
          <Icon name="Moon" />
        </Toolbar.Button>
      </Surface>,
      document.body
    );
  }

  return (
    <>
      {DarkModeSwitcher}
      <BlockEditor />
    </>
  );
};

export default Document;
