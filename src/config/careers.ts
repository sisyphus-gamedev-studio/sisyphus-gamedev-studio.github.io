export interface CareerStackItem {
  id: string;
  en: { label: string; value: string };
  ru: { label: string; value: string };
}

export const CAREER_STACK: CareerStackItem[] = [
  {
    id: "engine",
    en: { label: "Engine", value: "Unreal Engine 5 (C++)" },
    ru: { label: "Движок", value: "Unreal Engine 5 (C++)" },
  },
  {
    id: "tracker",
    en: { label: "Task tracker", value: "Trello" },
    ru: { label: "Таск-трекер", value: "Trello" },
  },
];
