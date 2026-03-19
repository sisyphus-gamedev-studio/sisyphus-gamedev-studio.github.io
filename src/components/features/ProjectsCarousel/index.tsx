import { useState, useEffect, useRef, useCallback, type FC } from "react";
import type { Project, TranslationStructure } from "../../../types";
import { PROJECTS_EXPAND_MS, PROJECTS_CONTENT_REVEAL_RATIO, SPACING } from "../../../config";
import { useReducedMotion } from "../../../hooks/useReducedMotion";
import { ErrorBoundary } from "../../common/ErrorBoundary";
import MobileCarousel from "./MobileCarousel";
import DesktopCarousel from "./DesktopCarousel";
import { COLORS } from "../../../config";

interface ProjectsCarouselProps {
  projects: Project[];
  t: TranslationStructure["projects"];
}

const ProjectsCarousel: FC<ProjectsCarouselProps> = ({ projects, t }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayedIndex, setDisplayedIndex] = useState(0);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reducedMotion = useReducedMotion();

  const handleClick = useCallback(
    (i: number) => {
      if (i === activeIndex) return;
      setActiveIndex(i);
      if (timerRef.current) clearTimeout(timerRef.current);
      const delay = reducedMotion ? 0 : PROJECTS_EXPAND_MS * PROJECTS_CONTENT_REVEAL_RATIO;
      timerRef.current = setTimeout(() => setDisplayedIndex(i), delay);
    },
    [activeIndex, reducedMotion],
  );

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (isMobile !== null) {
      setActiveIndex(0);
      setDisplayedIndex(0);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    }
  }, [isMobile]);

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    [],
  );

  if (isMobile === null) {
    return (
      <section id="projects" aria-label={t.heading}>
        <div
          style={{
            background: COLORS.surface.s2,
            padding: SPACING.sectionPadding,
            minHeight: 720,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              border: `2px solid ${COLORS.orangeBorder}`,
              borderTopColor: reducedMotion ? "transparent" : COLORS.orange,
              animation: reducedMotion ? "none" : "spin 0.8s linear infinite",
            }}
          />
        </div>
      </section>
    );
  }

  return (
    <section id="projects">
      <ErrorBoundary>
        {isMobile ? (
          <MobileCarousel
            key="mobile"
            projects={projects}
            activeIndex={activeIndex}
            onSelect={handleClick}
            t={t}
          />
        ) : (
          <DesktopCarousel
            key="desktop"
            projects={projects}
            activeIndex={activeIndex}
            displayedIndex={displayedIndex}
            onSelect={handleClick}
            t={t}
          />
        )}
      </ErrorBoundary>
    </section>
  );
};

export default ProjectsCarousel;
