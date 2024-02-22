import { ComponentPropsWithoutRef } from "react";

export interface TitleProps extends ComponentPropsWithoutRef<"h1"> {
  tag?: "h1" | "h2";
}


export default function Title({ tag = "h1", children }:TitleProps) {
  const Tag = tag as keyof JSX.IntrinsicElements;

  return(
    <Tag className={`${ tag === "h1" ? "text-4xl " : "text-2xl" } font-bold`}>{children}</Tag>
  )
}
