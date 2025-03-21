import type { JSX } from "react";

import { Surface } from "@/components/ui/Surface";
import { Toolbar } from "@/components/ui/Toolbar";

type LinkPreviewPanelProps = {
  url: string;
};

export const LinkPreviewPanel = ({ url }: LinkPreviewPanelProps): JSX.Element => {
  const sanitizedLink = url?.startsWith("javascript:") ? "" : url;

  return (
    <Surface className="flex items-center gap-2 p-2">
      <a
        href={sanitizedLink}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm underline break-all"
      >
        {url}
      </a>
      <Toolbar.Divider />
    </Surface>
  );
};
