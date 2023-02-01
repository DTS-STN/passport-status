import { NextRequest, NextResponse } from 'next/server'

import { getLogger } from './logging/log-util'

//regex to check if there's an extension in the path, ie .jpg
const PUBLIC_FILE = /\.(.*)$/
const logger = getLogger('middleware')

export async function middleware(req: NextRequest) {
  if (
    req.nextUrl.pathname.startsWith('/_next') ||
    req.nextUrl.pathname.includes('/api/') ||
    PUBLIC_FILE.test(req.nextUrl.pathname)
  ) {
    return
  }
  logger.debug(req)

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
    !['/', '/expectations'].includes(req.nextUrl.pathname) &&
    req.cookies.get('agreed-to-email-esrf-terms') !== 'true'
  ) {
    return NextResponse.redirect(
      new URL(`/${req.nextUrl.locale}/expectations`, req.url)
    )
  }
}
