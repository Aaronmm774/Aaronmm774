'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

const themeStorageKey = 'masfy-home-theme';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About us' },
  { href: '/services', label: 'Services' },
  { href: '/projects', label: 'Projects' },
  { href: '/careers', label: 'Careers' },
];

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const navbarIsDark = dark;

  useEffect(() => {
    const savedTheme = window.localStorage.getItem(themeStorageKey);
    const useDark = savedTheme
      ? savedTheme === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches;

    setDark(useDark);
    document.documentElement.classList.toggle('dark', useDark);
  }, []);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    window.localStorage.setItem(themeStorageKey, next ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', next);
  }

  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur-md transition-colors duration-300 ${
        navbarIsDark
          ? 'border-slate-800 bg-slate-950 text-white'
          : 'border-border/60 bg-white/90 text-slate-900'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-0 lg:px-8">

        {/* Logo */}
        <Link href="/" className="flex min-w-0 items-center gap-3 py-3" onClick={() => setMenuOpen(false)}>
          <span className="relative h-14 w-16 shrink-0 overflow-hidden" aria-hidden="true">
            <img
              src={
                navbarIsDark
                  ? '/Masfy-Logo-Dark.png'
                  : '/Masfy Logo 2025_New_Version.png'
              }
              alt=""
              className="absolute left-1/2 top-1/2 h-16 w-auto max-w-none -translate-x-1/2 -translate-y-1/2 object-contain"
            />
          </span>
          <span className="flex flex-col">
            <span
              className={`text-xs font-extrabold leading-tight sm:text-base sm:leading-none ${
                navbarIsDark ? 'text-white' : 'text-slate-950'
              }`}
            >
              Masfy Consulting Engineers
            </span>
            <span className="mt-1 hidden text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-500 sm:block">
              Safe, efficient and buildable projects
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((item) => {
            const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-4 py-[1.35rem] text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-brand-500'
                    : navbarIsDark
                      ? 'text-slate-300 hover:text-white'
                      : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {item.label}
                {/* active underline */}
                {isActive && (
                  <span className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full bg-brand-500" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 lg:flex">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={dark ? 'Use light mode' : 'Use dark mode'}
            title={dark ? 'Use light mode' : 'Use dark mode'}
            className={`flex h-10 w-10 items-center justify-center rounded-full border shadow-sm transition ${
              navbarIsDark
                ? 'border-slate-700 bg-slate-900 text-amber-300 hover:border-slate-600 hover:text-amber-200'
                : 'border-border bg-white text-slate-700 hover:border-brand-500/40 hover:text-slate-950'
            }`}
          >
            {dark ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
          </button>
          <a
            href="/Masfy%20Profile%202025.pdf"
            download
            className={`rounded-full border px-5 py-2.5 text-sm font-semibold shadow-sm transition ${
              navbarIsDark
                ? 'border-slate-700 bg-slate-900 text-slate-200 hover:border-slate-600 hover:text-white'
                : 'border-border bg-white text-slate-700 hover:border-brand-500/40 hover:text-slate-950'
            }`}
          >
            Company Profile
          </a>
          <Link
            href="/contact"
            className="rounded-full bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-brand-500/20 transition hover:bg-brand-700"
          >
            Talk to us
          </Link>
        </div>

        {/* Mobile hamburger */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={dark ? 'Use light mode' : 'Use dark mode'}
            className={`flex h-9 w-9 items-center justify-center rounded-full border transition ${
              navbarIsDark
                ? 'border-slate-700 bg-slate-900 text-amber-300 hover:bg-slate-800'
                : 'border-border text-slate-600 hover:bg-surface'
            }`}
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            className={`flex h-9 w-9 items-center justify-center rounded-lg border transition lg:hidden ${
              navbarIsDark
                ? 'border-slate-700 text-slate-300 hover:bg-slate-800'
                : 'border-border text-slate-600 hover:bg-surface'
            }`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
          {menuOpen ? (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className={`border-t px-6 pb-5 pt-3 lg:hidden ${
            navbarIsDark
              ? 'border-slate-800 bg-slate-950'
              : 'border-border bg-white'
          }`}
        >
          <nav className="flex flex-col gap-1">
            {navLinks.map((item) => {
              const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-brand-50 text-brand-500'
                      : navbarIsDark
                        ? 'text-slate-300 hover:bg-slate-800 hover:text-white'
                        : 'text-slate-600 hover:bg-surface hover:text-slate-900'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-4 grid gap-3 border-t border-border pt-4 dark:border-slate-800">
            <a
              href="/Masfy%20Profile%202025.pdf"
              download
              onClick={() => setMenuOpen(false)}
              className="block w-full rounded-full border border-border bg-white px-5 py-2.5 text-center text-sm font-semibold text-slate-700 transition hover:border-brand-500/40 hover:text-slate-950 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:text-white"
            >
              Download Company Profile
            </a>
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="block w-full rounded-full bg-brand-500 px-5 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-brand-700"
            >
              Talk to us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
