import type { FC } from "react";
import { Globe, Github } from "lucide-react";
import type { PartnerLink } from "../../config/partners";
import type { TranslationStructure } from "../../types";
import { SOCIAL_ICONS } from "../../config/links";

type LinkLabels = TranslationStructure["partners"]["linkLabels"];

interface TeamProjectLinksProps {
  links: PartnerLink;
  projectName: string;
  labels: LinkLabels;
}

const isValidHref = (href?: string): href is string => Boolean(href && href !== "#");

const TeamProjectLinks: FC<TeamProjectLinksProps> = ({ links, projectName, labels }) => {
  const items: Array<{ href: string; label: string; icon: React.ReactNode }> = [];

  if (isValidHref(links.website)) {
    items.push({
      href: links.website,
      label: labels.website,
      icon: <Globe size={11} aria-hidden="true" />,
    });
  }
  if (isValidHref(links.steam)) {
    items.push({
      href: links.steam,
      label: labels.steam,
      icon: <span dangerouslySetInnerHTML={{ __html: SOCIAL_ICONS.steamSm }} aria-hidden="true" />,
    });
  }
  if (isValidHref(links.github)) {
    items.push({
      href: links.github,
      label: labels.github,
      icon: <Github size={11} aria-hidden="true" />,
    });
  }
  if (isValidHref(links.twitter)) {
    items.push({
      href: links.twitter,
      label: labels.twitter,
      icon: (
        <svg
          width="11"
          height="11"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
        </svg>
      ),
    });
  }

  if (!items.length) return null;

  return (
    <div className="team-flip-links">
      {items.map(({ href, label, icon }) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outlined team-flip-link"
          aria-label={`${projectName} — ${label}`}
        >
          {icon}
          {label}
        </a>
      ))}
    </div>
  );
};

export default TeamProjectLinks;
