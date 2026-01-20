import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Italics({ children }: Props) {
  return <span style={{ fontStyle: "italic" }}>{children}</span>;
}
