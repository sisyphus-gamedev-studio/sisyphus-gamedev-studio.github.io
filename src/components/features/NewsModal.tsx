import { useEffect, useRef, useCallback } from "react";
import { X, Calendar } from "lucide-react";
import type { NewsItem, TranslationStructure } from "../../types";
import { handleImageError } from "../../utils/images";
import { FOCUSABLE_SELECTORS, IMAGE_FALLBACK } from "../../config";

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
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div ref={panelRef} className="modal-panel">
        <div className="modal-panel__image">
          <img
            src={item.image}
            alt=""
            aria-hidden="true"
            width={720}
            height={240}
            loading="lazy"
            decoding="async"
            onError={(e) =>
              handleImageError(e, IMAGE_FALLBACK.newsModal.width, IMAGE_FALLBACK.newsModal.height)
            }
          />
          <div className="modal-panel__image-overlay" aria-hidden="true" />
          <div className="modal-panel__toolbar">
            <div className="md-badge-surface md-badge">
              <Calendar size={9} aria-hidden="true" />
              <time dateTime={item.isoDate}>{item.date}</time>
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label={closeLabel}
              className="state modal-panel__close"
            >
              <X size={15} strokeWidth={2.2} />
            </button>
          </div>
          <div className="modal-panel__image-footer">
            <div className="modal-panel__accent-bar" aria-hidden="true" />
            <h2 id="modal-title" className="modal-panel__title">
              {item.title}
            </h2>
          </div>
        </div>
        <div tabIndex={0} className="modal-panel__body">
          {paragraphs.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsModal;
