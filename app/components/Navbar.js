"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiBell, FiSearch, FiArrowRight } from "react-icons/fi";
import ThemeToggle from "./ThemeToggle";
import { adminNavItems, getAdminRouteMeta, isNavItemActive } from "./adminNavigation";

const Navbar = () => {
  const pathname = usePathname();
  const routeMeta = getAdminRouteMeta(pathname);
  const mobileNavItems = adminNavItems.filter((item) => item.label !== "Dashboard");

  return (
    <header className="sticky top-0 z-40 border-b border-[rgba(224,220,207,0.08)] bg-[rgba(4,20,21,0.78)] backdrop-blur-xl">
      <div className="flex flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-start gap-4">
          <div className="min-w-0 flex-1 space-y-1">
            <p className="text-xs uppercase tracking-[0.35em] text-[var(--coral)]">{routeMeta.kicker}</p>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-semibold tracking-tight text-[var(--beige)] sm:text-3xl">{routeMeta.title}</h1>
              <span className="rounded-full border border-[rgba(224,220,207,0.10)] bg-[rgba(255,255,255,0.04)] px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-[var(--beige)]/70">
                {routeMeta.status}
              </span>
            </div>
            <p className="max-w-3xl text-sm leading-6 text-[var(--beige)]/68 sm:text-base">{routeMeta.subtitle}</p>
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <div className="flex items-center gap-2 rounded-full border border-[rgba(224,220,207,0.10)] bg-[rgba(255,255,255,0.04)] px-4 py-2 text-sm text-[var(--beige)]/60">
              <FiSearch />
              <input
                type="search"
                placeholder="Search projects, enquiries, testimonials"
                className="w-72 bg-transparent text-sm text-[var(--beige)] outline-none placeholder:text-[var(--beige)]/40"
              />
            </div>

            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(224,220,207,0.10)] bg-[rgba(255,255,255,0.04)] text-[var(--beige)]/70 transition hover:border-[rgba(216,142,108,0.24)] hover:text-[var(--beige)]"
            >
              <FiBell />
            </button>

            <ThemeToggle />

            <Link
              href={routeMeta.actionHref}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--coral)] px-4 py-2.5 text-sm font-semibold text-[var(--deep-green)] transition hover:-translate-y-0.5"
            >
              {routeMeta.actionLabel}
              <FiArrowRight />
            </Link>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 lg:hidden">
          {mobileNavItems.map((item) => {
            const Icon = item.icon;
            const active = isNavItemActive(pathname, item);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] transition ${
                  active
                    ? "border-[rgba(216,142,108,0.26)] bg-[rgba(216,142,108,0.14)] text-[var(--beige)]"
                    : "border-[rgba(224,220,207,0.08)] bg-[rgba(255,255,255,0.03)] text-[var(--beige)]/62"
                }`}
              >
                <Icon className="text-sm" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  )
}

export default Navbar
