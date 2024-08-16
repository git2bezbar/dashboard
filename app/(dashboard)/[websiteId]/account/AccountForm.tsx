"use client";

import { Button, Input } from "@fork2e/umbrella";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/src/ui/form";
import { updateAccountInfo } from "@/services/api/account";
import { AccountInfo } from "@/services/types";

export interface AccountFormProps {
  settings: AccountInfo;
  cookiesList: any;
}

const FormSchema = z.object({
  lastname: z.string(),
  firstname: z.string(),
});

export default function AccountForm ({
  settings: providedSettings,
  cookiesList,
}: AccountFormProps) {

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
      await updateAccountInfo(data, cookiesList);
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
          name="lastname"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="lastname" className="font-bold">
                Nom
              </FormLabel>
              <FormControl>
                <Input {...field} id="lastname" value={field.value} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="firstname"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="firstname" className="font-bold">
                Prénom
              </FormLabel>
              <FormControl>
                <Input {...field} id="firstname" value={field.value} />
              </FormControl>
            </FormItem>
          )}
        />

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
              Informations de compte mis à jour ✨
            </p>
          )
        }

        {
          hasFailed && (
            <p className="font-bold bg-danger self-start px-8 py-4 rounded-ui">
              Oups, les informations de compte n&pos;ont pas pu être mis à jour 😢
            </p>
          )
        }
      </form>
    </Form>
  );
}
