"use client";

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
import { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { GeneralSettings, UUID } from "@/services/types";
import { updateGeneralSettings } from "@/services/api/general-settings";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/src/ui/form";

export interface GeneralSettingsFormProps {
  settings: GeneralSettings;
  websiteId: UUID;
  cookiesList: any;
}

function generateTimeSlots (): string[] {
  const timeSlots: string[] = [];

  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const formattedHour = hour.toString().padStart(2, "0");
      const formattedMinute = minute.toString().padStart(2, "0");
      const timeSlot = `${formattedHour}:${formattedMinute}`;

      timeSlots.push(timeSlot);
    }
  }

  return timeSlots;
}

const hours = generateTimeSlots();

const FormSchema = z.object({
  websiteTitle: z.string().min(1, "Le titre du site web ne doit pas être vide"),
  websiteHeadline: z.string().min(1, "Le slogan du site web ne doit pas être vide"),
  street: z.string().min(1, "L'adresse ne doit pas être vide"),
  city: z.string().min(1, "La ville ne doit pas être vide"),
  postCode: z.string()
    .length(5, { message: "Le code postal doit comporter exactement 5 chiffres" })
    .regex(/^\d{5}$/, { message: "Le code postal doit être composé uniquement de chiffres" }),
  timeSlots: z.array(
    z.object({
      dayOfWeek: z.string(),
      isActive: z.boolean().or(z.number().int().min(0).max(1)),
      openingTime: z.string(),
      closingTime: z.string(),
      slotNumber: z.number().int().min(1).max(2),
    })
  ),
});

export default function GeneralSettingsForm ({
  settings: providedSettings,
  websiteId,
  cookiesList,
}: GeneralSettingsFormProps) {

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
      await updateGeneralSettings(websiteId, data, cookiesList);
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

  const resetSettings = (e:FormEvent) => {
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
          name="websiteTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="websiteTitle" className="font-bold">
                Titre du site web
              </FormLabel>
              <FormControl>
                <Input {...field} id="websiteTitle" value={field.value} />
              </FormControl>
              {
                form.formState.errors.websiteTitle && (
                  <p className="text-red-500 text-sm mt-4">
                    {form.formState.errors.websiteTitle.message}
                  </p>
                )
              }
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="websiteHeadline"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="websiteHeadline" className="font-bold">
                Slogan du site web
              </FormLabel>
              <FormControl>
                <Input {...field} id="websiteHeadline" value={field.value} />
              </FormControl>
              {
                form.formState.errors.websiteHeadline && (
                  <p className="text-red-500 text-sm mt-4">
                    {form.formState.errors.websiteHeadline.message}
                  </p>
                )
              }
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="street"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="street" className="font-bold">
                Adresse
              </FormLabel>
              <FormControl>
                <Input {...field} id="street" value={field.value} />
              </FormControl>
              {
                form.formState.errors.street && (
                  <p className="text-red-500 text-sm mt-4">
                    {form.formState.errors.street.message}
                  </p>
                )
              }
            </FormItem>
          )}
        />
        <div className="flex gap-8 w-full">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input {...field} id="city" value={field.value} />
                </FormControl>
                {
                  form.formState.errors.city && (
                    <p className="text-red-500 text-sm mt-4">
                      {form.formState.errors.city.message}
                    </p>
                  )
                }
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="postCode"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input {...field} id="postCode" value={field.value} />
                </FormControl>
                {
                  form.formState.errors.postCode && (
                    <p className="text-red-500 text-sm mt-4">
                      {form.formState.errors.postCode.message}
                    </p>
                  )
                }
              </FormItem>
            )}
          />
        </div>

        <h2 className="text-md font-bold">Horaires</h2>
        {
          providedSettings.timeSlots.map((timeSlot, index) => (
            <FormField
              control={form.control}
              key={index}
              name={`timeSlots.${index}`}
              render={({ field }) => (
                <FormItem className="flex flex-col items-start gap-4">
                  {
                    timeSlot.slotNumber === 1 ? (
                      <div className="flex items-center space-between gap-4">
                        <h3 className="text-sm font-bold">
                          {timeSlot.dayOfWeek}
                        </h3>
                        <FormControl>
                          <Switch
                            id={`socialLinkSwitch${index}`}
                            checked={field.value.isActive as boolean}
                            onCheckedChange={e => {
                              const newIsActive = !field.value.isActive;

                              const daySlots = providedSettings.timeSlots.filter(
                                slot => slot.dayOfWeek === timeSlot.dayOfWeek
                              );

                              daySlots.forEach(slot => {
                                const slotIndex = providedSettings.timeSlots.indexOf(slot);
                                form.setValue(
                                  `timeSlots.${slotIndex}.isActive`,
                                  newIsActive,
                                  { shouldDirty: true, shouldValidate: true }
                                );
                              });
                            }}
                          />
                        </FormControl>
                      </div>
                    ) : null
                  }
                  {
                    field.value.isActive ? (
                      <>
                        {
                          timeSlot.slotNumber === 1
                            ? <h3 className="text-xs font-bold">Matin</h3>
                            : <h3 className="text-xs font-bold">Après-midi</h3>
                        }
                        <div className="flex gap-4">
                          <Select
                            value={field.value.openingTime}
                            onValueChange={e => {
                              form.setValue(
                                `timeSlots.${index}.openingTime`,
                                e,
                                { shouldDirty: true, shouldValidate: true }
                              );
                            }}
                          >
                            <FormControl>
                              <SelectTrigger className="w-[300px]">
                                <SelectValue
                                  placeholder="Choisissez votre horaire d'ouverture"
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {
                                hours.map((hour, index) => (
                                  <SelectItem key={index} value={hour}>
                                    {hour}
                                  </SelectItem>
                                ))
                              }
                            </SelectContent>
                          </Select>
                          <Select
                            value={field.value.closingTime}
                            onValueChange={e => {
                              form.setValue(
                                `timeSlots.${index}.closingTime`,
                                e,
                                { shouldDirty: true, shouldValidate: true }
                              );
                            }}
                          >
                            <FormControl>
                              <SelectTrigger className="w-[300px]">
                                <SelectValue
                                  placeholder="Choisissez votre horaire de
                                  fermeture"
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {hours.map((hour, index) => (
                                <SelectItem key={index} value={hour}>
                                  {hour}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </>
                    ) : null
                  }
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
              Paramètres généraux mis à jour ✨
            </p>
          )
        }

        {
          hasFailed && (
            <p className="font-bold bg-danger self-start px-8 py-4 rounded-ui">
              Oups, les paramètres généraux n&apos;ont pas pu être mis à jour 😢
            </p>
          )
        }
      </form>
    </Form>
  );
}
