import { ArrowDown, ArrowRight, Github, Linkedin, Mail, MousePointer2 } from "lucide-react"
import ParticleName from "@/components/particle-name"
import { site } from "@/lib/site"

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pb-16 pt-24">
      <div
        aria-hidden
        className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/20 blur-[120px]"
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
        <a
          href={site.companyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="animate-rise mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur transition-colors hover:text-foreground sm:text-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          Currently {site.role} at <span className="font-medium text-foreground">{site.company}</span>
        </a>

        <ParticleName />
        <p className="animate-rise mt-1 flex items-center justify-center gap-1.5 font-mono sm:-mt-4 lg:-mt-8 text-[11px] text-muted-foreground [animation-delay:1200ms]">
          <MousePointer2 className="hidden h-3 w-3 sm:block" />
          <span className="hidden sm:inline">hover over my name ↑</span>
          <span className="sm:hidden">drag a finger over my name ↑</span>
        </p>

        <div className="mx-auto mt-4 max-w-2xl text-center">
          <h1 className="animate-rise font-display text-3xl font-bold tracking-tight [animation-delay:150ms] sm:text-5xl">
            Anshuman Pathak
            <span className="mt-2 block text-lg font-medium text-muted-foreground sm:text-2xl">
              Software Engineer, <span className="text-gradient">@{site.handle}</span>
            </span>
          </h1>
          <p className="animate-rise mt-5 text-base leading-relaxed text-muted-foreground [animation-delay:300ms] sm:text-lg">
            I build fast, playful and accessible interfaces for the web. Right now I&apos;m at {site.company}, crafting
            tools that help photographers spend less time editing and more time shooting.
          </p>

          <div className="animate-rise mt-8 flex flex-col items-center justify-center gap-3 [animation-delay:450ms] sm:flex-row">
            <a
              href="#experience"
              className="group inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-transform hover:scale-[1.03] sm:w-auto"
            >
              See my journey
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <div className="flex gap-2">
              {[
                { href: site.social.github, label: "GitHub", Icon: Github },
                { href: site.social.linkedin, label: "LinkedIn", Icon: Linkedin },
                { href: `mailto:${site.email}`, label: "Email", Icon: Mail },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer me"
                  aria-label={label}
                  className="grid h-11 w-11 place-items-center rounded-full border border-border bg-card/60 text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-brand hover:text-brand"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to About"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowDown className="h-5 w-5 animate-bounce" />
      </a>
    </section>
  )
}
