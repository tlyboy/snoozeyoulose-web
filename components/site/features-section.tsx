import {
  Sprout,
  BookOpen,
  Puzzle,
  Gamepad2,
  type LucideIcon,
} from 'lucide-react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import type { Dictionary } from '@/app/[lang]/dictionaries'

const icons: Record<string, LucideIcon> = {
  farming: Sprout,
  galgame: BookOpen,
  mods: Puzzle,
  gamepad: Gamepad2,
}

export function FeaturesSection({ dict }: { dict: Dictionary['features'] }) {
  const items = Object.entries(dict.items)

  return (
    <section id="features" className="scroll-mt-16 py-20 sm:py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            {dict.title}
          </h2>
          <p className="mt-3 text-pretty text-muted-foreground">
            {dict.subtitle}
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(([key, item]) => {
            const Icon = icons[key] ?? Sprout
            return (
              <Card key={key} className="h-full">
                <CardHeader>
                  <div className="mb-2 flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription className="text-pretty">
                    {item.desc}
                  </CardDescription>
                </CardHeader>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
