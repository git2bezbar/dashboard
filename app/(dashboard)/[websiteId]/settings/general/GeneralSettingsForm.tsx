'use client';

import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { updateGeneralSettings } from "@/services/api/general-settings";
import { GeneralSettings } from "@/services/types";
import { Button, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Switch } from "@fork2e/umbrella";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormEvent } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export interface GeneralSettingsFormProps {
  settings: GeneralSettings;
}

function generateTimeSlots(): string[] {
  const timeSlots: string[] = [];
  
  for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
          const formattedHour = hour.toString().padStart(2, '0');
          const formattedMinute = minute.toString().padStart(2, '0');
          const timeSlot = `${formattedHour}:${formattedMinute}`;
          
          timeSlots.push(timeSlot);
      }
  }
  
  return timeSlots;
}

const hours = generateTimeSlots();

const FormSchema = z.object({
  websiteTitle: z.string(),
  websiteHeadline: z.string(),
  websiteLogo: z.string(),
  websiteFavicon: z.string(),
  street: z.string(),
  city: z.string(),
  postCode: z.string(),
  timeSlots: z.array(
    z.object({
      dayOfWeek: z.string(),
      openingTime: z.string(),
      closingTime: z.string(),
      slotNumber: z.number().int().min(1).max(2),
    })
  ),
});

export default function GeneralSettingsForm({ settings: providedSettings }: GeneralSettingsFormProps) {
    const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      ...providedSettings,
    },
  })
  
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      await updateGeneralSettings('1bcc2d88-43e2-47f9-a009-d7a2418604df', data);
      toast({
        title: "Paramètres de contact mis à jour ✨"
      })
    } catch (error) {
      toast({
        title: "Oups, les paramètres de contact n'ont pas pu être mis à jour 😢",
        variant: "destructive"
      })
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
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="websiteLogo"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="websiteLogo" className="font-bold">
                Logo de l’établissement
              </FormLabel>
              <FormControl>
                <Input type="file" {...field} id="websiteLogo" value={field.value} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="websiteFavicon"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="websiteFavicon" className="font-bold">
                Favicon du site web
              </FormLabel>
              <FormControl>
                <Input type="file" {...field} id="websiteFavicon" value={field.value} />
              </FormControl>
            </FormItem>
          )}
        /> */}
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
            </FormItem>
          )}
        />
        <div className="flex gap-8 w-full">
          <FormField
            control={form.control}
            name="postCode"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input {...field} id="postCode" value={field.value} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input {...field} id="city" value={field.value} />
                </FormControl>
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
                        <h3 className="text-sm font-bold">{timeSlot.dayOfWeek}</h3>
                      ) : null
                    }
                    {
                      timeSlot.slotNumber === 1 
                        ? <h3 className="text-xs font-bold">Matin</h3>
                        : <h3 className="text-xs font-bold">Après-midi</h3>
                    }
                    <div className="flex gap-4">
                      <Select
                        value={field.value.openingTime}
                        onValueChange={(e) => {
                          form.setValue(`timeSlots.${index}.openingTime`, e, { shouldDirty: true, shouldValidate: true })
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
                          {hours.map((hour, index) => (
                            <SelectItem key={index} value={hour}>
                              {hour}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select
                        value={field.value.closingTime}
                        onValueChange={(e) => { 
                          form.setValue(`timeSlots.${index}.closingTime`, e, { shouldDirty: true, shouldValidate: true })
                        }}
                      >
                        <FormControl>
                          <SelectTrigger className="w-[300px]">
                            <SelectValue
                              placeholder="Choisissez votre horaire de fermeture" 
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
                  </FormItem>
                )}
              />
            ))
          }
        <div className="flex gap-4">
          <Button disabled={!form.formState.isDirty} type="submit">Sauvegarder les changements</Button>
          <Button disabled={!form.formState.isDirty} variant="subtle" onClick={resetSettings}>Annuler</Button>
        </div>
      </form>
    </Form>
  )
}
