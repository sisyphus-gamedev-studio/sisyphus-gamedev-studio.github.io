import { useCallback, type FC, memo } from "react";
import { ExternalLink } from "lucide-react";
import type { Project, TranslationStructure } from "../../../types";
import { handleImageError } from "../../../utils/images";
import { IMAGE_FALLBACK } from "../../../config";
import {
  PROJECTS_EXPAND_MS,
  COLORS,
  LAYOUT,
  SPACING,
  TAG_STYLE,
  EASING,
  IMAGE_FILTERS,
  GRADIENTS,
} from "../../../config";
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
    <div
      aria-labelledby="projects-heading"
      style={{ background: COLORS.surface.s2, padding: SPACING.sectionPadding }}
    >
      <div
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          overflow: "hidden",
          clip: "rect(0,0,0,0)",
          whiteSpace: "nowrap",
        }}
      >
        {shown.title} — {shown.price}
      </div>

      <div
        style={{ maxWidth: LAYOUT.maxWidth, margin: "0 auto", padding: `0 ${LAYOUT.padding}px` }}
      >
        <div className="reveal" suppressHydrationWarning style={{ marginBottom: 48 }}>
          <div className="section-eyebrow">
            <div className="section-eyebrow-line" />
            <span className="section-eyebrow-label">{t.sectionLabel}</span>
          </div>
          <h2 id="projects-heading" className="t-display-md" style={{ color: COLORS.text.primary }}>
            {t.heading}
          </h2>
        </div>

        <div style={{ display: "flex", gap: 48, alignItems: "stretch" }}>
          <div
            className="reveal-left"
            suppressHydrationWarning
            style={{ width: 380, flexShrink: 0 }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
                opacity: textVisible ? 1 : 0,
                transform: textVisible ? "translateY(0)" : "translateY(6px)",
                transition: textVisible
                  ? `opacity 260ms ${EASING.decelerate}, transform 260ms ${EASING.decelerate}`
                  : `opacity 160ms ${EASING.accelerate}, transform 160ms ${EASING.accelerate}`,
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 20,
                  }}
                >
                  <span className="t-eyebrow-accent">
                    {String(activeIndex + 1).padStart(2, "0")} /{" "}
                    {String(projects.length).padStart(2, "0")}
                  </span>
                  <div className="md-badge-primary md-badge">{shown.price}</div>
                </div>

                <h3
                  className="t-card-title"
                  style={{
                    fontSize: "clamp(32px,3.8vw,52px)",
                    lineHeight: 1.05,
                    marginBottom: 16,
                    color: COLORS.text.primary,
                    transition: `opacity 280ms ${EASING.standard}`,
                  }}
                >
                  {shown.title}
                </h3>

                {shown.tags && shown.tags.length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
                    {shown.tags.map((tag) => {
                      const Icon = getTagIcon(tag);
                      return (
                        <span
                          key={tag}
                          style={{
                            ...TAG_STYLE.base,
                            ...TAG_STYLE.desktop,
                            color: COLORS.text.secondary,
                          }}
                        >
                          <Icon size={10} color={COLORS.orange} />
                          {tag}
                        </span>
                      );
                    })}
                  </div>
                )}

                <div style={{ height: 1, background: COLORS.border.strong, marginBottom: 20 }} />

                <p
                  className="t-body-md"
                  style={{ color: COLORS.text.secondary, lineHeight: 1.72, marginBottom: 28 }}
                >
                  {shown.description}
                </p>

                {shown.progress !== undefined && (
                  <div style={{ marginBottom: 28 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 8,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          color: COLORS.text.tertiary,
                        }}
                      >
                        {t.progressLabel}
                      </span>
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: 700,
                          color: COLORS.orange,
                          fontVariantNumeric: "tabular-nums",
                        }}
                      >
                        {shown.progress}%
                      </span>
                    </div>
                    <div
                      style={{
                        height: 4,
                        borderRadius: 2,
                        background: "rgba(255,255,255,.07)",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${shown.progress}%`,
                          borderRadius: 2,
                          background: `linear-gradient(90deg, ${COLORS.orange}, ${COLORS.orangeLight})`,
                          transition: `width 600ms ${EASING.standard}`,
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <a
                href={shown.wishlistUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-filled"
                style={{
                  alignSelf: "flex-start",
                  height: 44,
                  fontSize: 13,
                  gap: 8,
                  paddingLeft: 24,
                  paddingRight: 24,
                }}
              >
                <ExternalLink size={14} />
                {t.wishlist}
              </a>
            </div>
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
              flex: 1,
              display: "flex",
              gap: 2,
              height: 520,
              borderRadius: 20,
              overflow: "hidden",
              border: `1px solid ${COLORS.border.default}`,
              outline: "none",
              background: COLORS.surface.s1,
            }}
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
                  onClick={() => !isActive && onSelect(i)}
                  style={{
                    position: "relative",
                    flexGrow: isActive ? 1 : 0,
                    flexShrink: 0,
                    flexBasis: "56px",
                    cursor: isActive ? "default" : "pointer",
                    overflow: "hidden",
                    willChange: isActive || isDisplayed ? "flex-grow" : "auto",
                    transition: `flex-grow ${PROJECTS_EXPAND_MS}ms ${EASING.standard}`,
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
                      filter: isActive
                        ? IMAGE_FILTERS.activeProject
                        : IMAGE_FILTERS.inactiveProject,
                      transition: `filter ${PROJECTS_EXPAND_MS}ms ${EASING.standard}`,
                    }}
                    onError={(e) =>
                      handleImageError(
                        e,
                        IMAGE_FALLBACK.projectCard.width,
                        IMAGE_FALLBACK.projectCard.height,
                      )
                    }
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: GRADIENTS.cardOverlay,
                      opacity: isActive ? 1 : 0.5,
                      transition: `opacity ${PROJECTS_EXPAND_MS}ms ${EASING.standard}`,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "rgba(0,0,0,.60)",
                      opacity: isActive ? 0 : 1,
                      transition: `opacity ${PROJECTS_EXPAND_MS}ms ${EASING.standard}`,
                      pointerEvents: "none",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: GRADIENTS.orangeTint,
                      opacity: isActive ? 1 : 0,
                      transition: `opacity ${PROJECTS_EXPAND_MS}ms ${EASING.standard}`,
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
                        ? `opacity 180ms ${EASING.standard}`
                        : `opacity 260ms ${EASING.standard} ${PROJECTS_EXPAND_MS * 0.5}ms`,
                      pointerEvents: "none",
                    }}
                  >
                    <div
                      style={{
                        transform: "rotate(-90deg)",
                        whiteSpace: "nowrap",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <span
                        className="t-eyebrow-accent"
                        style={{ textShadow: "0 1px 6px rgba(0,0,0,.8)" }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className="t-eyebrow-accent"
                        style={{
                          color: "#e8e4e0",
                          textShadow: "0 1px 8px rgba(0,0,0,.9), 0 0 20px rgba(0,0,0,.6)",
                        }}
                      >
                        {project.title}
                      </span>
                    </div>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: "20px 28px",
                      opacity: isActive && isDisplayed ? 1 : 0,
                      transform: isActive && isDisplayed ? "translateY(0)" : "translateY(10px)",
                      transition:
                        isActive && isDisplayed
                          ? `opacity 320ms ${EASING.standard}, transform 320ms ${EASING.standard}`
                          : `opacity 150ms ${EASING.accelerate}`,
                      pointerEvents: "none",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: COLORS.orange,
                        opacity: 0.8,
                      }}
                    >
                      {project.title}
                    </span>
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
                      transition: `opacity ${PROJECTS_EXPAND_MS}ms ${EASING.standard}`,
                      pointerEvents: "none",
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(DesktopCarousel);
