'use client';
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiArrowRight, FiCheckCircle, FiLock, FiMail, FiUser, FiUsers } from "react-icons/fi";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setStatus({ type: "error", message: "Passwords do not match." });
      return;
    }

    setLoading(true);
    setStatus({ type: "idle", message: "" });

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      if (res.ok) {
        router.push("/").then(() => window.location.reload());
        return;
      }

      setStatus({ type: "error", message: "Signup failed. That email may already be in use." });
    } catch (error) {
      setStatus({ type: "error", message: "Unable to reach the signup endpoint right now." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="grid min-h-[calc(100vh-3rem)] overflow-hidden rounded-[32px] border border-[rgba(224,220,207,0.10)] bg-[rgba(5,23,24,0.72)] shadow-[0_40px_120px_rgba(0,0,0,0.34)] backdrop-blur-xl lg:grid-cols-[0.95fr_1.05fr]">
        <section className="flex items-center justify-center p-6 sm:p-10 lg:p-12">
          <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-6 rounded-[28px] border border-[rgba(224,220,207,0.10)] bg-[rgba(7,23,24,0.68)] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:p-8">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.35em] text-[var(--coral)]">Create access</p>
              <h2 className="text-3xl font-semibold tracking-tight text-[var(--beige)]">Admin signup</h2>
              <p className="text-sm leading-6 text-[var(--beige)]/68">
                Create a secure team account to keep the dashboard, projects, and feedback in one place.
              </p>
            </div>

            <div className="space-y-4">
              <label className="block space-y-2 text-sm text-[var(--beige)]/72">
                <span className="flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-[var(--beige)]/50"><FiUser /> Name</span>
                <input
                  placeholder="Your name"
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="input"
                  required
                />
              </label>

              <label className="block space-y-2 text-sm text-[var(--beige)]/72">
                <span className="flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-[var(--beige)]/50"><FiMail /> Email</span>
                <input
                  type="email"
                  placeholder="admin@sakshamassociates.com"
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="input"
                  required
                />
              </label>

              <label className="block space-y-2 text-sm text-[var(--beige)]/72">
                <span className="flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-[var(--beige)]/50"><FiLock /> Password</span>
                <input
                  type="password"
                  placeholder="Create a password"
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="input"
                  required
                />
              </label>

              <label className="block space-y-2 text-sm text-[var(--beige)]/72">
                <span className="flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-[var(--beige)]/50"><FiUsers /> Confirm password</span>
                <input
                  type="password"
                  placeholder="Repeat password"
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  className="input"
                  required
                />
              </label>
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
              {loading ? "Creating account..." : "Create account"}
              {!loading ? <FiArrowRight /> : null}
            </button>

            <p className="text-center text-sm text-[var(--beige)]/64">
              Already have an account?{" "}
              <Link href="/auth/login" className="font-medium text-[var(--coral)] transition hover:text-[var(--beige)]">
                Back to login
              </Link>
            </p>
          </form>
        </section>

        <aside className="relative hidden overflow-hidden p-8 lg:flex lg:flex-col lg:justify-between">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(216,142,108,0.18),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(73,90,84,0.26),transparent_35%)]" />
          <div className="relative z-10 space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(224,220,207,0.10)] bg-[rgba(255,255,255,0.04)] px-4 py-2 text-xs uppercase tracking-[0.3em] text-[var(--beige)]/70">
              <FiCheckCircle className="text-[var(--coral)]" />
              Team onboarding
            </div>

            <div className="space-y-4">
              <h1 className="max-w-xl text-5xl font-semibold tracking-tight text-[var(--beige)]">
                Build the team workspace that keeps the interior pipeline moving.
              </h1>
              <p className="max-w-xl text-base leading-7 text-[var(--beige)]/72">
                A structured signup flow makes it easier to bring new collaborators into the dashboard without losing the design-first feel of the brand.
              </p>
            </div>

            <div className="grid max-w-xl gap-3 sm:grid-cols-3">
              {[
                ["Roles", "Clear"],
                ["Access", "Secure"],
                ["Setup", "Quick"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-3xl border border-[rgba(224,220,207,0.08)] bg-[rgba(255,255,255,0.04)] p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-[var(--beige)]/45">{label}</p>
                  <p className="mt-2 text-2xl font-semibold text-[var(--beige)]">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}