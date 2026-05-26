import type { FC, ReactNode } from "react";
import { Globe, Github, Youtube } from "lucide-react";
import type { PartnerLink } from "../../config/partners";
import type { TranslationStructure } from "../../types";
import { SOCIAL_ICONS } from "../../config/links";

type LinkKey = keyof PartnerLink;
type LinkLabels = TranslationStructure["partners"]["linkLabels"];

interface TeamProjectLinksProps {
  links: PartnerLink;
  projectName: string;
  labels: LinkLabels;
}

const isValidHref = (href?: string): href is string => Boolean(href && href !== "#");

const LINK_ORDER: LinkKey[] = [
  "website",
  "artstation",
  "youtube",
  "vk",
  "steam",
  "github",
  "twitter",
];

const VkIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.391 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.862-.525-2.049-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.271.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.049.17.49-.085.744-.576.744z" />
  </svg>
);

const ArtStationIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M0 17.723l2.027 3.505h.001l2.028-3.505h3.783L5.838 24 0 17.723zm24 .001L21.973 21.23h-.001l-2.028-3.505h-3.783L18.162 24 24 17.724zM12 0L5.838 6.277H9.62l2.38-4.12 2.38 4.12h3.782L12 0zm0 13.62L5.838 19.897h7.676L18.162 13.62H12z" />
  </svg>
);

const TwitterIcon = () => (
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
);

const LINK_ICONS: Record<LinkKey, ReactNode> = {
  website: <Globe size={11} aria-hidden="true" />,
  artstation: <ArtStationIcon />,
  youtube: <Youtube size={11} aria-hidden="true" />,
  vk: <VkIcon />,
  steam: <span dangerouslySetInnerHTML={{ __html: SOCIAL_ICONS.steamSm }} aria-hidden="true" />,
  github: <Github size={11} aria-hidden="true" />,
  twitter: <TwitterIcon />,
};

const TeamProjectLinks: FC<TeamProjectLinksProps> = ({ links, projectName, labels }) => {
  const items = LINK_ORDER.flatMap((key) => {
    const href = links[key];
    if (!isValidHref(href)) return [];
    return { key, href, label: labels[key], icon: LINK_ICONS[key] };
  });

  if (!items.length) return null;

  return (
    <div className="team-flip-links">
      {items.map(({ key, href, label, icon }) => (
        <a
          key={`${key}-${href}`}
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
