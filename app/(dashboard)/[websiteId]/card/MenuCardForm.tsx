"use client";

import { Category, MenuCard, Product, UpdatedProducts, UUID } from "@/services/types";
import Title from "@/src/components/Title";
import { Button, Input, Label } from "@fork2e/umbrella";
import {
  Form,
  FormControl,
} from "@/src/ui/form";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormEvent, useState } from "react";
import { updateProducts } from "@/services/api/product";

export interface MenuCardFormProps {
  websiteId: UUID;
  categories: Category[];
  settings: MenuCard;
  cookiesList: any;
}

const FormSchema = z.object({
  content: z.array(
    z.object({
      title: z.string().min(1, "Le titre est requis"),
      description: z.string().min(1, "La description est requise"),
      price: z.number().min(1, "Le prix doit être un nombre positif"),
      category_id: z.number(),
    })
  ),
});

export default function MenuCardForm({ 
  websiteId,
  categories,
  settings: providedSettings,
  cookiesList,
}: MenuCardFormProps) {

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      content: Object.values(JSON.parse(providedSettings.content))
    },
  });

  const [hasSaved, setHasSaved] = useState(false);
  const [hasFailed, setHasFailed] = useState(false);

  const { control, handleSubmit } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "content",
  });
  
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const updatedContent = data.content.reduce((acc, item) => {
      acc[item.title] = {
        title: item.title,
        description: item.description,
        price: item.price,
        category_id: item.category_id,
      };
      return acc;
    }, {});
    const updatedProducts: UpdatedProducts = { content: updatedContent };

    try {
      await updateProducts(websiteId, cookiesList, updatedProducts);
      setHasSaved(true);
      setTimeout(() => {
        setHasSaved(false);
      }, 3000);
      form.reset(data);
    } catch (error) {
      setHasFailed(true);
      setTimeout(() => {
        setHasSaved(false);
      }, 3000);
    }

  };

  const resetSettings = (e: FormEvent) => {
    e.preventDefault();
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        className="w-full flex flex-col gap-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full flex flex-col gap-8">
          { 
            categories.map((category) => (
              <div key={category.id} className="flex flex-col gap-4">
                <Title tag="h2">{category.name}</Title>
                {
                  fields
                    .filter((field) => field.category_id === category.id)
                    .map((field, index) => {

                      const fieldIndex = fields.findIndex((productField) => productField.id === field.id);

                      return (
                        <div key={`${category.id}-${index}`} className="flex items-end gap-4">
                          <div className="flex flex-col gap-4 flex-1">
                            <Label className="font-bold">Nom</Label>
                            <FormControl>
                              <Input 
                                {...form.register(`content.${fieldIndex}.title`)}
                                defaultValue={field.title}
                              />
                            </FormControl>
                            {
                              form.formState.errors.content?.[fieldIndex]?.title && (
                                <p className="text-red-500 text-sm">
                                  {form.formState.errors.content[fieldIndex]?.title?.message}
                                </p>
                              )
                            }
                          </div>
                          <div className="flex flex-col gap-4 flex-1">
                            <Label className="font-bold">Description</Label>
                            <FormControl>
                              <Input 
                                {...form.register(`content.${fieldIndex}.description`)}
                                defaultValue={field.description}
                              />
                            </FormControl>
                            {
                              form.formState.errors.content?.[fieldIndex]?.description && (
                                <p className="text-red-500 text-sm">
                                  {form.formState.errors.content[fieldIndex]?.description?.message}
                                </p>
                              )
                            }
                          </div>
                          <div className="flex flex-col gap-4 flex-1">
                            <Label className="font-bold">Prix</Label>
                            <FormControl>
                              <Input 
                                {...form.register(`content.${fieldIndex}.price`, { valueAsNumber: true })}
                                defaultValue={field.price}
                                type="number"
                              />
                            </FormControl>
                            {
                              form.formState.errors.content?.[fieldIndex]?.price && (
                                <p className="text-red-500 text-sm">
                                  {form.formState.errors.content[fieldIndex]?.price?.message}
                                </p>
                              )
                            }
                          </div>
                          <Button
                            variant="subtle"
                            type="button"
                            onClick={() => remove(fieldIndex)}
                          >
                            Supprimer
                          </Button>
                        </div>
                      );
                    } 
                  )

                }
                <Button
                  type="button"
                  onClick={() => append({ title: '', description: '', price: 0, category_id: category.id })}
                >
                  Ajouter
                </Button>
              </div>
            ))
          }
        </div>

        <div className="flex gap-4">
          <Button
            disabled={!form.formState.isDirty}
            type="submit"
          >
            Sauvegarder les changements
          </Button>
          <Button
            disabled={!form.formState.isDirty}
            variant="subtle"
            onClick={resetSettings}
          >
            Annuler
          </Button>
        </div>
        {
          hasSaved && (
            <p className="font-bold bg-success self-start px-8 py-4 rounded-ui">
              Page mise à jour ✨
            </p>
          )
        }

        {
          hasFailed && (
            <p className="font-bold bg-danger self-start px-8 py-4 rounded-ui">
              Oups, la page n&apos;a pas pu être mise à jour 😢
            </p>
          )
        }
      </form>
    </Form>
  );
}
