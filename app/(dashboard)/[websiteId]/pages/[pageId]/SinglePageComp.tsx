"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/src/ui/form";
import { getPages, updatePage } from "@/services/api/page";
import { Page, UUID } from "@/services/types";
import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
} from "@fork2e/umbrella";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormEvent, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { emptyTextWidget, textWidget } from "@/services/widgets";
import { PAGE_NAMES } from "@/services/commons";

export interface SinglePageCompProps {
  page: Page;
  pageId: UUID;
  websiteId: UUID;
  menuPages: Page[];
  cookiesList: any;
}

const FormSchema = z.object({
  description: z.string(),
  widgets: z.array(textWidget),
  id: z.number(),
  type: z.union([
    z.literal('home'),
    z.literal('about'),
    z.literal('menu'),
    z.literal('contact'),
    z.literal('legal'),
  ]),
  order: z.number(),
  isActive: z.boolean().or(z.number().int().min(0).max(1)),
  uuid: z.string(),
  websiteId: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export default function SinglePageComp({
  page: providedPage,
  pageId,
  websiteId,
  menuPages,
  cookiesList
}: SinglePageCompProps) {

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      ...providedPage,
    },
  })

  const [hasSaved, setHasSaved] = useState(false);
  const [hasFailed, setHasFailed] = useState(false);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'widgets',
  });

  const renderTextWidget = 
  (widget: z.infer<typeof textWidget>, form: any, index: number) => {
    const errors = form.formState.errors;
  
    return (
      <div className="flex flex-col gap-4" key={widget.id}>
        <div className="flex items-center justify-between">
          <h3 className="font-bold mr-auto">{ widget.name }</h3>
          {
            index > 0 &&
              <Button variant="subtle" onClick={() => remove(index)}>
                Supprimer
              </Button>
          }
        </div>
        <div className="flex flex-col gap-8 p-4 rounded-ui border border-black/10">
          <FormField 
            control={form.control}
            name={`widgets.${index}.content.title`}
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  htmlFor={`widgets.${index}.content.title`}
                  className="font-bold"
                >
                  Titre
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id={`widgets.${index}.content.title`}
                    value={field.value}
                    {...form.register(`widgets.${index}.content.title`)}
                  />
                </FormControl>
                {
                  errors.widgets?.[index]?.content?.title && (
                    <div className="text-red-500 mt-4">
                      { errors.widgets[index].content.title.message }
                    </div>
                  )
                }
              </FormItem>
            )}
          />
          <FormField 
            control={form.control}
            name={`widgets.${index}.content.subtitle`}
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  htmlFor={`widgets.${index}.content.subtitle`}
                  className="font-bold"
                >
                  Sous-titre
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id={`widgets.${index}.content.subtitle`}
                    value={field.value}
                    {...form.register(`widgets.${index}.content.subtitle`)}
                  />
                </FormControl>
                {
                  errors.widgets?.[index]?.content?.subtitle && (
                    <div className="text-red-500 mt-4">
                      {errors.widgets[index].content.subtitle.message}
                    </div>
                  )
                }
              </FormItem>
            )}
          />
          <FormField 
            control={form.control}
            name={`widgets.${index}.content.hasButton`}
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  htmlFor={`widgets.${index}.content.hasButton`}
                  className="font-bold mr-4"
                >
                  Bouton
                </FormLabel>
                <FormControl>
                  <Switch
                    id={`widgets.${index}.content.hasButton`}
                    checked={field.value as boolean}
                    onCheckedChange={(e) => {
                      console.log('malafak', !field.value);
                      form.setValue(
                        `widgets.${index}.content.hasButton`,
                        !field.value,
                        { shouldDirty: true, shouldValidate: true }
                      )
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {
            form.watch(`widgets.${index}.content.hasButton`) ? (
              <>
                <FormField 
                  control={form.control}
                  name={`widgets.${index}.content.buttonContent`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        htmlFor={`widgets.${index}.content.buttonContent`}
                        className="font-bold"
                      >
                        Contenu du bouton
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id={`widgets.${index}.content.buttonContent`}
                          value={field.value}
                          {...form.register(`widgets.${index}.content.buttonContent`)}
                        />
                      </FormControl>
                      {
                        errors.widgets?.[index]?.content?.buttonContent && (
                          <div className="text-red-500 mt-4">
                            {errors.widgets[index].content.buttonContent.message}
                          </div>
                        )
                      }
                    </FormItem>
                  )}
                />
                <FormField 
                  control={form.control}
                  name={`widgets.${index}.content.buttonLink`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        htmlFor={`widgets.${index}.content.buttonLink`}
                        className="font-bold"
                      >
                        Lien du bouton
                      </FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                placeholder="Choisissez une page"
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {
                              menuPages.map((page) => (
                                <SelectItem key={page.id} value={page.type}>
                                  { PAGE_NAMES[page.type] }
                                </SelectItem>
                              ))
                            }
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </>
            ) : null
          }          
        </div>
      </div>
    )
  }
  
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      data.widgets.map((widget: any, i) => {
        widget.order = i;
      });
      await updatePage(websiteId, pageId, data, cookiesList);
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
  }
  
  const resetSettings = (e: FormEvent) => {
    e.preventDefault();
    form.reset();
  };

  useEffect(() => {
    console.log(form.formState.errors);
  }
  , [form.formState.errors]);

  return (
    <Form {...form}>
      <form
        className="col-span-5 flex flex-col gap-8"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField 
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="description" className="font-bold">
                Description
              </FormLabel>
              <FormControl>
                <Input {...field} id="description" value={field.value} />
              </FormControl>
            </FormItem>
          )}
        />

        { fields.map((widget, index) => renderTextWidget(widget, form, index)) }
                
        <Button
          size="fullWidth"
          onClick={() => append({ ...emptyTextWidget })}
        >
          Ajouter une zone texte
        </Button>
        
        <div className="flex gap-4">
          <Button disabled={!form.formState.isDirty} type="submit">
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
              Oups, la page n&pos;a pas pu être mise à jour 😢
            </p>
          )
        }
      </form>
    </Form>
  )
}
