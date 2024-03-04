import { UniqueIdentifier } from "@dnd-kit/core";

export type UUID = string;

export interface CustomizationSettings {
  headerLayout: string;
  theme: string;
  primaryColor: string;
  secondaryColor: string;
  titleFont: string;
  textFont: string;
  buttonFont: string;
  footerLayout: string;
}

export type PageType = "home" | "about" | "menu" | "contact" | "legal";

export interface Page {
  id: number;
  type: PageType;
  order: number;
  description: string;
  isActive: string;
  uuid: UUID;
  websiteId: number;
  createdAt: string;
  updatedAt: string;
}

export interface MenuPage {
  id: UniqueIdentifier;
  type: PageType;
  order: number;
  isActive: boolean;
  uuid: UUID;
}
export interface SocialLink {
  platform: string;
  url: string;
  is_active: boolean | number;
}

export interface ContactSettings {
  email: string;
  phoneNumber: string;
  socialLinks: SocialLink[];
}
