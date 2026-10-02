import { NextSeoProps, generateNextSeo } from 'next-seo/pages';
import Head from 'next/head';

const NextSeo = (props: NextSeoProps) => <Head>{generateNextSeo(props)}</Head>;

export default NextSeo;
