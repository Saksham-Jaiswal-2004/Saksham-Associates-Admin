import { FiGrid, FiFolder, FiMessageSquare, FiHelpCircle, FiUsers, FiPlusCircle } from "react-icons/fi";

export const adminNavItems = [
  { href: "/", label: "Dashboard", icon: FiGrid, paths: ["/"] },
  { href: "/Projects", label: "Projects", icon: FiFolder, paths: ["/Projects", "/AddProjects"] },
  { href: "/Testimonials", label: "Testimonials", icon: FiMessageSquare, paths: ["/Testimonials", "/AddTestimonials"] },
  { href: "/Queries", label: "Queries", icon: FiHelpCircle, paths: ["/Queries"] },
  { href: "/Users", label: "Users", icon: FiUsers, paths: ["/Users"] },
];

export const adminRouteMeta = {
  "/": {
    title: "Dashboard",
    kicker: "Studio overview",
    subtitle: "A quick look at active projects, fresh enquiries, and social proof ready for the site.",
    status: "Live sync",
    actionHref: "/AddProjects",
    actionLabel: "New project",
  },
  "/Projects": {
    title: "Projects",
    kicker: "Project pipeline",
    subtitle: "Track active interiors, approved concepts, and upcoming handovers in one view.",
    status: "Pipeline",
    actionHref: "/AddProjects",
    actionLabel: "Add project",
  },
  "/AddProjects": {
    title: "Add project",
    kicker: "Capture scope",
    subtitle: "Add a new interior project with assets, room notes, and delivery details.",
    status: "Draft mode",
    actionHref: "/Projects",
    actionLabel: "Back to projects",
  },
  "/Testimonials": {
    title: "Testimonials",
    kicker: "Client proof",
    subtitle: "Curate project feedback and design wins that strengthen the brand story.",
    status: "Review",
    actionHref: "/AddTestimonials",
    actionLabel: "Add testimonial",
  },
  "/AddTestimonials": {
    title: "Add testimonial",
    kicker: "Social proof",
    subtitle: "Publish fresh client feedback and highlight the best finished spaces.",
    status: "Draft mode",
    actionHref: "/Testimonials",
    actionLabel: "Back to testimonials",
  },
  "/Queries": {
    title: "Queries",
    kicker: "Lead inbox",
    subtitle: "Review incoming enquiries, response time, and the conversations that need follow-up.",
    status: "Waiting",
    actionHref: "/Queries",
    actionLabel: "Refresh inbox",
  },
  "/Users": {
    title: "Users",
    kicker: "CRM feed",
    subtitle: "Keep an eye on contacts, warm leads, and recurring clients.",
    status: "Connected",
    actionHref: "/Users",
    actionLabel: "Sync users",
  },
};

export const quickActionItems = [
  {
    href: "/AddProjects",
    title: "Capture a new project",
    description: "Add scope, imagery, and delivery milestones for a fresh interior brief.",
    icon: FiPlusCircle,
  },
  {
    href: "/AddTestimonials",
    title: "Publish social proof",
    description: "Bring recent client praise into the dashboard and keep the portfolio persuasive.",
    icon: FiMessageSquare,
  },
];

export function getAdminRouteMeta(pathname) {
  return adminRouteMeta[pathname] || adminRouteMeta["/"];
}

export function isNavItemActive(pathname, item) {
  return item.paths.some((path) => pathname === path || pathname.startsWith(`${path}/`));
}