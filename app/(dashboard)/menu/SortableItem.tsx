import { DraggableSyntheticListeners, UniqueIdentifier } from "@dnd-kit/core"
import { useSortable } from "@dnd-kit/sortable";
import { CSSProperties, PropsWithChildren, createContext, useContext, useMemo } from "react";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  id: UniqueIdentifier;
}

interface Context {
  attributes: Record<string, any>;
  listeners: DraggableSyntheticListeners;
  ref(node: HTMLElement | null): void;
}

const SortableItemContext = createContext<Context>({
  attributes: {},
  listeners: undefined,
  ref() {}
});

export function SortableItem({ children, id }: PropsWithChildren<Props>) {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition
  } = useSortable({ id });
  const context = useMemo(
    () => ({
      attributes,
      listeners,
      ref: setActivatorNodeRef
    }),
    [attributes, listeners, setActivatorNodeRef]
  );
  const style: CSSProperties = {
    opacity: isDragging ? 0.4 : undefined,
    transform: CSS.Translate.toString(transform),
    transition
  };

  return (
    <SortableItemContext.Provider value={context}>
      <li
        ref={setNodeRef}
        style={style}
        className="flex justify-between items-center p-4 rounded-ui border border-black/10 bg-white min-w-60 touch-none"
      >
        {children}
      </li>
    </SortableItemContext.Provider>
  )
}

const Circle = () => (
  <span className="h-1 w-1 rounded-full bg-primary"></span>
)

const CircleGroup = () => (
  <div className="flex gap-1 h-full cursor-grab">
    <div className="flex flex-col gap-1 h-full">
      <Circle />
      <Circle />
      <Circle />
    </div>
    <div className="flex flex-col gap-1 h-full">
      <Circle />
      <Circle />
      <Circle />
    </div>
  </div>
)

export function DragHandle() {
  const { attributes, listeners, ref } = useContext(SortableItemContext);

  return (
    <button {...attributes} {...listeners} ref={ref}>
      <CircleGroup />
    </button>
  );
}