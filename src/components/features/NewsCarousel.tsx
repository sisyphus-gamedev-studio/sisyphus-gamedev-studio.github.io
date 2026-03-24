import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Calendar, ArrowUpRight, PauseCircle } from "lucide-react";
import type { NewsItem, NewsCategory, TranslationStructure } from "../../types";
import { handleImageError } from "../../utils/images";
import {
  NEWS_CAROUSEL,
  NEWS_SUMMARY_PREVIEW_CHARS,
  SWIPE_THRESHOLD,
  COLORS,
  LAYOUT,
  SPACING,
  SIZES,
  GRADIENTS,
  getNewsCategories,
  getCategoryLabel,
  getCategoryColor,
  IMAGE_FALLBACK,
} from "../../config";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useCarouselKeyboard } from "../../hooks/useCarouselKeyboard";
import { ErrorBoundary } from "../common/ErrorBoundary";
import NewsModal from "./NewsModal";
import { NewsSkeletonCard } from "../common/SkeletonCard";

interface NewsCarouselProps {
  news: NewsItem[];
  t: TranslationStructure["news"];
  lang: "en" | "ru";
}

const NewsCarousel = ({ news, t, lang }: NewsCarouselProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const [modalItem, setModalItem] = useState<NewsItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<NewsCategory | "all">("all");
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartX = useRef<number | null>(null);
  const reducedMotion = useReducedMotion();
  const categoriesWithNews = useMemo(
    () => getNewsCategories().filter((cat) => news.some((n) => n.type === cat)),
    [news],
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (activeCategory !== "all" && !news.some((n) => n.type === activeCategory)) {
      setActiveCategory("all");
    }
  }, [news, activeCategory]);

  const filtered = (
    activeCategory === "all" ? news : news.filter((n) => n.type === activeCategory)
  ).slice(0, 4);

  useEffect(() => {
    setCurrent(0);
    setProgressKey((k) => k + 1);
  }, [activeCategory]);

  useEffect(() => {
    if (!isMounted || paused || modalItem || reducedMotion || filtered.length === 0) return;
    const id = setInterval(() => {
      setCurrent((p) => (p + 1) % filtered.length);
      setProgressKey((k) => k + 1);
    }, NEWS_CAROUSEL.AUTO_INTERVAL);
    return () => clearInterval(id);
  }, [filtered.length, paused, modalItem, reducedMotion, isMounted]);

  const goTo = useCallback(
    (i: number) => {
      setPaused(true);
      setCurrent(i);
      setProgressKey((k) => k + 1);
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
      resumeTimer.current = setTimeout(
        () => setPaused(false),
        reducedMotion ? 0 : NEWS_CAROUSEL.RESUME_DELAY,
      );
    },
    [reducedMotion],
  );

  const handleModalClose = useCallback(() => {
    setModalItem(null);
    setProgressKey((k) => k + 1);
    setPaused(false);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
  }, []);

  const { containerRef } = useCarouselKeyboard({
    total: filtered.length,
    current,
    onChange: goTo,
    enabled: isMounted && !modalItem,
  });

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStartX.current === null) return;
      const dx = e.changedTouches[0].clientX - touchStartX.current;
      touchStartX.current = null;
      if (Math.abs(dx) < SWIPE_THRESHOLD) return;
      if (filtered.length === 0) return;
      if (dx < 0) {
        goTo((current + 1) % filtered.length);
      } else {
        goTo((current - 1 + filtered.length) % filtered.length);
      }
    },
    [current, filtered.length, goTo],
  );

  const handleTouchCancel = useCallback(() => {
    touchStartX.current = null;
  }, []);

  useEffect(
    () => () => {
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    },
    [],
  );

  if (!isMounted) {
    return (
      <section
        id="news"
        aria-labelledby="news-heading"
        style={{
          background: COLORS.surface.s2,
          padding: SPACING.sectionPadding,
          borderTop: `1px solid ${COLORS.border.default}`,
        }}
      >
        <div
          style={{ maxWidth: LAYOUT.maxWidth, margin: "0 auto", padding: `0 ${LAYOUT.padding}px` }}
        >
          <div style={{ marginBottom: 40 }}>
            <div className="section-eyebrow">
              <div className="section-eyebrow-line" />
              <span className="section-eyebrow-label">{t.sectionLabel}</span>
            </div>
            <h2 id="news-heading" className="t-display-md" style={{ color: COLORS.text.primary }}>
              {t.heading}
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <NewsSkeletonCard wide />
            </div>
            <div className="flex-col gap-4">
              {[0, 1, 2].map((i) => (
                <NewsSkeletonCard key={i} />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  const item = filtered[current] ?? filtered[0];

  return (
    <ErrorBoundary>
      {modalItem && (
        <NewsModal item={modalItem} onClose={handleModalClose} closeLabel={t.closeArticle} />
      )}

      <section
        id="news"
        aria-labelledby="news-heading"
        style={{
          background: COLORS.surface.s2,
          padding: SPACING.sectionPadding,
          borderTop: `1px solid ${COLORS.border.default}`,
        }}
      >
        <div aria-live="polite" aria-atomic="true" className="sr-only">
          {item.title}
        </div>

        <div
          style={{ maxWidth: LAYOUT.maxWidth, margin: "0 auto", padding: `0 ${LAYOUT.padding}px` }}
        >
          <div
            className="reveal"
            suppressHydrationWarning
            style={{
              marginBottom: 32,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <div>
              <div className="section-eyebrow">
                <div className="section-eyebrow-line" />
                <span className="section-eyebrow-label">{t.sectionLabel}</span>
              </div>
              <h2 id="news-heading" className="t-display-md" style={{ color: COLORS.text.primary }}>
                {t.heading}
              </h2>
            </div>
            {filtered.length > 0 ? (
              <div className="md-badge" style={{ marginBottom: 4 }}>
                {String(current + 1).padStart(2, "0")} / {String(filtered.length).padStart(2, "0")}
              </div>
            ) : null}
          </div>

          <div
            className="reveal"
            suppressHydrationWarning
            style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 24 }}
          >
            <button
              className={`chip ${activeCategory === "all" ? "active" : ""}`}
              onClick={() => setActiveCategory("all")}
            >
              {t.allCategories}
            </button>
            {categoriesWithNews.map((cat) => (
              <button
                key={cat}
                className={`chip ${activeCategory === cat ? "active" : ""}`}
                onClick={() => setActiveCategory(cat)}
                style={
                  activeCategory === cat
                    ? { borderColor: getCategoryColor(cat), color: getCategoryColor(cat) }
                    : {}
                }
              >
                {getCategoryLabel(cat, lang)}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {!item ? (
              <div
                className="lg:col-span-3"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: SIZES.newsCarousel.emptyStateMinHeight,
                  borderRadius: "var(--r-2xl)",
                  border: "1px solid var(--b-subtle)",
                  background: "var(--s-4)",
                  color: COLORS.text.tertiary,
                  fontSize: 14,
                  letterSpacing: "0.04em",
                }}
              >
                {t.noNews}
              </div>
            ) : null}
            {item ? (
              <>
                <div className="lg:col-span-2 reveal-left" suppressHydrationWarning>
                  <div
                    ref={containerRef}
                    tabIndex={0}
                    role="region"
                    aria-label={t.heading}
                    style={{
                      position: "relative",
                      borderRadius: "var(--r-2xl)",
                      overflow: "hidden",
                      background: "var(--s-4)",
                      border: "1px solid var(--b-subtle)",
                      height: SIZES.newsCard.height,
                      width: "100%",
                      outline: "none",
                    }}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                    onTouchCancel={handleTouchCancel}
                  >
                    <img
                      key={item.isoDate}
                      src={item.image}
                      alt={item.title}
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: reducedMotion ? "none" : "opacity .65s cubic-bezier(0.2,0,0,1)",
                      }}
                      onError={(e) =>
                        handleImageError(
                          e,
                          IMAGE_FALLBACK.newsCard.width,
                          IMAGE_FALLBACK.newsCard.height,
                        )
                      }
                    />

                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: GRADIENTS.newsCard,
                      }}
                    />

                    <div
                      style={{ position: "absolute", top: 18, left: 18, display: "flex", gap: 8 }}
                    >
                      <div className="md-badge-surface md-badge" style={{ gap: 6 }}>
                        <Calendar size={9} style={{ color: COLORS.orange }} aria-hidden="true" />
                        <time dateTime={item.isoDate}>{item.date}</time>
                      </div>
                      {item.type && (
                        <div
                          className="md-badge-surface md-badge"
                          style={{
                            gap: 6,
                            borderColor: getCategoryColor(item.type),
                            color: getCategoryColor(item.type),
                          }}
                        >
                          {getCategoryLabel(item.type, lang)}
                        </div>
                      )}
                    </div>

                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: SPACING.cardPadding.news,
                      }}
                    >
                      <h3
                        className="t-headline-lg"
                        style={{
                          color: COLORS.text.primary,
                          marginBottom: "clamp(6px,1.5vw,10px)",
                          lineHeight: 1.28,
                          fontSize: SIZES.newsCard.titleSize,
                        }}
                      >
                        {item.title}
                      </h3>

                      <div
                        style={{
                          height: 1,
                          background: COLORS.border.strong,
                          marginBottom: "clamp(8px,1.5vw,12px)",
                        }}
                      />

                      <p
                        className="t-body-md news-card-summary"
                        style={{
                          color: COLORS.text.secondary,
                          maxWidth: SIZES.newsCard.maxSummaryWidth,
                          lineHeight: 1.65,
                          marginBottom: "clamp(12px,2.5vw,20px)",
                          fontSize: SIZES.newsCard.summarySize,
                          overflow: "hidden",
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical" as const,
                        }}
                      >
                        {item.summary}
                      </p>

                      <div className="flex-row gap-12" style={{ alignItems: "center" }}>
                        <button
                          className="btn-tonal"
                          style={{ gap: 7, height: 36, fontSize: 13, flexShrink: 0 }}
                          onClick={() => setModalItem(item)}
                          aria-label={`${t.readMore}: ${item.title}`}
                        >
                          {t.readMore}
                          <ArrowUpRight size={14} aria-hidden="true" />
                        </button>

                        <div
                          style={{
                            flex: 1,
                            maxWidth: 130,
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                          }}
                          aria-hidden="true"
                        >
                          {paused || reducedMotion ? (
                            paused ? (
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 5,
                                  color: COLORS.text.muted,
                                }}
                              >
                                <PauseCircle size={12} />
                                <span
                                  style={{
                                    fontSize: 10,
                                    fontWeight: 700,
                                    letterSpacing: 1,
                                    textTransform: "uppercase" as const,
                                  }}
                                >
                                  {t.paused}
                                </span>
                              </div>
                            ) : null
                          ) : (
                            <div className="md-progress-track" style={{ flex: 1 }}>
                              <div
                                key={progressKey}
                                className="md-progress-auto"
                                style={
                                  {
                                    "--progress-duration": `${NEWS_CAROUSEL.AUTO_INTERVAL}ms`,
                                  } as React.CSSProperties
                                }
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <p
                    className="lg:hidden"
                    style={{
                      textAlign: "center",
                      color: COLORS.text.muted,
                      fontSize: 11,
                      marginTop: 8,
                      letterSpacing: 0.5,
                    }}
                    aria-hidden="true"
                  >
                    ← {t.swipeHint} →
                  </p>
                </div>

                <ul
                  role="listbox"
                  aria-label={t.sectionLabel}
                  aria-activedescendant={`news-item-${current}`}
                  className="reveal-right"
                  suppressHydrationWarning
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    outline: "none",
                  }}
                >
                  {filtered.map((n, i) => {
                    const isActive = i === current;
                    return (
                      <li key={n.isoDate} role="presentation">
                        <button
                          id={`news-item-${i}`}
                          role="option"
                          aria-selected={isActive}
                          onClick={() => goTo(i)}
                          className="state"
                          aria-label={`${n.date} — ${n.title}`}
                          style={{
                            width: "100%",
                            textAlign: "left",
                            padding: "14px 16px",
                            cursor: "pointer",
                            borderRadius: 12,
                            overflow: "hidden",
                            border: "none",
                            background: isActive ? COLORS.surface.s5 : "transparent",
                            outline: isActive
                              ? `1px solid ${COLORS.border.strong}`
                              : "1px solid transparent",
                            outlineOffset: -1,
                            transition: reducedMotion ? "none" : "all .25s cubic-bezier(0.2,0,0,1)",
                          }}
                        >
                          {isActive && (
                            <div
                              aria-hidden="true"
                              style={{
                                position: "absolute",
                                left: 0,
                                top: 10,
                                bottom: 10,
                                width: 2,
                                borderRadius: "0 2px 2px 0",
                                background: COLORS.orange,
                              }}
                            />
                          )}
                          <span
                            className="t-label-sm"
                            style={{
                              color: isActive ? COLORS.orange : COLORS.text.tertiary,
                              marginBottom: 6,
                              display: "block",
                              letterSpacing: 0.4,
                              textTransform: "none" as const,
                              fontSize: 11,
                              transition: reducedMotion ? "none" : "color .2s",
                            }}
                          >
                            <time dateTime={n.isoDate}>{n.date}</time>
                          </span>
                          <p
                            className="t-title-sm"
                            style={{
                              color: isActive ? COLORS.text.primary : COLORS.text.tertiary,
                              fontWeight: isActive ? 600 : 400,
                              lineHeight: 1.45,
                              transition: reducedMotion ? "none" : "color .2s",
                            }}
                          >
                            {n.title}
                          </p>
                          <p
                            className="t-body-sm"
                            style={{ color: COLORS.text.muted, marginTop: 4, lineHeight: 1.4 }}
                          >
                            {n.summary.slice(0, NEWS_SUMMARY_PREVIEW_CHARS)}…
                          </p>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </>
            ) : null}
          </div>
        </div>
      </section>
    </ErrorBoundary>
  );
};

export default NewsCarousel;
