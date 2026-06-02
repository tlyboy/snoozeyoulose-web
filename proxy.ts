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

  // 中文带前缀，直接放行，由 app/[lang] 以 lang=zh 渲染
  if (pathname === '/zh' || pathname.startsWith('/zh/')) return

  // 优先尊重用户显式选择（语言切换写入的 cookie），否则看浏览器偏好
  const cookie = request.cookies.get(LOCALE_COOKIE)?.value
  const locale = cookie && hasLocale(cookie) ? cookie : preferredLocale(request)

  // 偏好中文 → 跳转到 /zh（/zh 已在上方提前返回，不会死循环）
  if (locale === 'zh') {
    const url = request.nextUrl.clone()
    url.pathname = pathname === '/' ? '/zh' : `/zh${pathname}`
    return NextResponse.redirect(url)
  }

  // 默认英文：rewrite 到内部 /en/...，URL 保持裸路径
  const url = request.nextUrl.clone()
  url.pathname = pathname === '/' ? '/en' : `/en${pathname}`
  return NextResponse.rewrite(url)
}

export const config = {
  // 排除 _next、api、含扩展名的静态资源（logo.png/favicon.ico 等）
  matcher: ['/((?!_next|api|.*\\..*).*)'],
}
