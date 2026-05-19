import {
  Users,
  Crosshair,
  Swords,
  Shuffle,
  TreePine,
  Globe,
  BookOpen,
  Zap,
  Target,
  Shield,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

type IconComponent = LucideIcon;

const TAG_ICONS: Record<string, IconComponent> = {
  "co-op": Users,
  кооп: Users,
  shooter: Crosshair,
  шутер: Crosshair,
  deathmatch: Swords,
  "бой на смерть": Swords,
  roguelite: Shuffle,
  рогалик: Shuffle,
  survival: TreePine,
  выживание: TreePine,
  "open world": Globe,
  "открытый мир": Globe,
  "slavic mythology": BookOpen,
  "слав. мифология": BookOpen,
  fps: Target,
  rpg: Shield,
  "infinite progression": TrendingUp,
  "бесконечная прогрессия": TrendingUp,
};

export function getTagIcon(tag: string): IconComponent {
  return TAG_ICONS[tag.toLowerCase()] ?? Zap;
}
