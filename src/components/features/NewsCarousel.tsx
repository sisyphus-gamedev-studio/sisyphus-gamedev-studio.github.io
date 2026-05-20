import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Calendar, ArrowUpRight, PauseCircle } from "lucide-react";
import type { NewsItem, NewsCategory, TranslationStructure } from "../../types";
import { handleImageError } from "../../utils/images";
import {
  NEWS_CAROUSEL,
  NEWS_SUMMARY_PREVIEW_CHARS,
  SWIPE_THRESHOLD,
  COLORS,
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
        className="site-section site-section--grid"
        aria-labelledby="news-heading"
      >
        <div className="site-section__container">
          <div className="site-section__head">
            <div className="section-eyebrow">
              <div className="section-eyebrow-line" />
              <span className="section-eyebrow-label">{t.sectionLabel}</span>
            </div>
            <h2 id="news-heading" className="t-display-md section-heading">
              {t.heading}
              <span className="section-heading__accent"> {t.headingSuffix}</span>
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

      <section id="news" className="site-section site-section--grid" aria-labelledby="news-heading">
        <div className="site-section__container">
          <div aria-live="polite" aria-atomic="true" className="sr-only">
            {item.title}
          </div>

          <div
            className="site-section__head site-section__head--row reveal"
            suppressHydrationWarning
          >
            <div>
              <div className="section-eyebrow">
                <div className="section-eyebrow-line" />
                <span className="section-eyebrow-label">{t.sectionLabel}</span>
              </div>
              <h2 id="news-heading" className="t-display-md section-heading">
                {t.heading}
                <span className="section-heading__accent"> {t.headingSuffix}</span>
              </h2>
            </div>
            {filtered.length > 0 ? (
              <div className="md-badge">{String(current + 1).padStart(2, "0")} / {String(filtered.length).padStart(2, "0")}</div>
            ) : null}
          </div>

          <div className="reveal news-filters" suppressHydrationWarning>
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
                className="news-empty lg:col-span-3"
                style={{ minHeight: SIZES.newsCarousel.emptyStateMinHeight }}
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
                    className="news-card-main card card--flush"
                    style={{ height: SIZES.newsCard.height }}
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
                      className="news-card-main__gradient"
                      style={{ background: GRADIENTS.newsCard }}
                    />

                    <div className="news-card-main__badges">
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

                    <div className="news-card-main__footer">
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

                      <div className="news-card-main__divider" />

                      <p
                        className="t-body-md"
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

                  <p className="news-swipe-hint lg:hidden" aria-hidden="true">
                    ← {t.swipeHint} →
                  </p>
                </div>

                <ul
                  role="listbox"
                  aria-label={t.sectionLabel}
                  aria-activedescendant={`news-item-${current}`}
                  className="reveal-right news-card-list"
                  suppressHydrationWarning
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
                          className={`state news-card-list-item${isActive ? " news-card-list-item--active" : ""}`}
                          aria-label={`${n.date} — ${n.title}`}
                          style={reducedMotion ? { transition: "none" } : undefined}
                        >
                          {isActive && <div className="news-card-list-item__accent" aria-hidden="true" />}
                          <span className="t-label-sm news-card-list-item__date">
                            <time dateTime={n.isoDate}>{n.date}</time>
                          </span>
                          <p className="t-title-sm news-card-list-item__title">{n.title}</p>
                          <p className="t-body-sm news-card-list-item__summary">
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
