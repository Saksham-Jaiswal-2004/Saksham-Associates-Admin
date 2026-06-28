"use client";
import React, { useEffect, useState } from "react";
import { db } from "../app/lib/firebase";
import { collection, getCountFromServer } from "firebase/firestore";
import Link from "next/link";
import { FiFolder, FiMessageSquare, FiUsers, FiArrowRight, FiClock, FiCompass, FiShield, FiTrendingUp } from "react-icons/fi";
import { Panel, MetricCard, ActionCard, ProgressRow, ActivityItem } from "./components/DashboardWidgets";

const Page = () => {

  const [testimonialCount, setTestimonialCount] = useState(null);
  const [userCount, setUserCount] = useState(null);
  const [projectCount, setProjectCount] = useState(null);
  const [loading, setLoading] = useState(true);

  const recentActivity = [
    {
      title: "New mood board approved",
      description: "The living room palette for the south residence moved from concept to production.",
      time: "12m ago",
      status: "Ready for procurement",
    },
    {
      title: "Client enquiry received",
      description: "A new lead came in for a compact 3BHK renovation with warm minimal styling.",
      time: "42m ago",
      status: "Needs response",
    },
    {
      title: "Testimonial queued",
      description: "A polished review is waiting to be published with site imagery attached.",
      time: "Today",
      status: "Awaiting approval",
    },
  ];

  const pipeline = [
    { label: "Discovery", value: "9 briefs", percent: 88, tone: "teal" },
    { label: "Design development", value: "6 rooms", percent: 72, tone: "coral" },
    { label: "Handover prep", value: "3 projects", percent: 48, tone: "gold" },
  ];

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [testimonialSnap, userSnap, projectSnap] = await Promise.all([
          getCountFromServer(collection(db, "Testimonials")),
          getCountFromServer(collection(db, "Queries")),
          getCountFromServer(collection(db, "Projects")),
        ]);

        setTestimonialCount(testimonialSnap.data().count);
        setUserCount(userSnap.data().count);
        setProjectCount(projectSnap.data().count);
      } catch (error) {
        console.error("Error fetching counts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  const stats = [
    {
      label: "Total projects",
      value: loading ? "—" : projectCount ?? 0,
      hint: "Active and archived briefs in the studio pipeline.",
      trend: "Live count",
      icon: FiFolder,
      tone: "coral",
    },
    {
      label: "Testimonials",
      value: loading ? "—" : testimonialCount ?? 0,
      hint: "Fresh proof points ready to strengthen the portfolio.",
      trend: "Brand trust",
      icon: FiMessageSquare,
      tone: "teal",
    },
    {
      label: "Queries",
      value: loading ? "—" : userCount ?? 0,
      hint: "Client conversations that need attention and response time.",
      trend: "Follow up",
      icon: FiUsers,
      tone: "gold",
    },
  ];

  return (
    <div className="space-y-6">
      <Panel className="overflow-hidden p-0">
        <div className="grid gap-0 lg:grid-cols-[1.3fr_0.9fr]">
          <div className="relative overflow-hidden p-6 sm:p-8 lg:p-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(216,142,108,0.18),transparent_38%),radial-gradient(circle_at_bottom_left,rgba(73,90,84,0.24),transparent_30%)]" />
            <div className="relative z-10 max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(224,220,207,0.10)] bg-[rgba(255,255,255,0.04)] px-4 py-2 text-xs uppercase tracking-[0.3em] text-[var(--beige)]/70">
                <FiCompass className="text-[var(--coral)]" />
                Interior design command center
              </div>
              <div className="space-y-4">
                <h2 className="text-4xl font-semibold tracking-tight text-[var(--beige)] sm:text-5xl">
                  A calmer dashboard for a busier design studio.
                </h2>
                <p className="max-w-2xl text-base leading-7 text-[var(--beige)]/70 sm:text-lg">
                  Track projects, client conversations, and testimonials with a cleaner overview built around the studio’s warm green and coral palette.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/AddProjects"
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--coral)] px-5 py-3 text-sm font-semibold text-[var(--deep-green)] transition hover:-translate-y-0.5"
                >
                  Add project
                  <FiArrowRight />
                </Link>
                <Link
                  href="/Testimonials"
                  className="inline-flex items-center gap-2 rounded-full border border-[rgba(224,220,207,0.10)] bg-[rgba(255,255,255,0.04)] px-5 py-3 text-sm font-semibold text-[var(--beige)] transition hover:-translate-y-0.5 hover:border-[rgba(216,142,108,0.22)]"
                >
                  Review testimonials
                </Link>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-[rgba(224,220,207,0.08)] bg-[rgba(255,255,255,0.04)] p-4">
                  <FiTrendingUp className="text-xl text-[var(--coral)]" />
                  <p className="mt-3 text-2xl font-semibold text-[var(--beige)]">92%</p>
                  <p className="text-sm text-[var(--beige)]/64">Lead response health</p>
                </div>
                <div className="rounded-2xl border border-[rgba(224,220,207,0.08)] bg-[rgba(255,255,255,0.04)] p-4">
                  <FiClock className="text-xl text-[var(--coral)]" />
                  <p className="mt-3 text-2xl font-semibold text-[var(--beige)]">2.4h</p>
                  <p className="text-sm text-[var(--beige)]/64">Average response time</p>
                </div>
                <div className="rounded-2xl border border-[rgba(224,220,207,0.08)] bg-[rgba(255,255,255,0.04)] p-4">
                  <FiShield className="text-xl text-[var(--coral)]" />
                  <p className="mt-3 text-2xl font-semibold text-[var(--beige)]">100%</p>
                  <p className="text-sm text-[var(--beige)]/64">Admin access secured</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-[rgba(224,220,207,0.08)] p-6 sm:p-8 lg:border-l lg:border-t-0">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-[var(--beige)]/45">Today’s focus</p>
                  <h3 className="mt-2 text-2xl font-semibold text-[var(--beige)]">Studio snapshot</h3>
                </div>
                <span className="rounded-full border border-[rgba(224,220,207,0.10)] bg-[rgba(255,255,255,0.04)] px-3 py-1 text-xs uppercase tracking-[0.24em] text-[var(--beige)]/64">
                  Updated now
                </span>
              </div>

              <div className="grid gap-4">
                {stats.map((stat) => (
                  <MetricCard
                    key={stat.label}
                    icon={stat.icon}
                    label={stat.label}
                    value={stat.value}
                    hint={stat.hint}
                    trend={stat.trend}
                    tone={stat.tone}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Panel>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <Panel>
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--beige)]/45">Pipeline</p>
              <h3 className="mt-2 text-2xl font-semibold text-[var(--beige)]">Work in motion</h3>
            </div>
            <span className="rounded-full border border-[rgba(224,220,207,0.10)] bg-[rgba(255,255,255,0.04)] px-3 py-1 text-xs uppercase tracking-[0.24em] text-[var(--beige)]/64">
              Interior projects
            </span>
          </div>

          <div className="mt-6 space-y-5">
            {pipeline.map((item) => (
              <ProgressRow key={item.label} label={item.label} value={item.value} percent={item.percent} tone={item.tone} />
            ))}
          </div>
        </Panel>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-1">
          {[
            {
              href: "/Projects",
              title: "Open the project board",
              description: "Review active interiors, sort by urgency, and keep deliverables moving.",
              icon: FiFolder,
            },
            {
              href: "/Users",
              title: "Check client conversations",
              description: "Find warm leads and follow up before the conversation cools off.",
              icon: FiUsers,
            },
          ].map((item) => (
            <ActionCard key={item.title} href={item.href} title={item.title} description={item.description} icon={item.icon} />
          ))}
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_1.1fr]">
        <Panel>
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--beige)]/45">Quick actions</p>
              <h3 className="mt-2 text-2xl font-semibold text-[var(--beige)]">Fast track the work</h3>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
            <ActionCard href="/AddProjects" title="Add a project" description="Log new room concepts, handover notes, and image assets." icon={FiFolder} />
            <ActionCard href="/AddTestimonials" title="Add a testimonial" description="Capture fresh client feedback while the experience is still top of mind." icon={FiMessageSquare} />
          </div>
        </Panel>

        <Panel>
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--beige)]/45">Recent activity</p>
              <h3 className="mt-2 text-2xl font-semibold text-[var(--beige)]">What changed today</h3>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {recentActivity.map((item) => (
              <ActivityItem key={item.title} {...item} />
            ))}
          </div>
        </Panel>
      </div>
    </div>
  )
}

export default Page