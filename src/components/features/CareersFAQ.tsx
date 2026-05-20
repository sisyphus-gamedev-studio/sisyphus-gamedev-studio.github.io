import { useState, useEffect, useRef, useCallback, type FC } from "react";
import { createPortal } from "react-dom";
import { X, HelpCircle, ChevronDown } from "lucide-react";
import type { TranslationStructure } from "../../types";
import { COLORS, FOCUSABLE_SELECTORS, Z_INDEX, SIZES } from "../../config";

interface CareersFAQProps {
  t: TranslationStructure["careers"]["faq"];
}

/* ─── Accordion item ──────────────────────────────────────────────── */
interface AccordionItemProps {
  question: string;
  answer: string;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}

const AccordionItem: FC<AccordionItemProps> = ({ question, answer, index, isOpen, onToggle }) => (
  <div className={`faq-accordion-item${isOpen ? " faq-accordion-item--open" : ""}`}>
    <button
      onClick={onToggle}
      aria-expanded={isOpen}
      className="faq-accordion-trigger"
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 10, flex: 1, minWidth: 0 }}>
        <span className="faq-accordion-index">{String(index + 1).padStart(2, "0")}</span>
        <span
          className={`faq-accordion-question${isOpen ? " faq-accordion-question--open" : " faq-accordion-question--closed"}`}
        >
          {question}
        </span>
      </div>
      <span className={`faq-accordion-chevron${isOpen ? " faq-accordion-chevron--open" : ""}`}>
        <ChevronDown size={13} strokeWidth={2.5} />
      </span>
    </button>

    <div className={`faq-accordion-body${isOpen ? " faq-accordion-body--open" : ""}`}>
      <div className="faq-accordion-body__inner">
        <p className="faq-accordion-answer">{answer}</p>
      </div>
    </div>
  </div>
);

/* ─── FAQ Modal ───────────────────────────────────────────────────── */
interface FAQModalProps {
  t: TranslationStructure["careers"]["faq"];
  onClose: () => void;
}

const FAQModal: FC<FAQModalProps> = ({ t, onClose }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
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
      if (!focusables.length) return;
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

  const toggle = useCallback((i: number) => setOpenIndex((p) => (p === i ? null : i)), []);

  /*
    Rendered via createPortal directly into document.body.
    This bypasses any ancestor will-change / transform stacking contexts
    that break position:fixed and backdrop-filter — the same reason
    the news modal blur works correctly.
  */
  const modal = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="faq-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: Z_INDEX.modal,
        background: "rgba(0,0,0,.72)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)" as unknown as string,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        animation: "modal-bg-in .22s ease both",
      }}
    >
      <div
        ref={panelRef}
        className="news-modal-panel card faq-modal-panel"
        style={{
          width: "100%",
          maxWidth: SIZES.modal.maxWidth,
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          boxShadow: SIZES.modal.boxShadow,
          overflow: "hidden",
        }}
      >
        <div
          className="faq-modal-header"
          style={{
            padding: "22px 24px 18px",
            flexShrink: 0,
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 1,
              background: `linear-gradient(90deg,${COLORS.orange},rgba(248,126,15,.15) 50%,transparent)`,
            }}
          />
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: 16,
            }}
          >
            <div>
              <div className="md-badge-primary md-badge" style={{ marginBottom: 10 }}>
                <HelpCircle size={10} color={COLORS.orange} aria-hidden="true" />
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "1.5px",
                    textTransform: "uppercase" as const,
                    color: COLORS.orangeAccent,
                  }}
                >
                  FAQ
                </span>
              </div>
              <h2
                id="faq-modal-title"
                className="t-card-title"
                style={{ fontSize: "clamp(18px,3vw,24px)", marginBottom: 5 }}
              >
                {t.title}
              </h2>
              <p style={{ fontSize: 13, color: COLORS.text.tertiary, lineHeight: 1.5, margin: 0 }}>
                {t.subtitle}
              </p>
            </div>

            <button
              ref={closeRef}
              onClick={onClose}
              aria-label={t.closeLabel}
              className="state faq-modal-close icon-btn-outlined"
              style={{
                width: 34,
                height: 34,
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)" as unknown as string,
                flexShrink: 0,
              }}
            >
              <X size={15} strokeWidth={2.2} />
            </button>
          </div>
        </div>

        {/* Scrollable accordion body */}
        <div
          tabIndex={0}
          style={{
            overflowY: "auto",
            flex: 1,
            padding: "16px 20px 28px",
            outline: "none",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          {t.items.map((item, i) => (
            <AccordionItem
              key={i}
              index={i}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
};

/* ─── Exported island ─────────────────────────────────────────────── */
const CareersFAQ: FC<CareersFAQProps> = ({ t }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="btn-outlined"
        style={{ width: "100%", justifyContent: "center", height: 42, fontSize: 13, gap: 7 }}
      >
        <HelpCircle size={14} />
        {t.triggerLabel}
      </button>

      {open && <FAQModal t={t} onClose={() => setOpen(false)} />}
    </>
  );
};

export default CareersFAQ;
