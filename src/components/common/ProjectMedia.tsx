import { useEffect, useRef, type FC, type SyntheticEvent } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

interface ProjectMediaProps {
  video?: string;
  poster: string;
  alt: string;
  isActive: boolean;
  loading?: "eager" | "lazy";
  onImageError?: (e: SyntheticEvent<HTMLImageElement>) => void;
}

const ProjectMedia: FC<ProjectMediaProps> = ({
  video,
  poster,
  alt,
  isActive,
  loading = "lazy",
  onImageError,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = useReducedMotion();
  const showVideo = Boolean(video) && isActive && !reducedMotion;

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    if (showVideo) {
      el.currentTime = 0;
      void el.play().catch(() => {});
    } else {
      el.pause();
    }
  }, [showVideo, video]);

  if (!showVideo) {
    return (
      <img
        src={poster}
        alt={alt}
        loading={loading}
        decoding="async"
        className="project-media-fit"
        onError={onImageError}
      />
    );
  }

  return (
    <video
      ref={videoRef}
      src={video}
      poster={poster}
      muted
      loop
      playsInline
      preload="auto"
      aria-label={alt}
      className="project-media-fit"
    />
  );
};

export default ProjectMedia;
