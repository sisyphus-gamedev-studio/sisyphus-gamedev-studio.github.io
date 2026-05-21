import { useState, useEffect, useCallback, useRef, useMemo, type FC } from "react";
import { Menu, X, Globe } from "lucide-react";
import type { Language, TranslationStructure } from "../../types";
import { SOCIAL_LINKS, buildNavLinks, isMailtoLink } from "../../config";
import { useLanguageSync } from "../../hooks/useLanguageSync";
import { BrandLink } from "./BrandLink";

interface NavbarProps {
  lang: Language;
  t: TranslationStructure["nav"];
}

const Navbar: FC<NavbarProps> = ({ lang, t }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("home");
  const manualNavRef = useRef(false);
  const manualNavTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useLanguageSync(lang);

  const otherLang: Language = lang === "en" ? "ru" : "en";
  const langSwitchHref = `/${otherLang}/`;

  const links = useMemo(() => buildNavLinks(t), [t]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const sectionIds = links.map((l) => l.id).join(",");
  useEffect(() => {
    const onScroll = () => {
      if (manualNavRef.current) return;
      const trigger = window.scrollY + window.innerHeight * 0.35;
      let bestId = links[0].id;
      let bestTop = -Infinity;
      links.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return;
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (top <= trigger && top > bestTop) {
          bestTop = top;
          bestId = id;
        }
      });
      setActive(bestId);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [sectionIds, links]);

  const handleNavClick = useCallback((id: string) => {
    setActive(id);
    setMobileOpen(false);
    manualNavRef.current = true;
    if (manualNavTimer.current) clearTimeout(manualNavTimer.current);
    manualNavTimer.current = setTimeout(() => {
      manualNavRef.current = false;
    }, 1200);
  }, []);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    requestAnimationFrame(() => burgerRef.current?.focus());
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const firstFocusable = mobileMenuRef.current?.querySelector<HTMLElement>("a, button");
    requestAnimationFrame(() => firstFocusable?.focus());
  }, [mobileOpen]);

  const handleMenuKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (!mobileOpen) return;
      if (e.key === "Escape") {
        e.preventDefault();
        closeMobile();
        return;
      }
      if (e.key !== "Tab") return;
      const focusables = Array.from(
        mobileMenuRef.current?.querySelectorAll<HTMLElement>("a, button") ?? [],
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
    [mobileOpen, closeMobile],
  );

  useEffect(
    () => () => {
      if (manualNavTimer.current) clearTimeout(manualNavTimer.current);
    },
    [],
  );

  return (
    <nav
      aria-label="Main navigation"
      className={`nav-shell${scrolled ? " nav-shell--scrolled" : ""}`}
    >
      <div className="nav-inner">
        <BrandLink href="#home" variant="nav" onClick={() => handleNavClick("home")} />

        <div className="nav-desktop-toolbar nav-desktop-links nav-desktop-toolbar--links">
          {links.map(({ id, label, href }) => {
            const isActive = active === id;
            return (
              <a
                key={id}
                href={href}
                onClick={() => handleNavClick(id)}
                className={`nav-desktop-link state${isActive ? " active" : ""}`}
              >
                {label}
                {isActive && <span className="nav-active-indicator" aria-hidden="true" />}
              </a>
            );
          })}
        </div>

        <div className="nav-desktop-toolbar nav-desktop-toolbar--actions">
          {SOCIAL_LINKS.map(({ iconSvg, href, label }) => (
            <a
              key={label}
              href={href}
              title={label}
              target={isMailtoLink(href) ? undefined : "_blank"}
              rel={isMailtoLink(href) ? undefined : "noopener noreferrer"}
              className="icon-btn"
            >
              <span dangerouslySetInnerHTML={{ __html: iconSvg }} />
            </a>
          ))}
          <div className="nav-divider" aria-hidden="true" />
          <a href={langSwitchHref} className="chip nav-lang-chip">
            <Globe size={18} />
            {otherLang.toUpperCase()}
          </a>
        </div>

        <button
          ref={burgerRef}
          className="nav-burger-btn icon-btn-outlined"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={t.toggleNav}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
        >
          {mobileOpen ? <X size={16} /> : <Menu size={16} />}
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`nav-mobile-sheet${mobileOpen ? " nav-mobile-sheet--open" : ""}`}
        ref={mobileMenuRef}
        onKeyDown={handleMenuKeyDown}
        {...(mobileOpen ? { role: "dialog", "aria-modal": "true", "aria-label": t.navMenu } : {})}
      >
        <div className="nav-mobile-inner">
          {links.map(({ id, label, href }) => (
            <a
              key={id}
              href={href}
              className={`nav-mobile-link state${active === id ? " nav-mobile-link--active" : ""}`}
              onClick={() => handleNavClick(id)}
              tabIndex={mobileOpen ? 0 : -1}
            >
              {label}
            </a>
          ))}
          <div className="nav-mobile-divider" aria-hidden="true" />
          <div className="nav-mobile-actions">
            {SOCIAL_LINKS.map(({ iconSvg, href, label }) => (
              <a
                key={label}
                href={href}
                className="icon-btn-outlined"
                title={label}
                tabIndex={mobileOpen ? 0 : -1}
                target={isMailtoLink(href) ? undefined : "_blank"}
                rel={isMailtoLink(href) ? undefined : "noopener noreferrer"}
              >
                <span dangerouslySetInnerHTML={{ __html: iconSvg }} />
              </a>
            ))}
            <a
              href={langSwitchHref}
              className="chip nav-mobile-lang-chip"
              tabIndex={mobileOpen ? 0 : -1}
              onClick={() => setMobileOpen(false)}
            >
              <Globe size={18} />
              {lang === "en" ? "Русский" : "English"}
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
