import { Lato, Noto_Sans } from 'next/font/google';

export const lato = Lato({
  display: 'swap',
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-lato',
});

export const notoSans = Noto_Sans({
  display: 'swap',
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-noto-sans',
});
