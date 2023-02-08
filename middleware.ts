import { NextRequest, NextResponse } from 'next/server'

import { getLogger } from './logging/log-util'

const logger = getLogger('middleware')

//regex to check if there's an extension in the path, ie .jpg
const PUBLIC_FILE = /\.(.*)$/

export async function middleware(req: NextRequest) {
  const { cookies, nextUrl, url } = req
  const { locale, pathname } = nextUrl

  if (PUBLIC_FILE.test(pathname)) {
    return NextResponse.next()
  }

  logger.debug(req)

  if (locale === 'default' && !pathname.endsWith('/')) {
    return NextResponse.redirect(new URL(`/en${pathname}`, url))
  }

  //Redirect for index page as it's meant to be bilingual so we don't want users navigating to /en or /fr
  if ((locale === 'en' || locale === 'fr') && pathname === '/') {
    return NextResponse.redirect(new URL(`/`, url))
  }

  if (
    !['/', '/expectations'].includes(pathname) &&
    cookies.get('agreed-to-email-esrf-terms') !== 'true'
  ) {
    return NextResponse.redirect(new URL(`/${locale}/expectations`, url))
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
