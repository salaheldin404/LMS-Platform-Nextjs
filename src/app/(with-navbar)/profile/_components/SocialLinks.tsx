import {
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
  FaFacebookF,
} from "react-icons/fa";

import type { SocialMediaLinks } from "@/types/user";


const SocialLinks = ({ socialLinks }: { socialLinks?: SocialMediaLinks }) => {
  const socialLinksData = [
    {
      key: "facebook",
      label: "Facebook",
      url: socialLinks?.facebook,
      icon: FaFacebookF,
    },
    {
      key: "github",
      label: "Github",
      url: socialLinks?.github,
      icon: FaGithub,
    },
    {
      key: "instagram",
      label: "Instagram",
      url: socialLinks?.instagram,
      icon: FaLinkedinIn,
    },
    {
      key: "linkedin",
      label: "Linkedin",
      url: socialLinks?.linkedin,
      icon: FaInstagram,
    },
  ];

  return (
    <ul className="flex items-center gap-3">
      {socialLinksData
        .filter((link) => link.url)
        .map(({ key, url, icon: Icon, label }) => (
          <li
            key={key}
            className="p-3 md:text-lg lg:text-2xl bg-muted text-gray-600 dark:text-white"
          >
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
            >
              <Icon />
            </a>
          </li>
        ))}
    </ul>
  );
};

export default SocialLinks;
