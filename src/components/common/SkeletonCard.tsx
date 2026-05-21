import type { FC } from "react";

interface NewsSkeletonCardProps {
  wide?: boolean;
}

export const NewsSkeletonCard: FC<NewsSkeletonCardProps> = ({ wide = false }) => {
  if (wide) {
    return (
      <div className="skeleton-card skeleton-card--wide">
        <div className="skeleton-shimmer skeleton-card__shimmer" />
      </div>
    );
  }

  return (
    <div className="skeleton-card skeleton-card--list">
      <div className="skeleton-shimmer skeleton-card__line skeleton-card__line--sm" />
      <div className="skeleton-shimmer skeleton-card__line skeleton-card__line--lg" />
      <div className="skeleton-shimmer skeleton-card__line skeleton-card__line--md" />
    </div>
  );
};
