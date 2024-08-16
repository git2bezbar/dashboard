import { z } from "zod";

export const textWidget = z.object({
  id: z.number().optional(),
  name: z.literal("Texte"),
  order: z.number(),
  content: z.object({
    title: z.string().min(1, "Le titre doit contenir au moins 1 caractère"),
    subtitle: z.string().min(1, "Le sous-titre doit contenir au moins 1 caractère"),
    hasButton: z.boolean(),
    buttonContent: z.string().optional(),
    buttonLink: z.string().optional(),
  }).refine((data) => {
    if (data.hasButton && !data.buttonContent && !data.buttonLink) {
      return false;
    }
    return true;
  }, {
    message: "Le contenu et le lien du bouton est requis",
    path: ["buttonContent"],
  }),
});

export const menuWidget = z.object({
  id: z.number().optional(),
  name: z.literal("Menu"),
  order: z.number(),
  content: z.object({
    items: z.array(z.object({
      label: z.string(),
      url: z.string(),
    })),
  }),
});


// Empty widgets

export const emptyTextWidget: z.infer<typeof textWidget> = {
  name: "Texte",
  order: 0,
  content: {
    title: "",
    subtitle: "",
    hasButton: true,
    buttonContent: "",
    buttonLink: "legal",
  },
};
