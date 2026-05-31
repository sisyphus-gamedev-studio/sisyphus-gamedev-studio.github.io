import type { FC } from "react";
import { BRAND, IMAGES } from "../../config";

interface BrandLinkProps {
  href: string;
  variant: "nav" | "footer";
  onClick?: () => void;
  className?: string;
}

export const BrandLink: FC<BrandLinkProps> = ({ href, variant, onClick, className = "" }) => (
  <a
    href={href}
    onClick={onClick}
    className={`brand-link brand-link--${variant} state ${variant === "nav" ? "nav-brand-link" : ""} ${className}`.trim()}
  >
    <img
      src={IMAGES.logoNav}
      alt={`${BRAND.prefix} ${BRAND.suffix}`}
      width={variant === "nav" ? 56 : 28}
      height={variant === "nav" ? 56 : 28}
      className={
        variant === "nav"
          ? "nav-brand-logo brand-link__logo"
          : "brand-link__logo brand-link__logo--footer"
      }
    />
    <span className={`t-brand-lg ${variant === "nav" ? "nav-brand-text" : ""} brand-link__text`}>
      {BRAND.prefix}
      <span className="brand-link__suffix">{BRAND.suffix}</span>
    </span>
  </a>
);
