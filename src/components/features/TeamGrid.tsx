import { useCallback, useId, useMemo, useState, type FC } from "react";
import { ChevronDown } from "lucide-react";
import type { Language, TranslationStructure } from "../../types";
import TeamProjectLinks from "./TeamProjectLinks";
import { TEAM_MEMBERS } from "../../config/team";
import type { TeamMember, TeamMemberAccent } from "../../config/team";
import { resolveTeamSideProjects } from "../../utils/teamSideProject";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import "../../styles/team-grid.css";

interface TeamGridProps {
  lang: Language;
  t: TranslationStructure["team"];
  partnerCategoryLabels: TranslationStructure["partners"]["categoryLabels"];
  partnerLinkLabels: TranslationStructure["partners"]["linkLabels"];
}

interface TeamCardProps {
  member: TeamMember;
  lang: Language;
  t: TeamGridProps["t"];
  partnerCategoryLabels: TeamGridProps["partnerCategoryLabels"];
  partnerLinkLabels: TeamGridProps["partnerLinkLabels"];
}

const avatarClass = (accent: TeamMemberAccent, hasImage: boolean, placeholder?: boolean) => {
  const base = hasImage ? "team-card-avatar" : `team-card-avatar team-card-avatar--${accent}`;
  return placeholder ? `${base} team-card-avatar--placeholder` : base;
};

const parseRoleParts = (role: string) =>
  role
    .split(".")
    .map((part) => part.trim())
    .filter(Boolean);

const TeamCard: FC<TeamCardProps> = ({
  member,
  lang,
  t,
  partnerCategoryLabels,
  partnerLinkLabels,
}) => {
  const [expanded, setExpanded] = useState(false);
  const reducedMotion = useReducedMotion();
  const panelId = useId();
  const local = member[lang];
  const roleParts = parseRoleParts(local.role);
  const leadRole = roleParts[0];
  const otherRoles = roleParts.slice(1);
  const hasQuote = Boolean(local.quote?.trim());

  const sideProjects = useMemo(
    () =>
      member.sideProjects?.length
        ? resolveTeamSideProjects(member.sideProjects, lang, {
            categoryLabels: partnerCategoryLabels,
            placeholder: t.placeholderProject,
          })
        : [],
    [member.sideProjects, lang, partnerCategoryLabels, t.placeholderProject],
  );

  const hasSideProjects = sideProjects.length > 0;

  const toggleExpanded = useCallback(() => {
    setExpanded((prev) => !prev);
  }, []);

  return (
    <article className="team-card state">
      <div className="team-card-main">
        <header className="team-card-editorial">
          <div className="team-card-identity">
            <h3 className="team-card-name t-card-title">{local.name}</h3>
            {leadRole && <span className="team-card-role-lead">{leadRole}</span>}
            {otherRoles.length > 0 && (
              <p className="team-card-roles-secondary t-body-sm" aria-label={local.role}>
                {otherRoles.join(" · ")}
              </p>
            )}
          </div>
          <div className={`${avatarClass(member.accent, Boolean(member.image))} team-card-avatar--hero`}>
            {member.image ? (
              <img src={member.image} alt="" width={56} height={56} loading="lazy" decoding="async" />
            ) : (
              <span aria-hidden="true">{member.initials}</span>
            )}
          </div>
        </header>

        {hasQuote && (
          <figure className="team-card-quote">
            <span className="sr-only">{t.quoteLabel}</span>
            <blockquote className="team-card-quote-text">«{local.quote}»</blockquote>
          </figure>
        )}
      </div>

      {hasSideProjects && (
        <div className="team-card-expand">
          <button
            type="button"
            className="team-card-expand-btn"
            aria-expanded={expanded}
            aria-controls={panelId}
            onClick={toggleExpanded}
          >
            <span className="team-card-expand-label">
              {t.sideProjectsLabel}
              {sideProjects.length > 1 && (
                <span className="team-card-expand-count" aria-hidden="true">
                  {sideProjects.length}
                </span>
              )}
            </span>
            <span className="team-card-expand-action">
              {expanded ? t.collapseSideProject : t.expandSideProject}
              <ChevronDown
                size={14}
                aria-hidden="true"
                className={expanded ? "team-card-chevron is-open" : "team-card-chevron"}
              />
            </span>
          </button>

          <div
            id={panelId}
            className={`team-card-expand-panel${expanded ? " is-open" : ""}${reducedMotion ? " team-card-expand-panel--reduced" : ""}`}
            aria-hidden={!expanded}
            {...(reducedMotion && !expanded ? { hidden: true } : {})}
          >
            <div className="team-card-expand-inner">
              <ul className="team-card-projects" role="list">
                {sideProjects.map((project, index) => (
                  <li
                    key={project.id}
                    className={`team-card-side${project.isPlaceholder ? " team-card-side--placeholder" : ""}`}
                    role="listitem"
                  >
                    <div className="team-card-side-head">
                      <div
                        className={avatarClass(
                          project.logoAccent,
                          Boolean(project.logoImage),
                          project.isPlaceholder,
                        )}
                      >
                        {project.logoImage ? (
                          <img
                            src={project.logoImage}
                            alt=""
                            width={44}
                            height={44}
                            loading="lazy"
                            decoding="async"
                          />
                        ) : (
                          <span aria-hidden="true">{project.logoInitials}</span>
                        )}
                      </div>
                      <div className="team-card-side-meta">
                        <p className="team-card-side-name">{project.name}</p>
                        {project.categoryLabel && (
                          <span
                            className={`team-card-side-badge${project.isPlaceholder ? " team-card-side-badge--muted" : ""}`}
                          >
                            {project.categoryLabel}
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="team-card-side-desc">{project.description}</p>
                    {!project.isPlaceholder && (
                      <TeamProjectLinks
                        links={project.links}
                        projectName={project.name}
                        labels={partnerLinkLabels}
                      />
                    )}
                    {index < sideProjects.length - 1 && (
                      <hr className="team-card-side-divider" aria-hidden="true" />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </article>
  );
};

const TeamGrid: FC<TeamGridProps> = ({ lang, t, partnerCategoryLabels, partnerLinkLabels }) => (
  <div className="team-grid" role="list" aria-label={t.sectionLabel}>
    {TEAM_MEMBERS.map((member) => (
      <div key={member.id} role="listitem">
        <TeamCard
          member={member}
          lang={lang}
          t={t}
          partnerCategoryLabels={partnerCategoryLabels}
          partnerLinkLabels={partnerLinkLabels}
        />
      </div>
    ))}
  </div>
);

export default TeamGrid;
