import { ComponentPropsWithoutRef } from "react";

export default function Subtitle({ children }:ComponentPropsWithoutRef<"p">) {
  return(
    <p className="text-sm text-subtitle">{children}</p>
  )
}