import { useState, useEffect, useCallback, useRef, useMemo, type FC } from "react";
import { Menu, X, Globe } from "lucide-react";
import type { Language, TranslationStructure } from "../../types";
import { BRAND, SOCIAL_LINKS, COLORS, LAYOUT, SPACING, TRANSITIONS } from "../../config";
import { useLanguageSync } from "../../hooks/useLanguagePreference";
import { isMailtoLink } from "../../utils/helpers";

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
  const otherLangLabel = lang === "en" ? "RU" : "EN";
  const otherLangFull = lang === "en" ? "Русский" : "English";
  const langSwitchHref = `/${otherLang}/`;

  const links = useMemo(
    () => [
      { id: "home", label: t.home, href: "#home" },
      { id: "projects", label: t.projects, href: "#projects" },
      { id: "about", label: t.about, href: "#about" },
      { id: "news", label: t.news, href: "#news" },
      { id: "contact", label: t.contact, href: "#contact" },
    ],
    [t],
  );

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
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        height: LAYOUT.navHeight,
        background: scrolled ? "rgba(17,17,17,0.9)" : "transparent",
        backdropFilter: scrolled ? "blur(20px) saturate(1.4)" : "none",
        borderBottom: scrolled ? `1px solid ${COLORS.border.default}` : "1px solid transparent",
        transition: `background ${TRANSITIONS.default}, border-color ${TRANSITIONS.default}, backdrop-filter ${TRANSITIONS.default}`,
      }}
    >
      <div
        style={{
          maxWidth: LAYOUT.maxWidth,
          margin: "0 auto",
          padding: `0 ${LAYOUT.padding}px`,
          height: LAYOUT.navHeight,
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <a
          href="#home"
          onClick={() => handleNavClick("home")}
          className="state"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            textDecoration: "none",
            marginRight: SPACING.navLinkMargin,
            padding: "5px 8px",
            borderRadius: "9999px",
          }}
        >
          <img
            src="/favicon.png"
            alt="Sisyphus Studio"
            width={32}
            height={32}
            style={{ borderRadius: 8, objectFit: "cover", flexShrink: 0 }}
          />
          <span className="t-brand-lg">
            {BRAND.prefix}
            <span style={{ color: COLORS.orange }}>{BRAND.suffix}</span>
          </span>
        </a>

        <div className="hidden md:flex" style={{ flex: 1, alignItems: "center" }}>
          {links.map(({ id, label, href }) => {
            const isActive = active === id;
            return (
              <a
                key={id}
                href={href}
                onClick={() => handleNavClick(id)}
                className={`nav-desktop-link state ${isActive ? "active" : ""}`}
              >
                {label}
                {isActive && (
                  <span
                    style={{
                      position: "absolute",
                      bottom: 3,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: 14,
                      height: 2,
                      borderRadius: "9999px",
                      background: COLORS.orange,
                    }}
                  />
                )}
              </a>
            );
          })}
        </div>

        <div
          className="hidden md:flex"
          style={{ alignItems: "center", gap: 2, marginLeft: "auto" }}
        >
          {SOCIAL_LINKS.map(({ icon: Icon, iconSvg, href, label }) => (
            <a
              key={label}
              href={href}
              title={label}
              target={isMailtoLink(href) ? undefined : "_blank"}
              rel={isMailtoLink(href) ? undefined : "noopener noreferrer"}
              className="icon-btn"
            >
              {Icon ? (
                <Icon size={16} strokeWidth={1.8} />
              ) : (
                <span dangerouslySetInnerHTML={{ __html: iconSvg || "" }} />
              )}
            </a>
          ))}
          <div
            style={{ width: 1, height: 18, background: "rgba(255,255,255,.1)", margin: "0 6px" }}
          />
          <a
            href={langSwitchHref}
            className="chip"
            style={{ height: 28, fontSize: 11, letterSpacing: 1, textDecoration: "none" }}
          >
            <Globe size={12} />
            {otherLangLabel}
          </a>
        </div>

        <button
          ref={burgerRef}
          className="md:hidden icon-btn-outlined"
          style={{ marginLeft: "auto", width: 36, height: 36 }}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={t.toggleNav}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
        >
          {mobileOpen ? <X size={17} /> : <Menu size={17} />}
        </button>
      </div>

      <div
        id="mobile-menu"
        ref={mobileMenuRef}
        onKeyDown={handleMenuKeyDown}
        {...(mobileOpen ? { role: "dialog", "aria-modal": "true", "aria-label": t.navMenu } : {})}
        style={{
          maxHeight: mobileOpen ? "400px" : 0,
          opacity: mobileOpen ? 1 : 0,
          overflow: "hidden",
          background: "rgba(13,13,13,.96)",
          backdropFilter: "blur(20px)",
          borderTop: mobileOpen ? `1px solid ${COLORS.border.default}` : "1px solid transparent",
          transition: "max-height .3s cubic-bezier(0.2,0,0,1), opacity .22s",
          visibility: mobileOpen ? "visible" : "hidden",
        }}
      >
        <div
          style={{
            maxWidth: LAYOUT.maxWidth,
            margin: "0 auto",
            padding: "8px 16px 16px",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {links.map(({ id, label, href }) => (
            <a
              key={id}
              href={href}
              className="state"
              onClick={() => handleNavClick(id)}
              tabIndex={mobileOpen ? 0 : -1}
              style={{
                padding: "12px 16px",
                borderRadius: "12px",
                fontSize: 15,
                fontWeight: 600,
                color: active === id ? COLORS.text.primary : COLORS.text.tertiary,
                background: active === id ? COLORS.orangeDim : "transparent",
                textDecoration: "none",
                overflow: "hidden",
                transition: "color .2s, background .2s",
              }}
            >
              {label}
            </a>
          ))}
          <div style={{ height: 1, background: COLORS.border.default, margin: "8px 0" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {SOCIAL_LINKS.map(({ icon: Icon, iconSvg, href, label }) => (
              <a
                key={label}
                href={href}
                className="icon-btn-outlined"
                title={label}
                tabIndex={mobileOpen ? 0 : -1}
                target={isMailtoLink(href) ? undefined : "_blank"}
                rel={isMailtoLink(href) ? undefined : "noopener noreferrer"}
              >
                {Icon ? (
                  <Icon size={15} strokeWidth={1.8} />
                ) : (
                  <span dangerouslySetInnerHTML={{ __html: iconSvg || "" }} />
                )}
              </a>
            ))}
            <a
              href={langSwitchHref}
              className="chip"
              tabIndex={mobileOpen ? 0 : -1}
              style={{ marginLeft: "auto", height: 28, textDecoration: "none" }}
              onClick={() => setMobileOpen(false)}
            >
              <Globe size={12} />
              {otherLangFull}
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
