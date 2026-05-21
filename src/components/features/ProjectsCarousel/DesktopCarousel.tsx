import { useCallback, type FC, memo } from "react";
import { ExternalLink } from "lucide-react";
import type { Project, TranslationStructure } from "../../../types";
import { handleImageError } from "../../../utils/images";
import { IMAGE_FALLBACK, PROJECTS_EXPAND_MS } from "../../../config";
import { getTagIcon } from "./tagIcons";

interface DesktopCarouselProps {
  projects: Project[];
  activeIndex: number;
  displayedIndex: number;
  textVisible: boolean;
  onSelect: (i: number) => void;
  t: TranslationStructure["projects"];
}

const DesktopCarousel: FC<DesktopCarouselProps> = ({
  projects,
  activeIndex,
  displayedIndex,
  textVisible,
  onSelect,
  t,
}) => {
  const shown = projects[displayedIndex];

  const handleContainerKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        onSelect((activeIndex + 1) % projects.length);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        onSelect((activeIndex - 1 + projects.length) % projects.length);
      } else if (e.key === "Home") {
        e.preventDefault();
        onSelect(0);
      } else if (e.key === "End") {
        e.preventDefault();
        onSelect(projects.length - 1);
      }
    },
    [activeIndex, projects.length, onSelect],
  );

  return (
    <div className="site-section__container" aria-labelledby="projects-heading">
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {shown.title} — {shown.price}
      </div>

      <div className="site-section__head reveal" suppressHydrationWarning>
        <div className="section-eyebrow">
          <div className="section-eyebrow-line" />
          <span className="section-eyebrow-label">{t.sectionLabel}</span>
        </div>
        <h2 id="projects-heading" className="t-display-md section-heading">
          {t.heading}
          <span className="section-heading__accent"> {t.headingSuffix}</span>
        </h2>
      </div>

      <div className="projects-layout">
        <div className="projects-sidebar reveal-left" suppressHydrationWarning>
          <div className={`projects-sidebar-inner${textVisible ? "" : " is-leaving"}`}>
            <div>
              <div className="projects-sidebar-head">
                <span className="t-eyebrow-accent">
                  {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(projects.length).padStart(2, "0")}
                </span>
                <div className="md-badge-primary md-badge">{shown.price}</div>
              </div>

              <h3 className="t-card-title projects-sidebar-title">{shown.title}</h3>

              {shown.tags && shown.tags.length > 0 && (
                <div className="projects-tags">
                  {shown.tags.map((tag) => {
                    const Icon = getTagIcon(tag);
                    return (
                      <span key={tag} className="md-badge md-badge--tag projects-tag">
                        <Icon size={10} aria-hidden="true" />
                        {tag}
                      </span>
                    );
                  })}
                </div>
              )}

              <div className="projects-divider" />

              <p className="t-body-md projects-desc">{shown.description}</p>

              {shown.progress !== undefined && (
                <div className="projects-progress">
                  <div className="projects-progress-head">
                    <span className="projects-progress-label">{t.progressLabel}</span>
                    <span className="projects-progress-value">{shown.progress}%</span>
                  </div>
                  <div className="md-progress-track md-progress-track--lg projects-progress-track">
                    <div
                      className="projects-progress-bar"
                      style={{ width: `${shown.progress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            <a
              href={shown.wishlistUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-filled projects-cta"
            >
              <ExternalLink size={14} aria-hidden="true" />
              {t.learnMore}
            </a>
          </div>
        </div>

        <div
          role="listbox"
          className="projects-carousel reveal-scale"
          suppressHydrationWarning
          aria-label={t.heading}
          aria-activedescendant={`project-panel-${activeIndex}`}
          tabIndex={0}
          onKeyDown={handleContainerKeyDown}
          style={{ "--projects-expand-ms": `${PROJECTS_EXPAND_MS}ms` } as React.CSSProperties}
        >
          {projects.map((project, i) => {
            const isActive = i === activeIndex;
            const isDisplayed = i === displayedIndex;

            return (
              <div
                key={project.id}
                id={`project-panel-${i}`}
                role="option"
                aria-selected={isActive}
                aria-label={project.title}
                tabIndex={-1}
                className={`projects-carousel__panel${isActive ? " is-active" : ""}`}
                onClick={() => !isActive && onSelect(i)}
                style={isActive || isDisplayed ? { willChange: "flex-grow" } : undefined}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  width={900}
                  height={520}
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                  className="projects-carousel__img"
                  onError={(e) =>
                    handleImageError(
                      e,
                      IMAGE_FALLBACK.projectCard.width,
                      IMAGE_FALLBACK.projectCard.height,
                    )
                  }
                />
                <div className="projects-carousel__overlay" aria-hidden="true" />
                <div className="projects-carousel__inactive-mask" aria-hidden="true" />
                <div className="projects-carousel__tint" aria-hidden="true" />
                <div className="projects-carousel__collapsed-label" aria-hidden="true">
                  <div className="projects-carousel__collapsed-inner">
                    <span className="t-eyebrow-accent projects-carousel__collapsed-index">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="t-eyebrow-accent projects-carousel__collapsed-title">
                      {project.title}
                    </span>
                  </div>
                </div>
                <div
                  className={`projects-carousel__footer${isActive && isDisplayed ? " is-visible" : ""}`}
                  aria-hidden="true"
                >
                  <span className="projects-carousel__footer-title">{project.title}</span>
                </div>
                <div className="projects-carousel__accent-line" aria-hidden="true" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default memo(DesktopCarousel);
