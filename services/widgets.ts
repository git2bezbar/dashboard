import { z } from "zod";

export const textWidget = z.object({
  id: z.number().optional(),
  name: z.literal("Texte"),
  order: z.number(),
  content: z.object({
    title: z.string(),
    subtitle: z.string(),
  }),
});

export const textImageWidget = z.object({
  id: z.number().optional(),
  name: z.literal("Texte + Image"),
  order: z.number(),
  content: z.object({
    title: z.string(),
    subtitle: z.string(),
    image: z.number().or(z.string()),
    imagePosition: z.union([ z.literal("left"), z.literal("right") ]),
    imageAlt: z.string(),
  }),
});

export const bannerWidget = z.object({
  id: z.number().optional(),
  name: z.literal("Bannière"),
  order: z.number(),
  content: z.object({
    title: z.string(),
    hasButton: z.number().min(0).max(1),
    buttonContent: z.string().optional(),
    buttonColor: z.union([ z.literal("primary"), z.literal("secondary") ]).optional(),
    buttonLink: z.string().optional(),
    bannerColor: z.union([ z.literal("primary"), z.literal("secondary") ]),
  }),
});

export const highlightingWidget = z.object({
  id: z.number().optional(),
  name: z.literal("Mise en avant"),
  order: z.number(),
  content: z.object({
    title: z.string(),
    subtitle: z.string(),
    image: z.number().or(z.string()),
    imageAlt: z.string(),
  }),
});

export const imageWidget = z.object({
  id: z.number().optional(),
  name: z.literal("Image"),
  order: z.number(),
  content: z.object({
    title: z.string(),
    image: z.number().or(z.string()),
    imageAlt: z.string(),
  }),
});

// Empty widgets

export const emptyTextWidget: z.infer<typeof textWidget> = {
  name: "Texte",
  order: 0,
  content: {
    title: "",
    subtitle: "",
  },
};

export const emptyTextImageWidget: z.infer<typeof textImageWidget> = {
  name: "Texte + Image",
  order: 0,
  content: {
    title: "",
    subtitle: "",
    image: 0,
    imagePosition: "left",
    imageAlt: "",
  },
};

export const emptyBannerWidget: z.infer<typeof bannerWidget> = {
  name: "Bannière",
  order: 0,
  content: {
    title: "",
    hasButton: 0,
    buttonContent: "",
    buttonColor: "primary",
    buttonLink: "",
    bannerColor: "primary",
  },
};

export const emptyHighlightingWidget: z.infer<typeof highlightingWidget> = {
  name: "Mise en avant",
  order: 0,
  content: {
    title: "",
    subtitle: "",
    image: 0,
    imageAlt: "",
  },
};

export const emptyImageWidget: z.infer<typeof imageWidget> = {
  name: "Image",
  order: 0,
  content: {
    title: "",
    image: 0,
    imageAlt: "",
  },
};
