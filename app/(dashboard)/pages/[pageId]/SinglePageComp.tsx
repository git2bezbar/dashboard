"use client";

import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast";
import { updatePage } from "@/services/api/page";
import { Page, UUID } from "@/services/types";
import { Button, Input, Label, RadioGroup, RadioGroupItem, Switch } from "@fork2e/umbrella";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormEvent } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

export interface SinglePageCompProps {
  page: Page;
  pageId: UUID;
}

const textWidget = z.object({
  id: z.number().optional(),
  name: z.literal("Texte"),
  order: z.number(),
  content: z.object({
    title: z.string(),
    subtitle: z.string(),
  }),
});

const textImageWidget = z.object({
  id: z.number().optional(),
  name: z.literal("Texte + Image"),
  order: z.number(),
  content: z.object({
    title: z.string(),
    subtitle: z.string(),
    image: z.number().or(z.string()),
    imagePosition: z.union([ z.literal("left"), z.literal("right") ]),
    imageAlt: z.string(),
  }),
});

const FormSchema = z.object({
  description: z.string(),
  widgets: z.array(z.union([ textImageWidget, textWidget ])),
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

const emptyTextWidget: z.infer<typeof textWidget> = {
  name: "Texte",
  order: 0,
  content: {
    title: "",
    subtitle: "",
  },
};

const emptyTextImageWidget: z.infer<typeof textImageWidget> = {
  name: "Texte + Image",
  order: 0,
  content: {
    title: "",
    subtitle: "",
    image: 0,
    imagePosition: "left",
    imageAlt: "",
  },
};

export default function SinglePageComp({ page: providedPage, pageId }: SinglePageCompProps) {

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      ...providedPage,
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'widgets',
  });

  const renderTextWidget = 
  (widget: z.infer<typeof textWidget>, form: any, index: number) => {
    return (
      <div className="flex flex-col gap-4" key={widget.id}>
        <div className="flex items-center justify-between">
          <h3 className="font-bold">{ widget.name }</h3>
          <Button
            variant="subtle"
            onClick={() => remove(index)}
          >
            Supprimer
          </Button>
        </div>
        <div className="flex flex-col gap-8 p-4 rounded-ui border border-black/10">
          <FormField 
            control={form.control}
            name={`widgets.${index}.content.title`}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={`widgets.${index}.content.title`} className="font-bold">
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
              </FormItem>
            )}
          />
          <FormField 
            control={form.control}
            name={`widgets.${index}.content.subtitle`}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={`widgets.${index}.content.subtitle`} className="font-bold">
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
              </FormItem>
            )}
          />
        </div>
      </div>
    )
  }

  const renderTextImageWidget = 
  (widget: z.infer<typeof textImageWidget>, form: any, index: number) => {
    return (
      <div className="flex flex-col gap-4" key={widget.id}>
        <div className="flex items-center justify-between">
          <h3 className="font-bold">{ widget.name }</h3>
          <Button
            variant="subtle"
            onClick={() => remove(index)}
          >
            Supprimer
          </Button>
        </div>
        <div className="flex flex-col gap-8 p-4 rounded-ui border border-black/10">
          <FormField 
            control={form.control}
            name={`widgets.${index}.content.title`}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={`widgets.${index}.content.title`} className="font-bold">
                  Titre
                </FormLabel>
                <FormControl>
                  <Input
                    { ...field }
                    id={`widgets.${index}.content.title`}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField 
            control={form.control}
            name={`widgets.${index}.content.subtitle`}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={`widgets.${index}.content.subtitle`} className="font-bold">
                  Sous-titre
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id={`widgets.${index}.content.subtitle`}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`widgets.${index}.content.imagePosition`}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={`widgets.${index}.content.imagePosition`} className="font-bold">
                  Position de l&apos;image
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    className="flex flex-col items-start gap-4"
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormItem className="flex items-center gap-4">
                      <FormControl>
                        <RadioGroupItem value="left" id={`left.${index}`} />
                      </FormControl>
                      <FormLabel>
                        <Label htmlFor={`left.${index}`}>Image à gauche</Label>
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center gap-4">
                      <FormControl>
                        <RadioGroupItem value="right" id={`right.${index}`} />
                      </FormControl>
                      <FormLabel>
                        <Label htmlFor={`right.${index}`}>Image à droite</Label>
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField 
            control={form.control}
            name={`widgets.${index}.content.imageAlt`}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={`widgets.${index}.content.imageAlt`} className="font-bold">
                  Description de l&apos;image
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id={`widgets.${index}.content.imageAlt`}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </div>
    )
  }

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      data.widgets.map((widget: any, i) => {
        widget.order = i;
      });
      await updatePage('1bcc2d88-43e2-47f9-a009-d7a2418604df', pageId, data);
      toast({
        title: "Page mise à jour ✨"
      })
    } catch (error) {
      toast({
        title: "Oups, la page n'a pas pu être mise à jour 😢",
        variant: "destructive"
      })
    }
  }
  
  const resetSettings = (e: FormEvent) => {
    e.preventDefault();
    form.reset();
  };

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

        { 
          fields.map((widget, index) => {
            if (widget.name !== "Texte" && widget.name !== "Texte + Image") return null;

            if (widget.name === "Texte") {
              return renderTextWidget(widget, form, index);
            }

            if (widget.name === "Texte + Image") {
              return renderTextImageWidget(widget, form, index);
            }
          })
        }

        <Dialog>
          <DialogTrigger asChild>
            <Button size="fullWidth" className={fields.length > 10 ? "hidden" : ""}>Ajouter un widget</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter une zone</DialogTitle>
              <DialogDescription className="flex gap-8 pt-4">
                <DialogClose>
                  <Button
                    variant="subtle"
                    className="p-4 rounded-ui border border-black/10"
                    onClick={() => append({ ...emptyTextImageWidget })}
                  >
                    Texte + Image
                  </Button>
                </DialogClose>
                <DialogClose>
                  <Button
                    variant="subtle"
                    className="p-4 rounded-ui border border-black/10"
                    onClick={() => append({ ...emptyTextWidget })}
                  >
                    Texte
                  </Button>
                </DialogClose>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        
        <div className="flex gap-4">
          <Button disabled={!form.formState.isDirty} type="submit">Sauvegarder les changements</Button>
          <Button disabled={!form.formState.isDirty} variant="subtle" onClick={resetSettings}>Annuler</Button>
        </div>
      </form>
    </Form>
  )
}