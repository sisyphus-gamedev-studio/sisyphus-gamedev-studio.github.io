import { useCallback, useId, useMemo, useState, type FC } from "react";
import { ChevronDown } from "lucide-react";
import type { Language, TranslationStructure } from "../../types";
import TeamProjectLinks from "./TeamProjectLinks";
import { TEAM_MEMBERS } from "../../config/team";
import type { TeamMember, TeamMemberAccent } from "../../config/team";
import { resolveTeamSideProjects } from "../../utils/teamSideProject";
import { useReducedMotion } from "../../hooks/useReducedMotion";
interface TeamGridProps {
  lang: Language;
  t: TranslationStructure["team"];
  partnerLinkLabels: TranslationStructure["partners"]["linkLabels"];
}

interface TeamCardProps {
  member: TeamMember;
  lang: Language;
  t: TeamGridProps["t"];
  partnerLinkLabels: TeamGridProps["partnerLinkLabels"];
}

const avatarClass = (accent: TeamMemberAccent, hasImage: boolean, size: "lg" | "sm" = "lg") => {
  const parts = [
    "card-entity__media",
    size === "sm" ? "card-entity__media--sm" : "",
    hasImage ? "card-entity__media--image" : `card-entity__media--accent-${accent}`,
  ];
  return parts.filter(Boolean).join(" ");
};

const parseRoleParts = (role: string) =>
  role
    .split(".")
    .map((part) => part.trim())
    .filter(Boolean);

const TeamCard: FC<TeamCardProps> = ({ member, lang, t, partnerLinkLabels }) => {
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
            placeholder: t.placeholderProject,
          })
        : [],
    [member.sideProjects, lang, t.placeholderProject],
  );

  const hasSideProjects = sideProjects.length > 0;

  const toggleExpanded = useCallback(() => {
    setExpanded((prev) => !prev);
  }, []);

  return (
    <article className="team-card card card--interactive state">
      <div className="team-card-main">
        <header className="card-entity__header">
          <div className={avatarClass(member.accent, Boolean(member.image))}>
            {member.image ? (
              <img
                src={member.image}
                alt=""
                width={64}
                height={64}
                loading="lazy"
                decoding="async"
              />
            ) : (
              <span aria-hidden="true">{member.initials}</span>
            )}
          </div>
          <div className="card-entity__body">
            <h3 className="card-entity__title">{local.name}</h3>
            <div className="card-entity__meta" aria-label={local.role}>
              {leadRole && (
                <span className="md-badge-primary md-badge team-card-role-badge">{leadRole}</span>
              )}
              {otherRoles.map((role) => (
                <span key={role} className="md-badge team-card-role-badge">
                  {role}
                </span>
              ))}
            </div>
          </div>
        </header>

        {hasQuote && (
          <blockquote className="team-card-quote">
            <span className="sr-only">{t.quoteLabel}: </span>«{local.quote}»
          </blockquote>
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
            <span className="t-eyebrow-accent">
              {t.sideProjectsLabel}
              {sideProjects.length > 1 && (
                <span className="md-badge-primary md-badge" aria-hidden="true">
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
                {sideProjects.map((project) => (
                  <li
                    key={project.id}
                    className={`team-card-side${project.isPlaceholder ? " team-card-side--placeholder" : ""}`}
                    role="listitem"
                  >
                    <div className="team-card-side__row">
                      <div
                        className={avatarClass(
                          project.logoAccent,
                          Boolean(project.logoImage),
                          "sm",
                        )}
                      >
                        {project.logoImage ? (
                          <img
                            src={project.logoImage}
                            alt=""
                            width={36}
                            height={36}
                            loading="lazy"
                            decoding="async"
                          />
                        ) : (
                          <span aria-hidden="true">{project.logoInitials}</span>
                        )}
                      </div>
                      <div className="team-card-side__body">
                        <div className="team-card-side__title-row">
                          <p className="team-card-side__name">{project.name}</p>
                          {project.categoryLabel && (
                            <span
                              className={`md-badge${project.isPlaceholder ? "" : " md-badge-primary"}`}
                            >
                              {project.categoryLabel}
                            </span>
                          )}
                        </div>
                        {!project.isPlaceholder && (
                          <TeamProjectLinks
                            links={project.links}
                            projectName={project.name}
                            labels={partnerLinkLabels}
                          />
                        )}
                      </div>
                    </div>
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

const TeamGrid: FC<TeamGridProps> = ({ lang, t, partnerLinkLabels }) => (
  <div className="team-grid" role="list" aria-label={t.sectionLabel}>
    {TEAM_MEMBERS.map((member) => (
      <div key={member.id} role="listitem">
        <TeamCard member={member} lang={lang} t={t} partnerLinkLabels={partnerLinkLabels} />
      </div>
    ))}
  </div>
);

export default TeamGrid;
