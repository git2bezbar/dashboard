'use client';

import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { authenticate } from "@/services/api/auth";
import { AuthUser } from "@/services/types";
import { Button, Input, Label } from "@fork2e/umbrella";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { create } from "zustand";

export interface LoginFormProps { isLogged: boolean }
export interface CookiesCheckerState { cookiesList: any }

export default function LoginForm({ isLogged }: LoginFormProps) {
  const router = useRouter();

  if (isLogged) router.push('/');

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
      router.push("/");
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
              <FormLabel htmlFor="email">
                <Label className="font-bold">Identifiant</Label>
              </FormLabel>
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
              <FormLabel htmlFor="password">
                <Label className="font-bold">Mot de passe</Label>
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
