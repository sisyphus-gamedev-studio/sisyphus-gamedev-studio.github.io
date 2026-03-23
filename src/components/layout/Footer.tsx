import { type FC } from "react";
import { ArrowUp } from "lucide-react";
import type { Language, TranslationStructure } from "../../types";
import { BRAND, COLORS, LAYOUT, SOCIAL_LINKS, BACKDROP } from "../../config";
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
    { label: nav.about, href: `${base}#about` },
    { label: nav.projects, href: `${base}#projects` },
    { label: nav.news, href: `${base}#news` },
    { label: nav.careers, href: `${base}#careers` },
    { label: nav.donate, href: `${base}#donate` },
    { label: nav.partners, href: `${base}#partners` },
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
        <h2
          id="footer-heading"
          style={{
            position: "absolute",
            width: 1,
            height: 1,
            overflow: "hidden",
            clip: "rect(0,0,0,0)",
            whiteSpace: "nowrap",
          }}
        >
          {t.sectionLabel}
        </h2>

        <div
          style={{
            maxWidth: LAYOUT.maxWidth,
            margin: "0 auto",
            padding: `40px ${LAYOUT.padding}px 32px`,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 32,
              flexWrap: "wrap",
            }}
          >
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
                alt="Sisyphus Studio"
                width={28}
                height={28}
                style={{ borderRadius: 8, objectFit: "cover" }}
              />
              <span className="t-brand-lg" style={{ fontSize: 15 }}>
                {BRAND.prefix}
                <span style={{ color: COLORS.orange }}>{BRAND.suffix}</span>
              </span>
            </a>

            <nav
              aria-label="Footer navigation"
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

            <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  aria-label={link.label}
                  className="footer-social-icon state"
                >
                  <span dangerouslySetInnerHTML={{ __html: link.iconSvg }} />
                </a>
              ))}

              <div
                style={{ width: 1, height: 20, background: COLORS.border.subtle, margin: "0 4px" }}
              />

              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="icon-btn-outlined"
                title={t.backToTop}
                style={{ width: 32, height: 32, flexShrink: 0 }}
              >
                <ArrowUp size={13} />
              </button>
            </div>
          </div>

          <div
            style={{
              borderTop: `1px solid ${COLORS.border.subtle}`,
              marginTop: 24,
              paddingTop: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <p className="t-body-sm" style={{ color: COLORS.text.muted }}>
              {copyright}
            </p>
            <p className="t-body-sm" style={{ color: COLORS.text.muted }}>
              {t.cta.badge}
            </p>
          </div>
        </div>
      </footer>
    </ErrorBoundary>
  );
};

export default Footer;
