import { type FC } from "react";
import { ArrowUp } from "lucide-react";
import type { Language, TranslationStructure } from "../../types";
import { SOCIAL_LINKS, buildNavLinks, isMailtoLink } from "../../config";
import { ErrorBoundary } from "../common/ErrorBoundary";
import { BrandLink } from "./BrandLink";

interface FooterProps {
  t: TranslationStructure["footer"];
  nav: TranslationStructure["nav"];
  year: number;
  lang: Language;
}

const Footer: FC<FooterProps> = ({ t, nav, year, lang }) => {
  const copyright = t.copyright.replace("{year}", String(year));
  const base = `/${lang}/`;
  const footerLinks = buildNavLinks(nav, base);

  return (
    <ErrorBoundary>
      <footer aria-labelledby="footer-heading" className="footer-shell">
        <h2 id="footer-heading" className="sr-only">
          {t.sectionLabel}
        </h2>

        <div className="footer-inner">
          <div className="footer-top-row">
            <BrandLink href={`${base}#home`} variant="footer" />

            <nav aria-label="Footer navigation" className="footer-nav">
              {footerLinks.map((link) => (
                <a key={link.href} href={link.href} className="footer-nav-link state">
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="footer-actions">
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

              <div className="footer-divider" aria-hidden="true" />

              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="icon-btn-outlined footer-back-to-top"
                title={t.backToTop}
              >
                <ArrowUp size={13} />
              </button>
            </div>
          </div>

          <div className="footer-bottom-row">
            <p className="t-body-sm footer-copyright">{copyright}</p>
          </div>
        </div>
      </footer>
    </ErrorBoundary>
  );
};

export default Footer;
