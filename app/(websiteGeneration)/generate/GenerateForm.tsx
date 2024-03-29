'use client';

import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { generateWebsite } from "@/services/api/website";
import Title from "@/src/components/Title";
import { Button, Input, Label } from "@fork2e/umbrella";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function GenerateForm() {
  const router = useRouter();

  const FormSchema = z.object({
    websiteTitle: z.string().min(1),
    email: z.string().min(1),
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      websiteTitle: "",
      email: "",
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const { uuid } = await generateWebsite(data.websiteTitle, data.email);
      toast({
        title: "Site généré ✨"
      })
      router.push(`/${uuid}`);
      router
    } catch (error) {
      toast({
        title: "Oups, le site n'a pas pu être généré 😢",
        variant: "destructive"
      })
    }
  }
  
  return (  
    <Form {...form}>
      <form
        className="col-span-5 flex flex-col gap-8 max-w-md"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Title>Créons votre site web</Title>
        <FormField
          control={form.control}
          name="websiteTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="websiteTitle">
                <Label className="font-bold">Nom de votre établissement</Label>
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email">
                <Label className="font-bold">Adresse email</Label>
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="self-start">Créer le site web</Button>
      </form>
    </Form>
  )
}
