"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button, Input, Switch } from "@fork2e/umbrella";
import { FormEvent, useState } from "react";

import { ContactSettings as ContactSettingsType, UUID } from "@/services/types";
import { updateContactSettings } from "@/services/api/contact-settings";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/src/ui/form";

export interface ContactSettingsFormProps {
  settings: ContactSettingsType;
  websiteId: UUID;
  cookiesList: any;
}

const FormSchema = z.object({
  email: z.string(),
  phoneNumber: z.string(),
  socialLinks: z.array(z.object({
    platform: z.string(),
    url: z.string(),
    is_active: z.boolean().or(z.number().int().min(0).max(1)),
  })),
});

export default function ContactSettings ({
  settings: providedSettings,
  websiteId,
  cookiesList,
}: ContactSettingsFormProps) {

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
      await updateContactSettings(websiteId, data, cookiesList);
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
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email" className="font-bold">
                Adresse email
              </FormLabel>
              <FormControl>
                <Input {...field} id="email" value={field.value} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="phoneNumber" className="font-bold">
                Numéro de téléphone
              </FormLabel>
              <FormControl>
                <Input {...field} id="phoneNumber" value={field.value} />
              </FormControl>
            </FormItem>
          )}
        />
        <h2 className="text-md font-bold">Réseaux sociaux et liens</h2>
        {
          providedSettings.socialLinks.map((socialLink, index) => (
            <FormField
              control={form.control}
              key={index}
              name={`socialLinks.${index}`}
              render={({ field }) => (
                <FormItem className="flex items-center gap-8">
                  <FormControl>
                    <Input
                      id={`socialLink${index}`}
                      value={field.value.url}
                      onChange={e => {
                        form.setValue(
                            `socialLinks.${index}.url`,
                            e.target.value,
                            { shouldDirty: true, shouldValidate: true }
                        );
                      }}
                    />
                  </FormControl>
                  <FormControl>
                    <Switch
                      id={`socialLinkSwitch${index}`}
                      checked={field.value.is_active as boolean}
                      onCheckedChange={e => {
                        form.setValue(
                            `socialLinks.${index}.is_active`,
                            !field.value.is_active,
                            { shouldDirty: true, shouldValidate: true }
                        );
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          ))
        }
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
              Paramètres de contact mis à jour ✨
            </p>
          )
        }

        {
          hasFailed && (
            <p className="font-bold bg-danger self-start px-8 py-4 rounded-ui">
              Oups, les paramètres contact n&apos;ont pas pu être mis à jour 😢
            </p>
          )
        }
      </form>
    </Form>
  );
}
