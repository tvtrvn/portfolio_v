import React from 'react';
import {
  MapPin,
  GraduationCap,
  Briefcase,
  GlobeHemisphereWest,
  Plus,
  Quotes,
  Heart,
  Mountains,
  Barbell,
  ForkKnife,
  Books,
  Code,
  Stack,
  Toolbox,
} from '@phosphor-icons/react';
import { PageTransition } from '../components/PageTransition';
import { SectionHeader } from '../components/SectionHeader';
import { Reveal, StaggerGroup, StaggerItem } from '../components/visual/Reveal';
import { SpotlightCard } from '../components/visual/SpotlightCard';
import { Button } from '../components/Button';
import { siteData } from '../content/siteData';
import { cn } from '../utils/cn';

const STATS = [
  { value: '9', label: 'Production-shape projects shipped' },
  { value: '76', label: 'Backend tests passing' },
  { value: '3', label: 'Languages spoken' },
  { value: '2027', label: 'Expected B.A. graduation' },
] as const;

const OFF_KEYBOARD_CHIPS = [
  { icon: Heart, label: 'Raptors' },
  { icon: Mountains, label: 'Rock climbing' },
  { icon: Barbell, label: 'Weightlifting' },
  { icon: ForkKnife, label: 'Cooking' },
  { icon: Books, label: 'Reading' },
] as const;

export const AboutPage: React.FC = () => {
  const [lede, ...aboutRest] = siteData.about.paragraphs;
  const ledeFirst = lede.charAt(0);
  const ledeBody = lede.slice(1);

  return (
    <PageTransition>
      <div className="container-page space-y-32 pb-24">
        {/* 00 · Hero */}
        <section className="grid gap-8">
          <SectionHeader
            number="00"
            eyebrow="ABOUT"
            title="A third-year CS student building production software."
            description={
              <span
                style={{ textWrap: 'pretty' as React.CSSProperties['textWrap'] }}
              >
                {siteData.heroIntro}
              </span>
            }
            size="lg"
          />
        </section>

        {/* Editorial profile */}
        <section className="grid gap-8 lg:grid lg:grid-cols-[1.2fr_0.8fr] lg:items-start lg:gap-12">
          <div className="space-y-6">
            <p
              className="font-display text-xl font-light leading-relaxed text-fg first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-display first-letter:text-7xl first-letter:font-light first-letter:leading-[0.85] first-letter:text-accent"
              style={{ textWrap: 'pretty' as React.CSSProperties['textWrap'] }}
            >
              {ledeFirst}
              {ledeBody}
            </p>
            {aboutRest.map((p, i) => (
              <p
                key={i}
                className="text-[16px] leading-relaxed text-muted"
                style={{ textWrap: 'pretty' as React.CSSProperties['textWrap'] }}
              >
                {p}
              </p>
            ))}
          </div>

          <div className="lg:sticky lg:top-28 lg:self-start">
            <SpotlightCard className="h-full" coreClassName="p-6 sm:p-8">
              <div className="space-y-8">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted tabular">Location</p>
                  <p className="mt-1.5 flex items-start gap-2.5 text-[15px] text-fg">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" weight="duotone" aria-hidden />
                    <span>{siteData.location}</span>
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted tabular">School</p>
                  <p className="mt-1.5 flex items-start gap-2.5 text-[15px] text-fg">
                    <GraduationCap className="mt-0.5 h-5 w-5 shrink-0 text-accent" weight="duotone" aria-hidden />
                    <span>York University</span>
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted tabular">Availability</p>
                  <p className="mt-1.5 flex items-start gap-2.5 text-[15px] text-fg">
                    <Briefcase className="mt-0.5 h-5 w-5 shrink-0 text-accent" weight="duotone" aria-hidden />
                    <span>Open to Fall 2026 co-op</span>
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted tabular">Languages</p>
                  <p className="mt-1.5 flex items-start gap-2.5 text-[15px] text-fg">
                    <GlobeHemisphereWest className="mt-0.5 h-5 w-5 shrink-0 text-accent" weight="duotone" aria-hidden />
                    <span>English native · French fluent · Vietnamese advanced</span>
                  </p>
                </div>
              </div>
            </SpotlightCard>
          </div>
        </section>

        {/* Stats */}
        <section className="-mx-4 space-y-8 px-4 sm:mx-0 sm:px-0">
          <p className="font-mono text-[10.5px] tracking-[0.3em] text-muted tabular">03 · BY THE NUMBERS</p>
          <div className="overflow-x-auto sm:overflow-visible">
            <StaggerGroup className="grid w-full min-w-0 grid-cols-2 gap-y-10 lg:grid-cols-4">
              {STATS.map((stat, i) => (
                <StaggerItem
                  key={stat.label}
                  className={cn(
                    'pl-6 sm:pl-8',
                    i % 2 === 1 && 'border-l border-line',
                    i !== 0 && 'lg:border-l lg:border-line'
                  )}
                >
                  <Reveal delay={i * 0.06}>
                    <div className="flex flex-col gap-3">
                      <span className="font-display text-6xl font-light tabular text-fg">{stat.value}</span>
                      <span className="max-w-[12rem] font-mono text-[10.5px] uppercase leading-snug tracking-[0.18em] text-muted">
                        {stat.label}
                      </span>
                    </div>
                  </Reveal>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </section>

        {/* Timeline */}
        <section className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <header className="max-w-md lg:sticky lg:top-28 lg:self-start">
            <p className="font-mono text-[10.5px] tracking-[0.3em] text-muted tabular">01 — Timeline</p>
            <p className="eyebrow mt-3 text-muted">Experience</p>
            <h2
              className="mt-4 font-display text-4xl font-light tracking-tightest text-fg sm:text-5xl"
              style={{ textWrap: 'balance' as React.CSSProperties['textWrap'] }}
            >
              Where I&apos;ve been
            </h2>
          </header>

          <div className="relative border-l border-line pl-8">
            <StaggerGroup className="space-y-8">
              {siteData.experience.map((item, index) => (
                <StaggerItem key={item.id} className="relative">
                  <span
                    className="absolute -left-[5px] top-6 h-2.5 w-2.5 -translate-x-1/2 rounded-full border border-line bg-accent"
                    aria-hidden
                  />
                  <SpotlightCard className="group" coreClassName="p-6 sm:p-7">
                    <Plus
                      className="pointer-events-none absolute right-5 top-5 h-5 w-5 text-muted transition-transform duration-500 ease-premium group-hover:rotate-45"
                      weight="bold"
                      aria-hidden
                    />
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted tabular">
                      {item.start} → {item.end}
                    </p>
                    <h3 className="mt-3 font-display text-xl font-light tracking-tighter2 text-fg sm:text-2xl">
                      {item.role}
                      <span className="mt-1 block text-base text-muted">{item.company}</span>
                    </h3>
                    <p
                      className="mt-4 text-[14.5px] leading-relaxed text-muted"
                      style={{ textWrap: 'pretty' as React.CSSProperties['textWrap'] }}
                    >
                      {item.description}
                    </p>
                  </SpotlightCard>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </section>

        {/* Skills */}
        <section className="space-y-10">
          <SectionHeader
            number="02"
            eyebrow="WHAT I REACH FOR"
            title="A working toolkit."
            description={
              <span style={{ textWrap: 'pretty' as React.CSSProperties['textWrap'] }}>
                Languages, frameworks, and tools I reach for when the problem calls for speed, rigor, or both.
              </span>
            }
            size="sm"
          />

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <SpotlightCard coreClassName="p-0">
              <div className="border-b border-line px-6 py-5 sm:px-7">
                <div className="flex items-center gap-3">
                  <Code className="h-5 w-5 text-accent" weight="duotone" aria-hidden />
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted tabular">
                    01 · Languages
                  </span>
                </div>
              </div>
              <ul className="divide-y divide-line px-6 sm:px-7">
                {siteData.skills.languages.map((lang) => (
                  <li key={lang} className="flex items-center justify-between gap-4 py-2.5 text-[15px] text-fg">
                    <span>{lang}</span>
                    <span className="font-mono text-muted tabular">·</span>
                  </li>
                ))}
              </ul>
            </SpotlightCard>

            <SpotlightCard coreClassName="p-0">
              <div className="border-b border-line px-6 py-5 sm:px-7">
                <div className="flex items-center gap-3">
                  <Stack className="h-5 w-5 text-accent" weight="duotone" aria-hidden />
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted tabular">
                    02 · Frameworks
                  </span>
                </div>
              </div>
              <ul className="divide-y divide-line px-6 sm:px-7">
                {siteData.skills.frameworks.map((fw) => (
                  <li key={fw} className="flex items-center justify-between gap-4 py-2.5 text-[15px] text-fg">
                    <span>{fw}</span>
                    <span className="font-mono text-muted tabular">·</span>
                  </li>
                ))}
              </ul>
            </SpotlightCard>

            <SpotlightCard className="md:col-span-2 lg:col-span-1" coreClassName="p-0">
              <div className="border-b border-line px-6 py-5 sm:px-7">
                <div className="flex items-center gap-3">
                  <Toolbox className="h-5 w-5 text-accent" weight="duotone" aria-hidden />
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted tabular">
                    03 · Tools
                  </span>
                </div>
              </div>
              <ul className="divide-y divide-line px-6 sm:px-7">
                {siteData.skills.tools.map((tool) => (
                  <li key={tool} className="flex items-center justify-between gap-4 py-2.5 text-[15px] text-fg">
                    <span>{tool}</span>
                    <span className="font-mono text-muted tabular">·</span>
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </div>
        </section>

        {/* Personal */}
        <section className="relative space-y-8">
          <p className="font-mono text-[10.5px] tracking-[0.3em] text-muted tabular">04 · OFF THE KEYBOARD</p>
          <div className="relative">
            <Quotes
              className="pointer-events-none absolute -left-1 -top-2 h-16 w-16 text-accent/30 sm:left-0"
              weight="fill"
              aria-hidden
            />
            <blockquote
              className="relative z-[1] pl-10 font-display text-[clamp(28px,4vw,52px)] font-light italic leading-[1.1] tracking-tighter2 text-fg sm:pl-14"
              style={{ textWrap: 'balance' as React.CSSProperties['textWrap'] }}
            >
              I help run my family&apos;s Vietnamese restaurant, lift, climb, and watch every single Raptors game.
            </blockquote>
            <div className="relative z-[1] mt-10 flex flex-wrap gap-2 pl-10 sm:pl-14">
              {OFF_KEYBOARD_CHIPS.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-elev px-3 py-1.5 text-[13px] text-muted"
                >
                  <Icon className="h-4 w-4 shrink-0 text-accent" weight="duotone" aria-hidden />
                  <span>{label}</span>
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <Reveal as="section" className="space-y-6">
          <p className="font-mono text-[10.5px] tracking-[0.3em] text-muted tabular">05 · NEXT</p>
          <div className="grid gap-10 lg:grid-cols-[1.15fr_minmax(0,auto)] lg:items-end lg:gap-16">
            <h2
              className="max-w-xl font-display text-4xl font-light tracking-tightest text-fg sm:text-5xl lg:text-6xl"
              style={{ textWrap: 'balance' as React.CSSProperties['textWrap'] }}
            >
              Two paragraphs of context. Hours of working software.
            </h2>
            <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
              <Button to="/projects" size="lg" withArrow>
                See the work
              </Button>
              <Button to="/contact" variant="outline" size="lg" withArrow>
                Say hello
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </PageTransition>
  );
};
