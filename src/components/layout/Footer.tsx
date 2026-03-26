import { type FC } from "react";
import { ArrowUp } from "lucide-react";
import type { Language, TranslationStructure } from "../../types";
import { BRAND, COLORS, LAYOUT, SOCIAL_LINKS, BACKDROP, SIZES, isMailtoLink } from "../../config";
import { ErrorBoundary } from "../common/ErrorBoundary";

interface FooterProps {
  t: TranslationStructure["footer"];
  nav: TranslationStructure["nav"];
  year: number;
  lang: Language;
}

const Footer: FC<FooterProps> = ({ t, nav, year, lang }) => {
  const copyright = t.copyright.replace("{year}", String(year));
  const base = `/${lang}/`;

  const footerLinks = [
    { label: nav.home, href: `${base}#home` },
    { label: nav.about, href: `${base}#about` },
    { label: nav.projects, href: `${base}#projects` },
    { label: nav.news, href: `${base}#news` },
    { label: nav.careers, href: `${base}#careers` },
    { label: nav.donate, href: `${base}#donate` },
    { label: nav.contact, href: `${base}#contact` },
  ];

  return (
    <ErrorBoundary>
      <footer
        aria-labelledby="footer-heading"
        style={{
          background: COLORS.panelBg,
          backdropFilter: BACKDROP.footer,
          borderTop: `1px solid ${COLORS.border.default}`,
        }}
      >
        <h2 id="footer-heading" className="sr-only">
          {t.sectionLabel}
        </h2>

        <div
          style={{
            maxWidth: LAYOUT.maxWidth,
            margin: "0 auto",
            padding: `${SIZES.footer.paddingTop}px ${LAYOUT.padding}px ${SIZES.footer.paddingBottom}px`,
          }}
        >
          <div className="footer-top-row">
            <a
              href={`${base}#home`}
              className="state"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                textDecoration: "none",
                padding: "4px 8px 4px 4px",
                borderRadius: "var(--r-full)",
                flexShrink: 0,
              }}
            >
              <img
                src="/favicon.png"
                alt={`${BRAND.prefix} ${BRAND.suffix}`}
                width={SIZES.footer.logoSize}
                height={SIZES.footer.logoSize}
                style={{ borderRadius: 8, objectFit: "cover" }}
              />
              <span className="t-brand-lg" style={{ fontSize: SIZES.nav.brandFontSize }}>
                {BRAND.prefix}
                <span style={{ color: COLORS.orange }}>{BRAND.suffix}</span>
              </span>
            </a>

            <nav
              aria-label="Footer navigation"
              className="footer-nav"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {footerLinks.map((link) => (
                <a key={link.href} href={link.href} className="footer-nav-link state">
                  {link.label}
                </a>
              ))}
            </nav>

            <div
              className="footer-actions"
              style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}
            >
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={isMailtoLink(link.href) ? undefined : "_blank"}
                  rel={isMailtoLink(link.href) ? undefined : "noopener noreferrer"}
                  aria-label={link.label}
                  className="footer-social-icon state"
                >
                  <span dangerouslySetInnerHTML={{ __html: link.iconSvg }} />
                </a>
              ))}

              <div className="footer-divider" />

              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="icon-btn-outlined"
                title={t.backToTop}
                style={{
                  width: SIZES.footer.backToTopSize,
                  height: SIZES.footer.backToTopSize,
                  flexShrink: 0,
                }}
              >
                <ArrowUp size={13} />
              </button>
            </div>
          </div>

          <div className="footer-bottom-row">
            <p className="t-body-sm" style={{ color: COLORS.text.muted }}>
              {copyright}
            </p>
          </div>
        </div>
      </footer>
    </ErrorBoundary>
  );
};

export default Footer;
