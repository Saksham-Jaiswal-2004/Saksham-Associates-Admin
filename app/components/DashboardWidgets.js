import Link from "next/link";

const toneStyles = {
  coral: {
    background: "linear-gradient(135deg, rgba(216, 142, 108, 0.24), rgba(216, 142, 108, 0.08))",
    border: "rgba(216, 142, 108, 0.28)",
  },
  teal: {
    background: "linear-gradient(135deg, rgba(73, 90, 84, 0.30), rgba(73, 90, 84, 0.10))",
    border: "rgba(73, 90, 84, 0.35)",
  },
  gold: {
    background: "linear-gradient(135deg, rgba(192, 139, 0, 0.22), rgba(192, 139, 0, 0.08))",
    border: "rgba(192, 139, 0, 0.28)",
  },
};

export function Panel({ className = "", children }) {
  return (
    <section
      className={`rounded-[28px] border border-[rgba(224,220,207,0.10)] bg-[rgba(7,23,24,0.68)] p-5 shadow-[0_28px_80px_rgba(0,0,0,0.24)] backdrop-blur-xl sm:p-6 ${className}`}
    >
      {children}
    </section>
  );
}

export function PageHeader({ eyebrow, title, description, actionHref, actionLabel }) {
  return (
    <Panel className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-3xl space-y-3">
        {eyebrow ? <p className="text-xs uppercase tracking-[0.35em] text-[var(--coral)]">{eyebrow}</p> : null}
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-[var(--beige)] sm:text-4xl">{title}</h2>
          {description ? <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--beige)]/72 sm:text-base">{description}</p> : null}
        </div>
      </div>
      {actionHref && actionLabel ? (
        <Link
          href={actionHref}
          className="inline-flex w-fit items-center justify-center rounded-full border border-[rgba(216,142,108,0.26)] bg-[var(--coral)] px-5 py-3 text-sm font-semibold text-[var(--deep-green)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(216,142,108,0.22)]"
        >
          {actionLabel}
        </Link>
      ) : null}
    </Panel>
  );
}

export function MetricCard({ icon: Icon, label, value, hint, trend, tone = "coral" }) {
  const selectedTone = toneStyles[tone] || toneStyles.coral;

  return (
    <Panel className="relative overflow-hidden" >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.32em] text-[var(--beige)]/52">{label}</p>
          <p className="mt-3 text-4xl font-semibold tracking-tight text-[var(--beige)] sm:text-5xl">{value}</p>
        </div>
        {Icon ? (
          <div
            className="flex h-12 w-12 items-center justify-center rounded-2xl border"
            style={{ background: selectedTone.background, borderColor: selectedTone.border }}
          >
            <Icon className="text-xl text-[var(--beige)]" />
          </div>
        ) : null}
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-[var(--beige)]/70">
        <span>{hint}</span>
        {trend ? <span className="rounded-full border border-[rgba(224,220,207,0.12)] bg-[rgba(255,255,255,0.04)] px-3 py-1 text-xs uppercase tracking-[0.24em] text-[var(--beige)]/70">{trend}</span> : null}
      </div>
    </Panel>
  );
}

export function ActionCard({ href, title, description, icon: Icon }) {
  return (
    <Link href={href} className="group block">
      <Panel className="h-full transition duration-200 group-hover:-translate-y-1 group-hover:border-[rgba(216,142,108,0.28)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--coral)]/90">Quick action</p>
            <h3 className="mt-3 text-xl font-semibold tracking-tight text-[var(--beige)]">{title}</h3>
          </div>
          {Icon ? (
            <div className="rounded-2xl border border-[rgba(224,220,207,0.10)] bg-[rgba(255,255,255,0.04)] p-3 text-[var(--coral)] transition group-hover:bg-[rgba(216,142,108,0.12)]">
              <Icon className="text-2xl" />
            </div>
          ) : null}
        </div>
        <p className="mt-4 text-sm leading-6 text-[var(--beige)]/70">{description}</p>
      </Panel>
    </Link>
  );
}

export function ProgressRow({ label, value, percent, tone = "coral" }) {
  const selectedTone = toneStyles[tone] || toneStyles.coral;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="text-[var(--beige)]/70">{label}</span>
        <span className="font-medium text-[var(--beige)]">{value}</span>
      </div>
      <div className="h-2 rounded-full bg-[rgba(224,220,207,0.08)]">
        <div
          className="h-full rounded-full"
          style={{ width: `${percent}%`, background: selectedTone.background, border: `1px solid ${selectedTone.border}` }}
        />
      </div>
    </div>
  );
}

export function ActivityItem({ title, description, time, status }) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-[rgba(224,220,207,0.08)] bg-[rgba(255,255,255,0.03)] p-4">
      <div className="mt-1 h-3 w-3 rounded-full bg-[var(--coral)] shadow-[0_0_0_6px_rgba(216,142,108,0.12)]" />
      <div className="min-w-0 flex-1 space-y-1">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-medium text-[var(--beige)]">{title}</p>
          {time ? <span className="text-xs uppercase tracking-[0.24em] text-[var(--beige)]/45">{time}</span> : null}
        </div>
        <p className="text-sm leading-6 text-[var(--beige)]/70">{description}</p>
        {status ? <span className="inline-flex w-fit rounded-full border border-[rgba(224,220,207,0.12)] bg-[rgba(255,255,255,0.04)] px-3 py-1 text-xs uppercase tracking-[0.24em] text-[var(--beige)]/64">{status}</span> : null}
      </div>
    </div>
  );
}