"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FiLogOut } from "react-icons/fi";
import { adminNavItems, isNavItemActive } from "./adminNavigation";

const SideNav = () => {

  const pathname = usePathname();
  const userName = "Madhu J.";
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (res.ok) {
        // Redirect to login page after logout
        router.push('/auth/login');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <aside className="fixed left-0 top-0 z-50 hidden h-screen w-72 flex-col border-r border-[rgba(224,220,207,0.10)] bg-[rgba(3,16,18,0.9)] px-5 py-6 backdrop-blur-xl lg:flex">
      <div className="flex items-center gap-3 rounded-3xl border border-[rgba(224,220,207,0.08)] bg-[rgba(255,255,255,0.03)] p-3">
        <img src="/images/SALogoGreen.png" alt="Saksham Associates" className="h-12 w-12 rounded-2xl border border-[rgba(224,220,207,0.08)] bg-[rgba(255,255,255,0.04)] object-cover p-1" />
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-[var(--coral)]">Saksham Associates</p>
          <h2 className="text-lg font-semibold tracking-tight text-[var(--beige)]">Admin Studio</h2>
        </div>
      </div>

      <div className="mt-5 rounded-3xl border border-[rgba(224,220,207,0.08)] bg-[rgba(255,255,255,0.03)] p-4">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--beige)]/45">Workspace</p>
        <p className="mt-3 text-sm leading-6 text-[var(--beige)]/70">
          Manage interiors, track leads, and keep the portfolio polished from a single command center.
        </p>
        <div className="mt-4 flex flex-wrap gap-2 text-xs uppercase tracking-[0.24em] text-[var(--beige)]/68">
          <span className="rounded-full border border-[rgba(224,220,207,0.10)] bg-[rgba(73,90,84,0.16)] px-3 py-1">Live sync</span>
          <span className="rounded-full border border-[rgba(224,220,207,0.10)] bg-[rgba(216,142,108,0.12)] px-3 py-1">Secure</span>
        </div>
      </div>

      <nav className="mt-6 flex-1 space-y-2 overflow-y-auto pr-1">
        {adminNavItems.map((item) => {
          const Icon = item.icon;
          const active = isNavItemActive(pathname, item);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-medium transition ${
                active
                  ? "border-[rgba(216,142,108,0.26)] bg-[rgba(216,142,108,0.14)] text-[var(--beige)] shadow-[0_18px_40px_rgba(216,142,108,0.10)]"
                  : "border-transparent text-[var(--beige)]/68 hover:border-[rgba(224,220,207,0.08)] hover:bg-[rgba(255,255,255,0.04)] hover:text-[var(--beige)]"
              }`}
            >
              <Icon className="text-lg" />
              <span>{item.label}</span>
              <span className="ml-auto rounded-full border border-[rgba(224,220,207,0.08)] px-2 py-0.5 text-[10px] uppercase tracking-[0.24em] text-[var(--beige)]/40">{active ? "Open" : "Go"}</span>
            </Link>
          );
        })}
      </nav>

      <div className="rounded-3xl border border-[rgba(224,220,207,0.08)] bg-[rgba(255,255,255,0.04)] p-4">
        <div className="flex items-center gap-3">
          <img src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png" alt="User avatar" className="h-12 w-12 rounded-full border border-[rgba(224,220,207,0.08)] bg-[rgba(255,255,255,0.05)] object-cover" />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-[var(--beige)]">{userName}</p>
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--beige)]/50">Admin · Design ops</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--coral)] px-4 py-3 text-sm font-semibold text-[var(--deep-green)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(216,142,108,0.18)]"
        >
          <FiLogOut className="text-base" />
          Logout
        </button>
      </div>
    </aside>
  )
}

export default SideNav
