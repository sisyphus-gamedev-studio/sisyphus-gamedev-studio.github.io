import { useState, useEffect, useCallback, useRef, useMemo, type FC } from "react";
import { Menu, X, Globe } from "lucide-react";
import type { Language, TranslationStructure } from "../../types";
import {
  BRAND,
  SOCIAL_LINKS,
  COLORS,
  LAYOUT,
  TRANSITIONS,
  BACKDROP,
  Z_INDEX,
  SIZES,
  isMailtoLink,
} from "../../config";
import { useLanguageSync } from "../../hooks/useLanguageSync";

interface NavbarProps {
  lang: Language;
  t: TranslationStructure["nav"];
}

const NAV_HEIGHT = LAYOUT.navHeight;

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

  const links = useMemo(
    () => [
      { id: "home", label: t.home, href: "#home" },
      { id: "about", label: t.about, href: "#about" },
      { id: "projects", label: t.projects, href: "#projects" },
      { id: "news", label: t.news, href: "#news" },
      { id: "careers", label: t.careers, href: "#careers" },
      { id: "donate", label: t.donate, href: "#donate" },
      { id: "partners", label: t.partners, href: "#partners" },
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
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: Z_INDEX.nav,
        height: NAV_HEIGHT,
        background: scrolled ? COLORS.navBg : "transparent",
        backdropFilter: scrolled ? BACKDROP.navScrolled : "none",
        borderBottom: scrolled ? `1px solid ${COLORS.border.default}` : "1px solid transparent",
        transition: `background ${TRANSITIONS.default}, border-color ${TRANSITIONS.default}, backdrop-filter ${TRANSITIONS.default}`,
      }}
    >
      <div
        style={{
          maxWidth: LAYOUT.maxWidth,
          margin: "0 auto",
          padding: `0 ${LAYOUT.padding}px`,
          height: NAV_HEIGHT,
          display: "flex",
          alignItems: "center",
          gap: 4,
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
            marginRight: 16,
            padding: "5px 10px 5px 5px",
            borderRadius: "var(--r-full)",
          }}
        >
          <img
            src="/favicon.png"
            alt="Sisyphus Studio"
            width={56}
            height={56}
            style={{ borderRadius: 8, objectFit: "cover", flexShrink: 0 }}
          />
          <span className="t-brand-lg" style={{ fontSize: SIZES.nav.brandFontSize }}>
            {BRAND.prefix}
            <span style={{ color: COLORS.orange }}>{BRAND.suffix}</span>
          </span>
        </a>

        <div className="hidden md:flex" style={{ flex: 1, alignItems: "center", gap: 2 }}>
          {links.map(({ id, label, href }) => {
            const isActive = active === id;
            return (
              <a
                key={id}
                href={href}
                onClick={() => handleNavClick(id)}
                className={`nav-desktop-link state ${isActive ? "active" : ""}`}
                style={{ fontSize: SIZES.nav.linkFontSize }}
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
                      borderRadius: "var(--r-full)",
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
          <div
            style={{ width: 1, height: 16, background: COLORS.border.strong, margin: "0 6px" }}
          />
          <a
            href={langSwitchHref}
            className="chip"
            style={{
              height: 26,
              fontSize: SIZES.nav.chipFontSize,
              letterSpacing: SIZES.nav.chipLetterSpacing,
              textDecoration: "none",
              gap: 5,
            }}
          >
            <Globe size={11} />
            {otherLang.toUpperCase()}
          </a>
        </div>

        <button
          ref={burgerRef}
          className="md:hidden icon-btn-outlined"
          style={{ marginLeft: "auto", width: 34, height: 34 }}
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
        ref={mobileMenuRef}
        onKeyDown={handleMenuKeyDown}
        {...(mobileOpen ? { role: "dialog", "aria-modal": "true", "aria-label": t.navMenu } : {})}
        style={{
          maxHeight: mobileOpen ? "420px" : 0,
          opacity: mobileOpen ? 1 : 0,
          overflow: "hidden",
          background: COLORS.panelBg,
          backdropFilter: BACKDROP.panel,
          borderTop: mobileOpen ? `1px solid ${COLORS.border.default}` : "1px solid transparent",
          transition: `max-height ${TRANSITIONS.default}, opacity ${TRANSITIONS.fast}`,
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
                padding: "11px 16px",
                borderRadius: 10,
                fontSize: SIZES.nav.mobileLinkFontSize,
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
              className="chip"
              tabIndex={mobileOpen ? 0 : -1}
              style={{
                marginLeft: "auto",
                height: 26,
                textDecoration: "none",
                fontSize: SIZES.nav.mobileLangFontSize,
              }}
              onClick={() => setMobileOpen(false)}
            >
              <Globe size={11} />
              {lang === "en" ? "Русский" : "English"}
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
