import type { Metadata } from 'next'
import { Inter, Fira_Code } from 'next/font/google'
import { notFound } from 'next/navigation'
import '../globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { SiteFooter } from '@/components/site/site-footer'
import { getDictionary } from './dictionaries'
import { locales, hasLocale, type Locale } from '@/lib/i18n'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans-latin',
  display: 'swap',
})

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({
  params,
}: LayoutProps<'/[lang]'>): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}

  const dict = await getDictionary(lang)
  return {
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: lang === 'zh' ? '/zh' : '/',
      languages: {
        en: '/',
        zh: '/zh',
      },
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<'/[lang]'>) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  const dict = await getDictionary(lang as Locale)

  return (
    <html
      lang={lang}
      suppressHydrationWarning
      className={`${inter.variable} ${firaCode.variable} font-sans antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-1 flex-col">{children}</div>
          <SiteFooter dict={dict} />
        </ThemeProvider>
      </body>
    </html>
  )
}
