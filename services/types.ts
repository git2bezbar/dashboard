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
