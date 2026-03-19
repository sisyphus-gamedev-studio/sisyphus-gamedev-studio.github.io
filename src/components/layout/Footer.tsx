import { type FC } from "react";
import { ArrowUp } from "lucide-react";
import type { TranslationStructure } from "../../types";
import { BRAND, COLORS, LAYOUT } from "../../config";
import { ErrorBoundary } from "../common/ErrorBoundary";

interface FooterProps {
  t: TranslationStructure["footer"];
  year: number;
}

const Footer: FC<FooterProps> = ({ t, year }) => {
  const copyright = t.copyright.replace("{year}", String(year));

  const footerLinks = [
    { label: t.links.games, href: "#projects" },
    { label: t.links.about, href: "#about" },
    { label: t.links.news, href: "#news" },
    { label: t.links.contact, href: "#contact" },
  ];

  return (
    <ErrorBoundary>
      <footer
        aria-labelledby="footer-heading"
        style={{
          background: "rgba(17, 17, 17, 0.8)",
          backdropFilter: "blur(10px)",
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
          Footer
        </h2>

        <div
          style={{
            maxWidth: LAYOUT.maxWidth,
            margin: "0 auto",
            padding: `32px ${LAYOUT.padding}px 28px`,
          }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
            <a
              href="#home"
              className="state"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                textDecoration: "none",
                padding: "4px 8px",
                borderRadius: "9999px",
                overflow: "hidden",
              }}
            >
              <img
                src="/favicon.png"
                alt="Sisyphus Studio"
                width={24}
                height={24}
                style={{ borderRadius: 6, objectFit: "cover", flexShrink: 0 }}
              />
              <span className="t-brand-lg" style={{ fontSize: 15 }}>
                {BRAND.prefix}
                <span style={{ color: COLORS.orange }}>{BRAND.suffix}</span>
              </span>
            </a>

            <nav aria-label="Footer navigation">
              {footerLinks.map((link) => (
                <a key={link.href} href={link.href} className="footer-nav-link state">
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="flex-row gap-12" style={{ alignItems: "center" }}>
              <p className="t-body-sm" style={{ color: COLORS.text.tertiary }}>
                {copyright}
              </p>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="icon-btn-outlined"
                title={t.backToTop}
                style={{ width: 30, height: 30, flexShrink: 0 }}
              >
                <ArrowUp size={12} />
              </button>
            </div>
          </div>
        </div>
      </footer>
    </ErrorBoundary>
  );
};

export default Footer;
