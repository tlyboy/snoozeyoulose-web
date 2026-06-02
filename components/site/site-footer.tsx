import type { Dictionary } from '@/app/[lang]/dictionaries'

export function SiteFooter({ dict }: { dict: Dictionary }) {
  const year = 2026

  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-center px-4 py-8 text-sm text-muted-foreground sm:px-6">
        <p>
          © {year} {dict.hero.title}. {dict.footer.rights}
        </p>
      </div>
    </footer>
  )
}
