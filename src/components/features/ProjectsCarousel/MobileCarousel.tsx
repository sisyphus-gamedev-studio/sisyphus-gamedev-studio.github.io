import { useCallback, useRef, type FC, memo } from "react";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import type { Project, TranslationStructure } from "../../../types";
import { handleImageError } from "../../../utils/images";
import { COLORS, LAYOUT, SPACING, SWIPE_THRESHOLD, TAG_STYLE } from "../../../config";
import { getTagIcon } from "./tagIcons";

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
      dx < 0 ? next() : prev();
    },
    [next, prev],
  );

  const onTouchCancel = useCallback(() => {
    touchStartX.current = null;
  }, []);

  return (
    <div aria-labelledby="projects-heading" style={{ background: COLORS.surface.s2, padding: SPACING.sectionPaddingMobile }}>
      <div
        aria-live="polite"
        aria-atomic="true"
        style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap" }}
      >
        {p.title} — {p.price}
      </div>

      <div style={{ maxWidth: LAYOUT.maxWidth, margin: "0 auto", padding: `0 ${LAYOUT.padding}px` }}>
        <div className="reveal" suppressHydrationWarning style={{ marginBottom: 32 }}>
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
          className="reveal-scale"
          suppressHydrationWarning
          style={{ borderRadius: 16, overflow: "hidden", border: `1px solid ${COLORS.border.default}`, position: "relative" }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onTouchCancel={onTouchCancel}
        >
          <div style={{ position: "relative", height: 220 }}>
            <img
              src={p.image}
              alt={p.title}
              width={900}
              height={220}
              loading="lazy"
              decoding="async"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "brightness(.4) saturate(.4)" }}
              onError={(e) => handleImageError(e, 900, 600)}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,transparent 30%,rgba(17,17,17,.98) 100%)" }} />
            <div style={{ position: "absolute", top: 14, right: 14 }}>
              <div className="md-badge-primary md-badge">{p.price}</div>
            </div>
          </div>

          <div style={{ padding: "20px 24px 28px", background: COLORS.surface.s3 }}>
            <span className="t-eyebrow-accent" style={{ display: "block", marginBottom: 8 }}>
              {String(activeIndex + 1).padStart(2, "0")} — {t.sectionLabel}
            </span>
            <h3 className="t-card-title" style={{ fontSize: 32, marginBottom: 10 }}>
              {p.title}
            </h3>
            {p.tags && p.tags.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 12 }}>
                {p.tags.map((tag) => {
                  const Icon = getTagIcon(tag);
                  return (
                    <span key={tag} style={{ ...TAG_STYLE.base, ...TAG_STYLE.mobile, color: COLORS.text.secondary }}>
                      <Icon size={9} color={COLORS.orange} />
                      {tag}
                    </span>
                  );
                })}
              </div>
            )}
            <div style={{ height: 1, background: COLORS.border.strong, marginBottom: 12 }} />
            <p className="t-body-md" style={{ color: COLORS.text.secondary, lineHeight: 1.7, marginBottom: 20 }}>
              {p.description}
            </p>
            <div className="flex-between">
              <div className="flex-row gap-4">
                <button onClick={prev} className="icon-btn-outlined" style={{ width: 40, height: 40 }} aria-label={t.prevGame}>
                  <ChevronLeft size={18} />
                </button>
                <button onClick={next} className="icon-btn-outlined" style={{ width: 40, height: 40 }} aria-label={t.nextGame}>
                  <ChevronRight size={18} />
                </button>
              </div>
              <a
                href={p.wishlistUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-filled"
                style={{ height: 40, fontSize: 13, gap: 7, paddingLeft: 20, paddingRight: 20 }}
              >
                <ExternalLink size={14} />
                {t.wishlist}
              </a>
            </div>
          </div>
        </div>

        <div className="flex-center gap-6" style={{ marginTop: 16 }} role="tablist" aria-label={t.heading}>
          {projects.map((proj, i) => (
            <button
              key={i}
              onClick={() => onSelect(i)}
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={proj.title}
              style={{
                width: i === activeIndex ? 20 : 6,
                height: 6,
                borderRadius: 3,
                border: "none",
                background: i === activeIndex ? COLORS.orange : "rgba(255,255,255,.2)",
                cursor: "pointer",
                transition: "width .3s, background .3s",
                padding: 0,
              }}
            />
          ))}
        </div>
        <p
          aria-hidden="true"
          style={{ textAlign: "center", color: COLORS.text.muted, fontSize: 11, marginTop: 8, letterSpacing: 0.5 }}
        >
          ← {t.swipeHint} →
        </p>
      </div>
    </div>
  );
};

export default memo(MobileCarousel);
