import type { SyntheticEvent } from "react";
import { DESIGN_TOKENS } from "../config/design";

const getImagePath = (path: string): string => `/images/${path}`;

export const getHeroImage = (name: string): string => getImagePath(`hero/${name}.jpg`);

const encodeHexForSvg = (hex: string): string => hex.replace("#", "%23");

const buildPlaceholderSvg = (width: number, height: number, detailed = false): string => {
  const bgColor = encodeHexForSvg(DESIGN_TOKENS.surface.s5);
  if (!detailed) {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><rect width="${width}" height="${height}" fill="${bgColor}"/></svg>`;
  }
  const iconColor = encodeHexForSvg(DESIGN_TOKENS.surface.s3);
  const cx = width / 2;
  const cy = height / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><rect width="${width}" height="${height}" fill="${bgColor}"/><rect x="${cx - 20}" y="${cy - 20}" width="40" height="40" rx="8" fill="none" stroke="${iconColor}" stroke-width="2"/><line x1="${cx - 10}" y1="${cy}" x2="${cx + 10}" y2="${cy}" stroke="${iconColor}" stroke-width="2" stroke-linecap="round"/><line x1="${cx}" y1="${cy - 10}" x2="${cx}" y2="${cy + 10}" stroke="${iconColor}" stroke-width="2" stroke-linecap="round"/></svg>`;
};

const buildPlaceholderDataUrl = (width: number, height: number, detailed = false): string =>
  `data:image/svg+xml;charset=utf-8,${encodeURIComponent(buildPlaceholderSvg(width, height, detailed))}`;

export const handleImageError = (
  e: SyntheticEvent<HTMLImageElement>,
  width = 800,
  height = 600,
) => {
  const target = e.target as HTMLImageElement | null;
  if (!target || target.dataset.fallback) return;
  target.dataset.fallback = "1";
  target.src = buildPlaceholderDataUrl(width, height, true);
};

export const nativeImageFallback = (width = 800, height = 600): string => {
  const dataUrl = buildPlaceholderDataUrl(width, height, false);
  return `if(!this.dataset.fallback){this.dataset.fallback='1';this.src='${dataUrl}';}`;
};
