import Image from 'next/image'
import { ArrowDown, Sparkles } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Dictionary } from '@/app/[lang]/dictionaries'
import { gameVersion } from '@/lib/download'

export function Hero({ dict }: { dict: Dictionary }) {
  return (
    <section className="relative overflow-hidden">
      {/* 背景光晕 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,oklch(0.93_0.05_145/0.5),transparent_70%)] dark:bg-[radial-gradient(60%_50%_at_50%_0%,oklch(0.4_0.06_145/0.35),transparent_70%)]"
      />

      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-8 px-4 py-20 text-center sm:px-6 sm:py-28">
        <Image
          src="/logo.png"
          alt={dict.hero.title}
          width={128}
          height={128}
          priority
          className="size-28 rounded-3xl shadow-xl ring-1 ring-foreground/10 sm:size-32 dark:hidden"
        />
        <Image
          src="/logo_white.png"
          alt={dict.hero.title}
          width={128}
          height={128}
          priority
          className="hidden size-28 rounded-3xl shadow-xl ring-1 ring-foreground/10 sm:size-32 dark:block"
        />

        <Badge variant="secondary" className="gap-1.5">
          <Sparkles className="size-3" />
          {dict.hero.tagline}
        </Badge>

        <div className="flex flex-col items-center gap-4">
          <h1 className="font-heading text-4xl font-bold tracking-tight text-balance sm:text-6xl">
            {dict.hero.title}
          </h1>
          <p className="max-w-2xl text-base text-pretty text-muted-foreground sm:text-lg">
            {dict.hero.subtitle}
          </p>
        </div>

        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <Button size="lg" className="h-11 px-6 text-base" asChild>
            <a href="#download">
              <ArrowDown className="size-4.5" />
              {dict.hero.ctaDownload}
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-11 px-6 text-base"
            asChild
          >
            <a href="#features">{dict.hero.ctaFeatures}</a>
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">
          {dict.hero.versionLabel} {gameVersion}
        </p>
      </div>
    </section>
  )
}
