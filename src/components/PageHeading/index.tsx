import { ComponentPropsWithoutRef } from "react";

export default function PageHeading({ children }:ComponentPropsWithoutRef<"div">) {
  return(
    <div className="flex flex-col items-start gap-4">{ children }</div>
  )
}
