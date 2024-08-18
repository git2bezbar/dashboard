"use client";

import {
  Button,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@fork2e/umbrella";
import { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { CustomizationSettings, UUID } from "@/services/types";
import { updateCustomizationSettings } from "@/services/api/customization";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/src/ui/form";
import { Color } from "@/src/ui/color";

export interface CustomizationSettingsFormProps {
  settings: CustomizationSettings;
  websiteId: UUID;
  cookiesList: any;
}

const FormSchema = z.object({
  primaryColor: z.string(),
  secondaryColor: z.string(),
  textFont: z.string(),
});

export default function CustomizationSettingsForm ({
  settings: providedSettings,
  websiteId,
  cookiesList,
}: CustomizationSettingsFormProps) {

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      ...providedSettings,
    },
  });

  const [hasSaved, setHasSaved] = useState(false);
  const [hasFailed, setHasFailed] = useState(false);

  async function onSubmit (data: z.infer<typeof FormSchema>) {
    try {
      await updateCustomizationSettings(websiteId, data, cookiesList);
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

  return (
    <Form {...form}>
      <form
        className="col-span-5 flex flex-col gap-8"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold">Générale</h2>
          <div className="flex flex-col justify-start items-start gap-4">
          </div>
          <div className="flex flex-col justify-start items-start gap-4">
            <Label className="font-bold" htmlFor="primaryColor">
              Couleur principale
            </Label>
            <FormField
              control={form.control}
              name="primaryColor"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Color {...field} currentColor={field.value} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col items-start gap-4">
            <Label className="font-bold" htmlFor="secondaryColor">
              Couleur secondaire
            </Label>
            <FormField
              control={form.control}
              name="secondaryColor"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Color {...field} currentColor={field.value} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col justify-start items-start gap-4">
            <FormField
              control={form.control}
              name="textFont"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <Label className="font-bold">Police du site web</Label>
                  </FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[300px]">
                        <SelectValue
                          placeholder="Choisissez la police des textes"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="poppins">Poppins</SelectItem>
                      <SelectItem value="raleway">Raleway</SelectItem>
                      <SelectItem value="dm-sans">DM Sans</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
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
              Paramètres de personnalisation mis à jour ✨
            </p>
          )
        }

        {
          hasFailed && (
            <p className="font-bold bg-danger self-start px-8 py-4 rounded-ui">
              Oups, les paramètres de personnalisation n&apos;ont pas pu être mis à jour 😢
            </p>
          )
        }
      </form>
    </Form>
  );
}
