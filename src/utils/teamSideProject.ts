import type { Language } from "../types";
import { PARTNERS, type PartnerCategory, type PartnerLink } from "../config/partners";
import type { PartnerLogoStyle } from "../config/partners";
import type { TeamMemberAccent, TeamSideProject } from "../config/team";

export interface TeamPlaceholderCopy {
  name: string;
  description: string;
  badge: string;
}

export interface ResolvedTeamSideProject {
  id: string;
  name: string;
  description: string;
  logoImage?: string;
  logoInitials: string;
  logoAccent: TeamMemberAccent | PartnerLogoStyle;
  links: PartnerLink;
  categoryLabel?: string;
  isPlaceholder?: boolean;
}

export function resolveTeamSideProject(
  project: TeamSideProject,
  lang: Language,
  options?: {
    categoryLabels?: Record<PartnerCategory, string>;
    placeholder?: TeamPlaceholderCopy;
  },
): ResolvedTeamSideProject | null {
  if (project.type === "placeholder") {
    const copy = options?.placeholder;
    if (!copy) return null;
    return {
      id: project.id ?? `placeholder-${project.logoInitials ?? "default"}`,
      name: copy.name,
      description: copy.description,
      logoInitials: project.logoInitials ?? "···",
      logoAccent: project.accent ?? "orange",
      links: {},
      categoryLabel: copy.badge,
      isPlaceholder: true,
    };
  }

  if (project.type === "partner") {
    const partner = PARTNERS.find((p) => p.id === project.partnerId);
    if (!partner) return null;
    const local = partner[lang];
    return {
      id: project.partnerId,
      name: local.name,
      description: local.description,
      logoImage: partner.logoImage,
      logoInitials: partner.logoInitials,
      logoAccent: partner.logoStyle,
      links: partner.links,
      categoryLabel: options?.categoryLabels?.[partner.category],
    };
  }

  const local = project[lang];
  const logoAccent: TeamMemberAccent = project.accent ?? "green";
  return {
    id: project.id,
    name: local.name,
    description: local.description,
    logoImage: project.logoImage,
    logoInitials: project.logoInitials,
    logoAccent,
    links: project.links ?? {},
    categoryLabel: local.badge,
  };
}

export function resolveTeamSideProjects(
  projects: TeamSideProject[],
  lang: Language,
  options?: {
    categoryLabels?: Record<PartnerCategory, string>;
    placeholder?: TeamPlaceholderCopy;
  },
): ResolvedTeamSideProject[] {
  return projects
    .map((project) => resolveTeamSideProject(project, lang, options))
    .filter((p): p is ResolvedTeamSideProject => p !== null);
}
