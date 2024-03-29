'use client';

import { PAGE_NAMES } from "@/services/commons";
import { MenuPage } from "@/services/types";
import { Button, Label, Switch } from "@fork2e/umbrella";
import { DndContext, closestCorners } from "@dnd-kit/core";
import { FormEventHandler, useEffect, useState } from "react";
import SortableList from "./SortableList";
import { toast } from "@/components/ui/use-toast";

export interface MenuFormProps {
  pages: MenuPage[];
  handleMenuUpdate(updatedMenu: MenuPage[]): void;
}

export default function MenuForm({ pages, handleMenuUpdate }: MenuFormProps) {
  const [menuPages, menuPagesOrder] = useState<MenuPage[]>(pages);
  const changeIsActive = (id: string) => {
    const newPages = menuPages.map((page) => {
      if (page.id === id) {
        return {
          ...page,
          isActive: !page.isActive,
        }
      }
      return page;
    });
    menuPagesOrder(newPages);
  }
  
  useEffect(() => {
    menuPages.map((page, index) => {
      if (page.order !== index) {
        const newPages = menuPages.map((p, i) => {
          if (p.id === page.id) {
            return {
              ...p,
              order: i,
            }
          }
          return p;
        });
        menuPagesOrder(newPages);
      }
    });
  }, [menuPages]);

  const handleSubmit: FormEventHandler<HTMLButtonElement> = (e) => {
    try {
      handleMenuUpdate(menuPages);
      toast({
        title: "Paramètres de menu mis à jour ✨"
      })
    } catch (error) {
      toast({
        title: "Oups, les paramètres de menu n'ont pas pu être mis à jour 😢",
        variant: "destructive"
      })
    }
  };

  return (
    <div className="col-span-5 flex flex-col gap-8">
      <h2 className="font-bold">Choisissez l’ordre et la visibilité de vos pages dans le header</h2>
      <div className="flex flex-col items-start gap-16">
      <DndContext collisionDetection={closestCorners}>
        <SortableList
          items={menuPages}
          onChange={menuPagesOrder}
          renderItem={(item) => (
            <SortableList.Item id={item.id}>
              <div className="flex items-center gap-4 w-full">
                <SortableList.DragHandle />
                <Label className="cursor-pointer w-full" htmlFor={item.type}>{PAGE_NAMES[item.type]}</Label>
              </div>
              <Switch id={item.type} onClick={() => changeIsActive(item.id as string)} checked={item.isActive}/>
            </SortableList.Item>
          )}
          />
      </DndContext>
      <Button onClick={handleSubmit}>Sauvegarder les changements</Button>
      </div>
    </div>
  )
}