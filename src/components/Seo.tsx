import React from 'react';
import { siteData } from '../content/siteData';

interface SeoProps {
  title?: string;
  description?: string;
}

export const Seo: React.FC<SeoProps> = ({ title, description }) => {
  React.useEffect(() => {
    const fullTitle = title ? `${title} — ${siteData.name}` : siteData.seo.title;
    const desc = description ?? siteData.seo.description;

    document.title = fullTitle;

    const setMeta = (selector: string, attr: 'content', value: string) => {
      const el = document.querySelector<HTMLMetaElement>(selector);
      if (el) {
        el.setAttribute(attr, value);
      }
    };

    setMeta('meta[name="description"]', 'content', desc);
    setMeta('meta[property="og:title"]', 'content', fullTitle);
    setMeta('meta[property="og:description"]', 'content', desc);
  }, [title, description]);

  return null;
};

