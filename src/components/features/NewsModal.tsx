import { useEffect, useRef, useCallback } from "react";
import { X, Calendar } from "lucide-react";
import type { NewsItem, TranslationStructure } from "../../types";
import { handleImageError } from "../../utils/images";
import {
  FOCUSABLE_SELECTORS,
  COLORS,
  SIZES,
  IMAGE_FILTERS,
  IMAGE_FALLBACK,
  BACKDROP,
  OVERLAY,
  Z_INDEX,
} from "../../config";

interface NewsModalProps {
  item: NewsItem;
  onClose: () => void;
  closeLabel: TranslationStructure["news"]["closeArticle"];
}

const NewsModal = ({ item, onClose, closeLabel }: NewsModalProps) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<Element | null>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const focusables = Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS) ?? [],
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [onClose],
  );

  useEffect(() => {
    triggerRef.current = document.activeElement;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prev;
      (triggerRef.current as HTMLElement | null)?.focus();
    };
  }, [handleKeyDown]);

  const paragraphs = (item.body || item.summary).split("\n\n").filter(Boolean);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: Z_INDEX.modal,
        background: OVERLAY.modalBg,
        backdropFilter: BACKDROP.modal,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        animation: "modal-bg-in .22s ease both",
      }}
    >
      <div
        ref={panelRef}
        className="news-modal-panel"
        style={{
          background: COLORS.surface.s3,
          border: `1px solid ${COLORS.border.strong}`,
          borderRadius: 20,
          width: "100%",
          maxWidth: SIZES.modal.maxWidth,
          maxHeight: "90vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          boxShadow: SIZES.modal.boxShadow,
        }}
      >
        <div style={{ position: "relative", height: SIZES.modal.imageHeight, flexShrink: 0 }}>
          <img
            src={item.image}
            alt=""
            aria-hidden="true"
            width={720}
            height={SIZES.modal.imageHeight}
            loading="lazy"
            decoding="async"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              filter: IMAGE_FILTERS.modal,
            }}
            onError={(e) =>
              handleImageError(e, IMAGE_FALLBACK.newsModal.width, IMAGE_FALLBACK.newsModal.height)
            }
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(180deg,rgba(0,0,0,.15) 0%,${COLORS.surface.s3} 100%)`,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              padding: "16px 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div className="md-badge-surface md-badge" style={{ gap: 6 }}>
              <Calendar size={9} style={{ color: COLORS.orange }} aria-hidden="true" />
              <time dateTime={item.isoDate}>{item.date}</time>
            </div>
            <button
              ref={closeRef}
              onClick={onClose}
              aria-label={closeLabel}
              className="state"
              style={{
                width: 34,
                height: 34,
                borderRadius: "50%",
                border: `1px solid ${OVERLAY.modalCloseBorder}`,
                background: OVERLAY.modalCloseBg,
                backdropFilter: BACKDROP.modalClose,
                color: COLORS.text.primary,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <X size={15} strokeWidth={2.2} />
            </button>
          </div>
          <div
            style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 28px 24px" }}
          >
            <div
              style={{
                height: 2,
                width: 28,
                background: COLORS.orange,
                borderRadius: 2,
                marginBottom: 12,
              }}
            />
            <h2
              id="modal-title"
              className="t-card-title"
              style={{ fontSize: SIZES.modal.titleSize, lineHeight: 1.05 }}
            >
              {item.title}
            </h2>
          </div>
        </div>
        <div
          tabIndex={0}
          style={{ overflowY: "auto", padding: "28px 28px 36px", flex: 1, outline: "none" }}
        >
          {paragraphs.map((para, i) => (
            <p
              key={i}
              style={{
                color: i === 0 ? COLORS.text.dim : COLORS.text.secondary,
                fontSize: i === 0 ? 15 : 14,
                lineHeight: 1.78,
                fontWeight: i === 0 ? 500 : 400,
                marginBottom: i < paragraphs.length - 1 ? 18 : 0,
              }}
            >
              {para}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsModal;
