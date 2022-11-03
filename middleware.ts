import { NextRequest, NextResponse } from 'next/server'
import { hasCookie } from 'cookies-next'

//regex to check if there's an extension in the path, ie .jpg
const PUBLIC_FILE = /\.(.*)$/

export async function middleware(req: NextRequest) {
  if (
    req.nextUrl.pathname.startsWith('/_next') ||
    req.nextUrl.pathname.includes('/api/') ||
    PUBLIC_FILE.test(req.nextUrl.pathname)
  ) {
    return
  }

  if (req.nextUrl.locale === 'default' && !req.nextUrl.pathname.endsWith('/')) {
    return NextResponse.redirect(new URL(`/en${req.nextUrl.pathname}`, req.url))
  }

  //Redirect for index page as it's meant to be bilingual so we don't want users navigating to /en or /fr
  if (
    (req.nextUrl.locale === 'en' || req.nextUrl.locale === 'fr') &&
    req.nextUrl.pathname === '/'
  ) {
    return NextResponse.redirect(new URL(`/`, req.url))
  }

  if (
    req.cookies.get('agreed-to-email-esrf-terms') !== 'true' &&
    req.nextUrl.pathname === '/email'
  ) {
    return NextResponse.redirect(
      new URL(`/${req.nextUrl.locale}/privacy`, req.url)
    )
  }
}
