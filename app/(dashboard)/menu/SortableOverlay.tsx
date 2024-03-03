import { DragOverlay, DropAnimation, defaultDropAnimationSideEffects } from "@dnd-kit/core";
import { PropsWithChildren } from "react";

const dropAnimationConfig: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0.4"
      }
    }
  })
};

export default function SortableOverlay({ children }:PropsWithChildren<{}>) {
  return (
    <DragOverlay dropAnimation={dropAnimationConfig}>{children}</DragOverlay>
  )
}