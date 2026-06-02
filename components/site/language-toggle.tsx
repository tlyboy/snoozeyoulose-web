'use client'

import { useRouter } from 'next/navigation'
import { Languages } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Locale } from '@/lib/i18n'

const ONE_YEAR = 60 * 60 * 24 * 365

export function LanguageToggle({
  lang,
  label,
}: {
  lang: Locale
  label: string
}) {
  const router = useRouter()

  function toggle() {
    const next: Locale = lang === 'zh' ? 'en' : 'zh'
    document.cookie = `NEXT_LOCALE=${next};path=/;max-age=${ONE_YEAR};samesite=lax`
    router.push(next === 'zh' ? '/zh' : '/')
    router.refresh()
  }

  return (
    <Button
      variant="secondary"
      size="icon"
      className="size-8"
      title={label}
      aria-label={label}
      onClick={toggle}
    >
      <Languages className="size-4.5" />
    </Button>
  )
}
