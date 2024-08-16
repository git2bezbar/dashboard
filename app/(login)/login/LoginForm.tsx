'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/src/ui/form";
import { toast } from "@/src/ui/use-toast";
import { authenticate } from "@/services/api/auth";
import { UUID } from "@/services/types";
import { Button, Input, Label } from "@fork2e/umbrella";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

export interface LoginFormProps {
  isLogged: boolean,
  websiteId: UUID | undefined,
}
export interface CookiesCheckerState { cookiesList: any }

export default function LoginForm({ isLogged, websiteId }: LoginFormProps) {
  const router = useRouter();

  if (isLogged && websiteId) {
    router.push(`/${websiteId}`);
  } else if (isLogged) {
    router.push("/generate");
  }

  const FormSchema = z.object({
    email: z.string(),
    password: z.string(),
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const { email, password } = data;
    try {
      await authenticate(email, password);
      router.push("/websites");
    } catch (error) {
      toast({
        title: "Erreur de connexion",
        description: "Identifiants incorrects",
        variant: "destructive",
      })    
    }
  }

  return (
    <Form {...form}>
      <form
        className="col-span-5 flex flex-col gap-8 max-w-md"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold" htmlFor="email">Identifiant</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold" htmlFor="password">
                Mot de passe
              </FormLabel>
              <FormControl>
                <Input {...field} type="password"/>
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="self-start">Se connecter</Button>
      </form>
    </Form>
    )
}
