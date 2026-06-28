'use client';
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiArrowRight, FiEye, FiEyeOff, FiLock, FiMail, FiShield, FiCheckCircle } from "react-icons/fi";

export default function Login() {
  const [form, setForm] = useState({ Email: "", Password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(true);
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "idle", message: "" });

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ ...form, rememberDevice }),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      });

      if (res.ok) {
        router.push("/").then(() => window.location.reload());
        return;
      }

      const error = await res.json();
      setStatus({ type: "error", message: error.error || "Login failed. Check your credentials and try again." });
    } catch (error) {
      setStatus({ type: "error", message: "Unable to reach the login endpoint right now." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="grid min-h-[calc(100vh-3rem)] overflow-hidden rounded-[32px] border border-[rgba(224,220,207,0.10)] bg-[rgba(5,23,24,0.72)] shadow-[0_40px_120px_rgba(0,0,0,0.34)] backdrop-blur-xl lg:grid-cols-[1.05fr_0.95fr]">
        <aside className="relative hidden overflow-hidden p-8 lg:flex lg:flex-col lg:justify-between">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(216,142,108,0.18),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(73,90,84,0.28),transparent_35%)]" />
          <div className="relative z-10 space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(224,220,207,0.10)] bg-[rgba(255,255,255,0.04)] px-4 py-2 text-xs uppercase tracking-[0.3em] text-[var(--beige)]/70">
              <FiShield className="text-[var(--coral)]" />
              Secure admin access
            </div>

            <div className="space-y-4">
              <h1 className="max-w-xl text-5xl font-semibold tracking-tight text-[var(--beige)]">
                Welcome back to the Saksham Associates studio console.
              </h1>
              <p className="max-w-xl text-base leading-7 text-[var(--beige)]/72">
                Keep design projects, client queries, and testimonials in one calm workspace built for an interior design team.
              </p>
            </div>

            <div className="grid max-w-xl gap-3 sm:grid-cols-3">
              {[
                ["Design", "Focused"],
                ["Leads", "Organised"],
                ["Access", "Protected"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-3xl border border-[rgba(224,220,207,0.08)] bg-[rgba(255,255,255,0.04)] p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-[var(--beige)]/45">{label}</p>
                  <p className="mt-2 text-2xl font-semibold text-[var(--beige)]">{value}</p>
                </div>
              ))}
            </div>

            <div className="space-y-4 rounded-[28px] border border-[rgba(224,220,207,0.08)] bg-[rgba(255,255,255,0.04)] p-5 max-w-xl">
              <div className="flex items-center gap-3">
                <FiCheckCircle className="text-xl text-[var(--coral)]" />
                <p className="font-medium text-[var(--beige)]">Built for a quick, low-friction daily login.</p>
              </div>
              <p className="text-sm leading-6 text-[var(--beige)]/70">
                The dashboard keeps the warm palette, but removes the visual clutter so the team can focus on the work that matters.
              </p>
            </div>
          </div>
        </aside>

        <section className="flex items-center justify-center p-6 sm:p-10 lg:p-12">
          <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-6 rounded-[28px] border border-[rgba(224,220,207,0.10)] bg-[rgba(7,23,24,0.68)] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:p-8">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.35em] text-[var(--coral)]">Private access</p>
              <h2 className="text-3xl font-semibold tracking-tight text-[var(--beige)]">Admin login</h2>
              <p className="text-sm leading-6 text-[var(--beige)]/68">
                Sign in to manage projects, enquiries, and testimonials from the interior studio dashboard.
              </p>
            </div>

            <div className="space-y-4">
              <label className="block space-y-2 text-sm text-[var(--beige)]/72">
                <span className="flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-[var(--beige)]/50"><FiMail /> Email</span>
                <input
                  type="email"
                  placeholder="admin@sakshamassociates.com"
                  onChange={(e) => setForm({ ...form, Email: e.target.value })}
                  className="input"
                  required
                />
              </label>

              <label className="block space-y-2 text-sm text-[var(--beige)]/72">
                <span className="flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-[var(--beige)]/50"><FiLock /> Password</span>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Your password"
                    onChange={(e) => setForm({ ...form, Password: e.target.value })}
                    className="input pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute inset-y-0 right-3 inline-flex items-center text-[var(--beige)]/52 transition hover:text-[var(--beige)]"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </label>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-[var(--beige)]/70">
              <label className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={rememberDevice}
                  onChange={(e) => setRememberDevice(e.target.checked)}
                  className="h-4 w-4 rounded border-[rgba(224,220,207,0.18)] bg-transparent text-[var(--coral)] focus:ring-[var(--coral)]"
                />
                Remember this device
              </label>
              <Link href="/auth/signup" className="font-medium text-[var(--coral)] transition hover:text-[var(--beige)]">
                Need an account?
              </Link>
            </div>

            {status.message ? (
              <div className={`rounded-2xl border px-4 py-3 text-sm ${status.type === "error" ? "border-[rgba(216,142,108,0.24)] bg-[rgba(216,142,108,0.12)] text-[var(--beige)]" : "border-[rgba(73,90,84,0.24)] bg-[rgba(73,90,84,0.12)] text-[var(--beige)]"}`}>
                {status.message}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--coral)] px-5 py-3.5 text-sm font-semibold text-[var(--deep-green)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Signing in..." : "Sign in"}
              {!loading ? <FiArrowRight /> : null}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}