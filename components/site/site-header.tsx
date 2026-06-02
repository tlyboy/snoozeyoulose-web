import Image from 'next/image'
import { ModeToggle } from '@/components/mode-toggle'
import { LanguageToggle } from '@/components/site/language-toggle'
import type { Dictionary } from '@/app/[lang]/dictionaries'
import type { Locale } from '@/lib/i18n'

export function SiteHeader({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const home = lang === 'zh' ? '/zh' : '/'

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href={home} className="flex items-center gap-2 font-semibold">
          <Image
            src="/logo.png"
            alt=""
            width={28}
            height={28}
            className="rounded-md dark:hidden"
          />
          <Image
            src="/logo_white.png"
            alt=""
            width={28}
            height={28}
            className="hidden rounded-md dark:block"
          />
          <span>{dict.hero.title}</span>
        </a>

        <nav className="hidden items-center gap-1 text-sm font-medium text-muted-foreground sm:flex">
          <a
            href="#features"
            className="rounded-md px-3 py-1.5 transition-colors hover:text-foreground"
          >
            {dict.nav.features}
          </a>
          <a
            href="#download"
            className="rounded-md px-3 py-1.5 transition-colors hover:text-foreground"
          >
            {dict.nav.download}
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageToggle lang={lang} label={dict.language.label} />
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
