import { notFound } from 'next/navigation'
import { SiteHeader } from '@/components/site/site-header'
import { Hero } from '@/components/site/hero'
import { FeaturesSection } from '@/components/site/features-section'
import { DownloadSection } from '@/components/site/download-section'
import { getDictionary } from './dictionaries'
import { hasLocale } from '@/lib/i18n'

export default async function Home({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  const dict = await getDictionary(lang)

  return (
    <>
      <SiteHeader dict={dict} lang={lang} />
      <main className="flex-1">
        <Hero dict={dict} />
        <FeaturesSection dict={dict.features} />
        <DownloadSection dict={dict.download} />
      </main>
    </>
  )
}
