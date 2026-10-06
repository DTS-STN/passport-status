import Head from 'next/head';
import type { NextSeoProps } from 'next-seo/pages';
import { generateNextSeo } from 'next-seo/pages';

const NextSeo = (props: NextSeoProps) => <Head>{generateNextSeo(props)}</Head>;

export default NextSeo;
