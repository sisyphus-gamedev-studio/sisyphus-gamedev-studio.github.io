import { useCallback, useRef, type FC, memo } from "react";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import type { Project, TranslationStructure } from "../../../types";
import { handleImageError } from "../../../utils/images";
import { IMAGE_FALLBACK, SWIPE_THRESHOLD } from "../../../config";
import { getTagIcon } from "./tagIcons";
import ProjectMedia from "../../common/ProjectMedia";

interface MobileCarouselProps {
  projects: Project[];
  activeIndex: number;
  onSelect: (i: number) => void;
  t: TranslationStructure["projects"];
}

const MobileCarousel: FC<MobileCarouselProps> = ({ projects, activeIndex, onSelect, t }) => {
  const p = projects[activeIndex];
  const touchStartX = useRef<number | null>(null);

  const prev = useCallback(
    () => onSelect((activeIndex - 1 + projects.length) % projects.length),
    [activeIndex, projects.length, onSelect],
  );

  const next = useCallback(
    () => onSelect((activeIndex + 1) % projects.length),
    [activeIndex, projects.length, onSelect],
  );

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStartX.current === null) return;
      const dx = e.changedTouches[0].clientX - touchStartX.current;
      touchStartX.current = null;
      if (Math.abs(dx) < SWIPE_THRESHOLD) return;
      if (dx < 0) {
        next();
      } else {
        prev();
      }
    },
    [next, prev],
  );

  const onTouchCancel = useCallback(() => {
    touchStartX.current = null;
  }, []);

  return (
    <div className="site-section__container" aria-labelledby="projects-heading">
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {p.title} — {p.price}
      </div>

      <div className="site-section__head reveal" suppressHydrationWarning>
        <div className="section-eyebrow">
          <div className="section-eyebrow-line" />
          <span className="section-eyebrow-label">
            {String(activeIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </span>
        </div>
        <h2 id="projects-heading" className="t-display-md section-heading">
          {t.heading}
          <span className="section-heading__accent"> {t.headingSuffix}</span>
        </h2>
      </div>

      <div
        className="reveal-scale card card--flush card--interactive state projects-mobile"
        suppressHydrationWarning
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchCancel}
      >
        <div className="projects-mobile__media project-media-frame">
          <ProjectMedia
            video={p.video}
            poster={p.image}
            alt={p.title}
            isActive
            onImageError={(e) =>
              handleImageError(
                e,
                IMAGE_FALLBACK.projectCard.width,
                IMAGE_FALLBACK.projectCard.height,
              )
            }
          />
          <div className="projects-mobile__overlay" aria-hidden="true" />
          <div className="projects-mobile__price">
            <div className="md-badge-primary md-badge">{p.price}</div>
          </div>
        </div>

        <div className="projects-mobile__body">
          <span className="t-eyebrow-accent projects-mobile__eyebrow">
            {String(activeIndex + 1).padStart(2, "0")} — {t.sectionLabel}
          </span>
          <h3 className="t-card-title projects-mobile__title">{p.title}</h3>
          {p.tags && p.tags.length > 0 && (
            <div className="projects-tags projects-tags--mobile">
              {p.tags.map((tag) => {
                const Icon = getTagIcon(tag);
                return (
                  <span key={tag} className="md-badge md-badge--tag projects-tag">
                    <Icon size={9} aria-hidden="true" />
                    {tag}
                  </span>
                );
              })}
            </div>
          )}
          <div className="projects-divider projects-divider--mobile" />
          <p className="t-body-md projects-desc projects-desc--mobile">{p.description}</p>
          <div className="projects-mobile__nav">
            <div className="projects-mobile__nav-buttons">
              <button
                type="button"
                onClick={prev}
                className="icon-btn-outlined projects-mobile__nav-btn"
                aria-label={t.prevGame}
              >
                <ChevronLeft size={18} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={next}
                className="icon-btn-outlined projects-mobile__nav-btn"
                aria-label={t.nextGame}
              >
                <ChevronRight size={18} aria-hidden="true" />
              </button>
            </div>
            <a
              href={p.wishlistUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-filled projects-cta projects-cta--mobile"
            >
              <ExternalLink size={14} aria-hidden="true" />
              {t.learnMore}
            </a>
          </div>
        </div>
      </div>

      <div className="flex-center gap-6 projects-mobile-dots" role="tablist" aria-label={t.heading}>
        {projects.map((proj, i) => (
          <button
            key={proj.id}
            type="button"
            onClick={() => onSelect(i)}
            role="tab"
            aria-selected={i === activeIndex}
            aria-label={proj.title}
            className={`projects-mobile-dot${i === activeIndex ? " is-active" : ""}`}
          />
        ))}
      </div>
      <p className="projects-mobile-hint" aria-hidden="true">
        ← {t.swipeHint} →
      </p>
    </div>
  );
};

export default memo(MobileCarousel);
