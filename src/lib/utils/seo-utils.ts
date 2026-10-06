import type { MetaTag } from 'next-seo/pages';

export type GetDCTermsTitle = (content: string) => MetaTag;

export const getDCTermsTitle: GetDCTermsTitle = (content) => ({
  name: 'dcterms.title',
  content,
});
