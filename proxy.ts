import { NextResponse, type NextRequest } from 'next/server'
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { locales, defaultLocale, hasLocale } from '@/lib/i18n'

const LOCALE_COOKIE = 'NEXT_LOCALE'

function preferredLocale(request: NextRequest): string {
  const negotiator = new Negotiator({
    headers: {
      'accept-language': request.headers.get('accept-language') ?? '',
    },
  })
  try {
    return match(
      negotiator.languages(),
      locales as unknown as string[],
      defaultLocale,
    )
  } catch {
    return defaultLocale
  }
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Chinese paths with a prefix are passed through directly and rendered by app/[lang] with lang=zh
  if (pathname === '/zh' || pathname.startsWith('/zh/')) return

  // First honor the user's explicit choice (the cookie set by the language switcher); otherwise, check the browser preference
  const cookie = request.cookies.get(LOCALE_COOKIE)?.value
  const locale = cookie && hasLocale(cookie) ? cookie : preferredLocale(request)

  // If Chinese is preferred, redirect to /zh (/zh returns early above, so there is no redirect loop)
  if (locale === 'zh') {
    const url = request.nextUrl.clone()
    url.pathname = pathname === '/' ? '/zh' : `/zh${pathname}`
    return NextResponse.redirect(url)
  }

  // Default to English: rewrite to internal /en/... while keeping the URL path prefix-free
  const url = request.nextUrl.clone()
  url.pathname = pathname === '/' ? '/en' : `/en${pathname}`
  return NextResponse.rewrite(url)
}

export const config = {
  // Exclude _next, api, and static assets with extensions (logo.png/favicon.ico, etc.)
  matcher: ['/((?!_next|api|.*\\..*).*)'],
}
