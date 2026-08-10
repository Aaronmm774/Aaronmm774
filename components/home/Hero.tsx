'use client';

import Link from 'next/link';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

export type HeroSlide = {
  image: string;
  label: string;
  title: string;
  note: string;
};

const fallbackSlides: HeroSlide[] = [
  {
    image: '/projects/Jubilee Isurance.jpg',
    label: 'Commercial',
    title: 'Jubilee Insurance HQ',
    note: 'Commercial headquarters project in Nairobi, Kenya.',
  },
  {
    image: '/projects/Ritz Carlton.jpeg',
    label: 'Hospitality',
    title: 'Ritz Carlton Maasai Mara Safari',
    note: 'Luxury hospitality project set within the Maasai Mara.',
  },
  {
    image: '/projects/Crescent Pearl.JPG',
    label: 'Apartments',
    title: 'Crescent Pearl',
    note: 'Residential apartment development in Westlands, Nairobi.',
  },
];

type HeroProps = {
  slides?: HeroSlide[];
};

const stats = [
  { value: '12+', label: 'Years of practice' },
  { value: '200+', label: 'Projects delivered' },
  { value: '80+', label: 'Partner companies' },
];

export function Hero({ slides: providedSlides }: HeroProps) {
  const slides = providedSlides && providedSlides.length > 0 ? providedSlides : fallbackSlides;
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), []);
  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + slides.length) % slides.length),
    [],
  );
  const goTo = useCallback((i: number) => setCurrent(i), []);

  useEffect(() => {
    const id = setInterval(next, 5500);
    return () => clearInterval(id);
  }, [next]);

  useEffect(() => {
    slides.forEach((slide) => {
      const image = new window.Image();
      image.src = slide.image;
    });
  }, []);

  return (
    <section className="relative w-full">
      <div className="relative min-h-[560px] w-full overflow-hidden bg-slate-100 sm:min-h-[560px] lg:min-h-[620px]">
        {slides.map((slide, index) => (
          <img
            key={slide.image}
            src={slide.image}
            alt={slide.label}
            loading="eager"
            decoding="async"
            className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${
              index === current ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}

        <div className="absolute left-4 top-4 hidden max-w-[calc(100%-8rem)] truncate rounded-full bg-white/92 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.2em] text-slate-950 shadow-lg shadow-slate-950/10 backdrop-blur sm:left-6 sm:top-6 sm:block sm:max-w-none">
          {slides[current]?.label}
        </div>

        <div className="absolute inset-x-4 top-1/2 hidden -translate-y-1/2 text-center text-white sm:inset-x-8 sm:block">
          <h1 className="mx-auto max-w-5xl text-3xl font-extrabold leading-[1.05] tracking-tight [text-shadow:0_3px_20px_rgba(2,6,23,0.72)] sm:text-5xl lg:text-6xl">
            Engineering Safe, Buildable Projects
          </h1>
        </div>

        <div className="absolute bottom-4 left-4 right-4 hidden text-white sm:bottom-6 sm:left-6 sm:right-auto sm:block sm:max-w-md">
          <p className="text-sm font-extrabold [text-shadow:0_2px_12px_rgba(2,6,23,0.72)] sm:text-base">
            {slides[current]?.title}
          </p>
          <p className="mt-1 line-clamp-2 text-xs font-medium leading-5 [text-shadow:0_2px_12px_rgba(2,6,23,0.72)] sm:text-sm">
            {slides[current]?.note}
          </p>
        </div>

        <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full border border-white/70 bg-white/92 p-1.5 shadow-xl shadow-slate-950/12 backdrop-blur sm:bottom-6 sm:right-6 sm:top-auto">
          <button
            onClick={prev}
            className="flex h-9 w-9 items-center justify-center rounded-full text-slate-950 transition hover:bg-slate-100"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="hidden items-center gap-2 sm:flex">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className="relative h-1.5 overflow-hidden rounded-full transition-all duration-300"
                style={{
                  width: i === current ? 32 : 8,
                  background: i === current ? '#2563EB' : 'rgba(15,23,42,0.2)',
                }}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="flex h-9 w-9 items-center justify-center rounded-full text-slate-950 transition hover:bg-slate-100"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="mx-4 mt-6 rounded-[1.5rem] border border-border bg-white p-5 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900 sm:mx-6 sm:mt-8 sm:rounded-[2rem] sm:p-7 lg:mx-12 lg:p-8">
        <div className="grid gap-7 lg:grid-cols-[1fr_0.68fr] lg:items-center">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.26em] text-brand-500">
              Civil & structural consultancy
            </p>
            <p className="mt-3 max-w-3xl text-base leading-8 text-slate-700 dark:text-slate-300 sm:text-lg">
              Masfy Consulting Engineers supports developers, architects,
              contractors and institutions with structural design, civil works,
              drainage, infrastructure planning, assessments and construction-stage
              engineering support across Kenya and the region.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-500 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/25 transition hover:bg-brand-700 md:hover:-translate-y-0.5"
              >
                Start a Project
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-white px-7 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-brand-500/40 hover:text-slate-950 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:border-brand-500/60 dark:hover:text-white md:hover:-translate-y-0.5"
              >
                View Our Work
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 lg:justify-self-end">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-border bg-surface px-3 py-4 text-center dark:border-slate-700 dark:bg-slate-800"
              >
                <p className="text-2xl font-extrabold leading-none text-slate-950 dark:text-white sm:text-3xl">
                  {stat.value}
                </p>
                <p className="mx-auto mt-2 max-w-24 text-[9px] font-semibold uppercase leading-4 tracking-widest text-slate-500 dark:text-slate-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
