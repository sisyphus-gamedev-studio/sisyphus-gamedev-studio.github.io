import { useState, useEffect, useRef, useCallback, type FC } from "react";
import type { Project, TranslationStructure } from "../../../types";
import { PROJECTS_EXPAND_MS, PROJECTS_CONTENT_REVEAL_RATIO, LAYOUT, SIZES } from "../../../config";
import { useReducedMotion } from "../../../hooks/useReducedMotion";
import { ErrorBoundary } from "../../common/ErrorBoundary";
import MobileCarousel from "./MobileCarousel";
import DesktopCarousel from "./DesktopCarousel";

interface ProjectsCarouselProps {
  projects: Project[];
  t: TranslationStructure["projects"];
}

const ProjectsCarousel: FC<ProjectsCarouselProps> = ({ projects, t }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayedIndex, setDisplayedIndex] = useState(0);
  const [textVisible, setTextVisible] = useState(true);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resizeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    setIsMobile(window.innerWidth < LAYOUT.mobileBreakpoint);
  }, []);

  const handleClick = useCallback(
    (i: number) => {
      if (i === activeIndex) return;
      setActiveIndex(i);
      if (timerRef.current) clearTimeout(timerRef.current);

      if (reducedMotion) {
        setDisplayedIndex(i);
        return;
      }

      setTextVisible(false);
      const revealDelay = PROJECTS_EXPAND_MS * PROJECTS_CONTENT_REVEAL_RATIO;
      timerRef.current = setTimeout(() => {
        setDisplayedIndex(i);
        setTextVisible(true);
      }, revealDelay);
    },
    [activeIndex, reducedMotion],
  );

  useEffect(() => {
    const check = () => {
      if (resizeTimerRef.current) clearTimeout(resizeTimerRef.current);
      resizeTimerRef.current = setTimeout(() => {
        setIsMobile(window.innerWidth < LAYOUT.mobileBreakpoint);
      }, 100);
    };
    window.addEventListener("resize", check, { passive: true });
    return () => {
      window.removeEventListener("resize", check);
      if (resizeTimerRef.current) clearTimeout(resizeTimerRef.current);
    };
  }, []);

  useEffect(() => {
    setActiveIndex(0);
    setDisplayedIndex(0);
    setTextVisible(true);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, [isMobile]);

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (resizeTimerRef.current) clearTimeout(resizeTimerRef.current);
    },
    [],
  );

  if (isMobile === null)
    return <section id="projects" style={{ minHeight: SIZES.projects.skeletonMinHeight }} />;

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
            textVisible={textVisible}
            onSelect={handleClick}
            t={t}
          />
        )}
      </ErrorBoundary>
    </section>
  );
};

export default ProjectsCarousel;
