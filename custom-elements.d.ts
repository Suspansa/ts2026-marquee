import type { DetailedHTMLProps, HTMLAttributes } from "react";

type CustomElement<Extra = object> = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & Extra;

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "pbc-button": CustomElement;
      "pbc-vidyard-player": CustomElement<{ "video-uuid"?: string }>;
      "pbc-vidyard-analytics": CustomElement<{ "video-uuid"?: string; "live-video"?: string }>;
    }
  }
}
