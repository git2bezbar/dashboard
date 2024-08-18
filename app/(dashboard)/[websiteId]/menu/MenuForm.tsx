"use client";

import { Button, Label, Switch } from "@fork2e/umbrella";
import { DndContext, closestCorners } from "@dnd-kit/core";
import { FormEventHandler, useEffect, useState } from "react";

import { MenuPage } from "@/services/types";
import { PAGE_NAMES } from "@/services/commons";

import SortableList from "./SortableList";

export interface MenuFormProps {
  pages: MenuPage[];
  handleMenuUpdate(updatedMenu: MenuPage[]): void;
}

export default function MenuForm ({ pages, handleMenuUpdate }: MenuFormProps) {

  const [menuPages, menuPagesOrder] = useState<MenuPage[]>(pages);

  const changeIsActive = (id: string) => {
    const newPages = menuPages.map(page => {
      if (page.id === id) { return { ...page, isActive: !page.isActive }; }

      return page;
    });
    menuPagesOrder(newPages);
  };

  const [hasSaved, setHasSaved] = useState(false);
  const [hasFailed, setHasFailed] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    menuPages.map((page, index) => {
      if (page.order !== index) {
        const newPages = menuPages.map((p, i) => {
          if (p.id === page.id) { return { ...p, order: i }; }

          return p;
        });
        menuPagesOrder(newPages);
      }
    });
    setIsDirty(JSON.stringify(menuPages) !== JSON.stringify(pages));
  }, [menuPages, pages]);

  const handleSubmit: FormEventHandler<HTMLButtonElement> = e => {
    try {
      handleMenuUpdate(menuPages);
      setHasSaved(true);
      setTimeout(() => {
        setHasSaved(false);
      }, 3000);
      setIsDirty(false);
    } catch (error) {
      setHasFailed(true);
      setTimeout(() => {
        setHasSaved(false);
      }, 3000);
    }
  };

  return (
    <div className="col-span-5 flex flex-col gap-8">
      <h2 className="font-bold">
        Choisissez l’ordre et la visibilité de vos pages dans le header
      </h2>
      <div className="flex flex-col items-start gap-16">
        <DndContext collisionDetection={closestCorners}>
          <SortableList
            items={menuPages}
            onChange={menuPagesOrder}
            renderItem={item => (
              <SortableList.Item id={item.id}>
                <div className="flex items-center gap-4 w-full">
                  <SortableList.DragHandle />
                  <Label
                    className="cursor-pointer w-full"
                    htmlFor={item.type}
                  >
                    {PAGE_NAMES[item.type]}
                  </Label>
                </div>
                <Switch
                  id={item.type}
                  onClick={() => changeIsActive(item.id as string)}
                  checked={item.isActive}
                />
              </SortableList.Item>
            )}
          />
        </DndContext>
        <Button onClick={handleSubmit} disabled={!isDirty}>
        Sauvegarder les changements
        </Button>
      </div>

      {
        hasSaved && (
          <p className="font-bold bg-success self-start px-8 py-4 rounded-ui">
            Menu mis à jour ✨
          </p>
        )
      }

      {
        hasFailed && (
          <p className="font-bold bg-danger self-start px-8 py-4 rounded-ui">
            Oups, le menu n&apos;a pas pu être mis à jour 😢
          </p>
        )
      }
    </div>
  );
}
