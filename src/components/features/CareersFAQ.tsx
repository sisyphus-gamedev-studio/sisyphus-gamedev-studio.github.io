import { useState, useEffect, useRef, useCallback, type FC } from "react";
import { createPortal } from "react-dom";
import { X, HelpCircle, ChevronDown } from "lucide-react";
import type { TranslationStructure } from "../../types";
import { FOCUSABLE_SELECTORS } from "../../config";

interface CareersFAQProps {
  t: TranslationStructure["careers"]["faq"];
}

interface AccordionItemProps {
  question: string;
  answer: string;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}

const AccordionItem: FC<AccordionItemProps> = ({ question, answer, index, isOpen, onToggle }) => (
  <div className={`faq-accordion-item${isOpen ? " faq-accordion-item--open" : ""}`}>
    <button type="button" onClick={onToggle} aria-expanded={isOpen} className="faq-accordion-trigger">
      <div className="faq-accordion-trigger__main">
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

  const modal = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="faq-modal-title"
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div ref={panelRef} className="modal-panel card faq-modal-panel">
        <div className="modal-panel__header">
          <div className="modal-panel__header-row">
            <div className="modal-panel__header-text">
              <div className="md-badge-primary md-badge">
                <HelpCircle size={10} aria-hidden="true" />
                FAQ
              </div>
              <h2 id="faq-modal-title" className="faq-modal__title">
                {t.title}
              </h2>
              <p className="modal-panel__subtitle">{t.subtitle}</p>
            </div>

            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label={t.closeLabel}
              className="state modal-panel__close"
            >
              <X size={15} strokeWidth={2.2} />
            </button>
          </div>
        </div>

        <div tabIndex={0} className="modal-panel__scroll">
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

const CareersFAQ: FC<CareersFAQProps> = ({ t }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="btn-outlined careers-faq-trigger">
        <HelpCircle size={14} aria-hidden="true" />
        {t.triggerLabel}
      </button>

      {open && <FAQModal t={t} onClose={() => setOpen(false)} />}
    </>
  );
};

export default CareersFAQ;
