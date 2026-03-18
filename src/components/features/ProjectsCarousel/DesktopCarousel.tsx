import { useCallback, type FC, memo } from "react";
import { ExternalLink } from "lucide-react";
import type { Project, TranslationStructure } from "../../../types";
import { handleImageError } from "../../../utils/images";
import { PROJECTS_EXPAND_MS, COLORS, LAYOUT, SPACING, TAG_STYLE } from "../../../config";
import { getTagIcon } from "./tagIcons";

interface DesktopCarouselProps {
  projects: Project[];
  activeIndex: number;
  displayedIndex: number;
  onSelect: (i: number) => void;
  t: TranslationStructure["projects"];
}

const DesktopCarousel: FC<DesktopCarouselProps> = ({
  projects,
  activeIndex,
  displayedIndex,
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
    <div aria-labelledby="projects-heading" style={{ background: COLORS.surface.s2, padding: SPACING.sectionPadding }}>
      <div
        aria-live="polite"
        aria-atomic="true"
        style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap" }}
      >
        {shown.title} — {shown.price}
      </div>

      <div style={{ maxWidth: LAYOUT.maxWidth, margin: "0 auto", padding: `0 ${LAYOUT.padding}px` }}>
        <div className="reveal" suppressHydrationWarning style={{ marginBottom: 40 }}>
          <div className="section-eyebrow">
            <div className="section-eyebrow-line" />
            <span className="section-eyebrow-label">
              {String(activeIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </span>
          </div>
          <h2 id="projects-heading" className="t-display-md" style={{ color: COLORS.text.primary }}>
            {t.heading}
          </h2>
        </div>

        <div
          role="listbox"
          className="reveal-scale"
          suppressHydrationWarning
          aria-label={t.heading}
          aria-activedescendant={`project-panel-${activeIndex}`}
          tabIndex={0}
          onKeyDown={handleContainerKeyDown}
          style={{
            display: "flex",
            height: 520,
            borderRadius: 20,
            overflow: "hidden",
            border: `1px solid ${COLORS.border.default}`,
            boxShadow: "0 20px 60px rgba(0,0,0,.6)",
            outline: "none",
          }}
        >
          {projects.map((project, i) => {
            const isActive = i === activeIndex;
            const isDisplayed = i === displayedIndex;
            const isAnimating = isActive || isDisplayed;
            const easing = `cubic-bezier(0.4,0,0.2,1)`;

            return (
              <div
                key={project.id}
                id={`project-panel-${i}`}
                role="option"
                aria-selected={isActive}
                aria-label={project.title}
                tabIndex={-1}
                onClick={() => !isActive && onSelect(i)}
                style={{
                  position: "relative",
                  flexGrow: isActive ? 1 : 0,
                  flexShrink: 0,
                  flexBasis: "56px",
                  cursor: isActive ? "default" : "pointer",
                  overflow: "hidden",
                  willChange: isAnimating ? "flex-grow" : "auto",
                  transition: `flex-grow ${PROJECTS_EXPAND_MS}ms ${easing}`,
                  background: COLORS.surface.s4,
                }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  width={900}
                  height={520}
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    filter: isActive ? "brightness(.45) saturate(.55)" : "brightness(.2) saturate(.25)",
                    transition: `filter ${PROJECTS_EXPAND_MS}ms ${easing}`,
                  }}
                  onError={(e) => handleImageError(e, 900, 600)}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(180deg,transparent 20%,rgba(17,17,17,.97) 100%)",
                    opacity: isActive ? 1 : 0.6,
                    transition: `opacity ${PROJECTS_EXPAND_MS}ms ${easing}`,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(135deg,rgba(248,126,15,.05) 0%,transparent 55%)",
                    opacity: isActive ? 1 : 0,
                    transition: `opacity ${PROJECTS_EXPAND_MS}ms ${easing}`,
                    pointerEvents: "none",
                  }}
                />

                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: isActive ? 0 : 1,
                    transition: isActive
                      ? `opacity 180ms ${easing}`
                      : `opacity 260ms ${easing} ${PROJECTS_EXPAND_MS * 0.5}ms`,
                    pointerEvents: "none",
                  }}
                >
                  <div style={{ transform: "rotate(-90deg)", whiteSpace: "nowrap", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                    <span className="t-eyebrow-accent">{String(i + 1).padStart(2, "0")}</span>
                    <span className="t-eyebrow-muted">{project.title}</span>
                  </div>
                </div>

                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: SPACING.cardPadding.project,
                    opacity: isActive && isDisplayed ? 1 : 0,
                    transform: isActive && isDisplayed ? "translateY(0)" : "translateY(14px)",
                    transition: isActive && isDisplayed
                      ? `opacity 320ms ${easing}, transform 320ms ${easing}`
                      : `opacity 150ms cubic-bezier(0.4,0,1,1), transform 150ms cubic-bezier(0.4,0,1,1)`,
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                    <span className="t-eyebrow-accent">
                      {String(displayedIndex + 1).padStart(2, "0")} — {t.sectionLabel}
                    </span>
                    <div className="md-badge-primary md-badge">{shown.price}</div>
                  </div>

                  <h3 className="t-card-title" style={{ fontSize: "clamp(28px,3.5vw,44px)", marginBottom: 12 }}>
                    {shown.title}
                  </h3>

                  {shown.tags && shown.tags.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
                      {shown.tags.map((tag) => {
                        const Icon = getTagIcon(tag);
                        return (
                          <span key={tag} style={{ ...TAG_STYLE.base, ...TAG_STYLE.desktop, color: COLORS.text.secondary }}>
                            <Icon size={10} color={COLORS.orange} />
                            {tag}
                          </span>
                        );
                      })}
                    </div>
                  )}

                  <div style={{ height: 1, background: COLORS.border.strong, marginBottom: 14 }} />

                  <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 32 }}>
                    <p className="t-body-md" style={{ color: COLORS.text.secondary, lineHeight: 1.68, maxWidth: 620, flex: 1, minWidth: 180 }}>
                      {shown.description}
                    </p>
                    <a
                      href={shown.wishlistUrl || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-filled"
                      style={{ flexShrink: 0, height: 40, fontSize: 13, gap: 7, paddingLeft: 22, paddingRight: 22 }}
                    >
                      <ExternalLink size={14} />
                      {t.wishlist}
                    </a>
                  </div>
                </div>

                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: COLORS.orangeBorder,
                    opacity: isActive ? 0 : 1,
                    transition: `opacity ${PROJECTS_EXPAND_MS}ms ${easing}`,
                    pointerEvents: "none",
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default memo(DesktopCarousel);
