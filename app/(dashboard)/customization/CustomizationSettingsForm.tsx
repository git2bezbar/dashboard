'use client';

import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { updateCustomizationSettings } from "@/services/api/customization";
import { CustomizationSettings } from "@/services/types";
import {
  Button,
  Color,
  Input,
  Label,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@fork2e/umbrella";
import { FormEvent } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";

export interface CustomizationSettingsFormProps {
  settings: CustomizationSettings;
}

const FormSchema = z.object({
  headerLayout: z.string(),
  theme: z.string(),
  primaryColor: z.string(),
  secondaryColor: z.string(),
  titleFont: z.string(),
  textFont: z.string(),
  buttonFont: z.string(),
  footerLayout: z.string(),
});

export default function CustomizationSettingsForm({ settings: providedSettings }:CustomizationSettingsFormProps) {

  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      ...providedSettings,
    },
  })
 
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      await updateCustomizationSettings('1bcc2d88-43e2-47f9-a009-d7a2418604df', data);
      toast({
        title: "Paramètres de personnalisation mis à jour ✨"
      })
    } catch (error) {
      toast({
        title: "Oups, les paramètres de personnalisation n'ont pas pu être mis à jour 😢",
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
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold">Header</h2>
          <div className="flex flex-col justify-start items-start gap-4">
            <h3 className="text-md font-bold">Agencement du header</h3>
            <FormField
              control={form.control}
              name="headerLayout"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      className="flex flex-col items-start gap-4"
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormItem className="flex items-center gap-4">
                        <FormControl>
                          <RadioGroupItem value="1" id="left" />
                        </FormControl>
                        <FormLabel>
                          <Label htmlFor="left">Alignement à gauche</Label>
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center gap-4">
                        <FormControl>
                          <RadioGroupItem value="2" id="center"/>
                        </FormControl>
                        <FormLabel>
                          <Label htmlFor="center">Centré</Label>
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center gap-4">
                        <FormControl>
                          <RadioGroupItem value="3" id="right"/>
                        </FormControl>
                        <FormLabel>
                          <Label htmlFor="right">Alignement à droite</Label>
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold">Générale</h2>
          <div className="flex flex-col justify-start items-start gap-4">
          <FormField
            control={form.control}
            name="theme"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <Label className="font-bold">Thème</Label>
                </FormLabel>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger className="w-[300px]">
                      <SelectValue
                        placeholder="Choisissez votre thème" 
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">Thème 1</SelectItem>
                    <SelectItem value="2">Thème 2</SelectItem>
                    <SelectItem value="3">Thème 3</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          </div>
          <div className="flex flex-col justify-start items-start gap-4">
            <Label className="font-bold" htmlFor="primaryColor">Couleur principale</Label>
            {/* <Color currentColor="#6624FF"/> */}
          </div>
          <div className="flex flex-col justify-start items-start gap-4">
            <Label className="font-bold" htmlFor="secondaryColor">Couleur secondaire</Label>
            {/* <Color currentColor="#6624FF"/> */}
          </div>
          <div className="flex flex-col justify-start items-start gap-4">
            <FormField
              control={form.control}
              name="titleFont"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <Label className="font-bold">Police des titres</Label>
                  </FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[300px]">
                        <SelectValue placeholder="Choisissez la police des titres" />
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
          <div className="flex flex-col justify-start items-start gap-4">
            <FormField
              control={form.control}
              name="textFont"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <Label className="font-bold">Police des textes</Label>
                  </FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[300px]">
                        <SelectValue placeholder="Choisissez la police des textes" />
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
          <div className="flex flex-col justify-start items-start gap-4">
            <FormField
              control={form.control}
              name="buttonFont"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <Label className="font-bold">Police des boutons</Label>
                  </FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[300px]">
                        <SelectValue placeholder="Choisissez la police des textes" />
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
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold">Footer</h2>
          <div className="flex flex-col justify-start items-start gap-4">
            <h3 className="text-md font-bold">Agencement du footer</h3>
            <FormField
              control={form.control}
              name="footerLayout"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      className="flex flex-col items-start gap-4"
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormItem className="flex items-center gap-4">
                        <FormControl>
                          <RadioGroupItem value="1" id="one" />
                        </FormControl>
                        <FormLabel>
                          <Label htmlFor="one">Agencement 1</Label>
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center gap-4">
                        <FormControl>
                         <RadioGroupItem value="2" id="two" />
                        </FormControl>
                        <FormLabel>
                          <Label htmlFor="two">Agencement 2</Label>
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center gap-4">
                        <FormControl>
                          <RadioGroupItem value="3" id="three" />
                        </FormControl>
                        <FormLabel>
                          <Label htmlFor="three">Agencement 3</Label>
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex gap-4">
          <Button disabled={!form.formState.isDirty} type="submit">Sauvegarder les changements</Button>
          <Button disabled={!form.formState.isDirty} variant="subtle" onClick={resetSettings}>Annuler</Button>
        </div>
      </form>
    </Form>
  )
}
