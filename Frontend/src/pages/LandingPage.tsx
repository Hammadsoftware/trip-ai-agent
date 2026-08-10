import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  animate,
  useInView,
} from "framer-motion";
import {
  Plane,
  Building2,
  MessageCircle,
  Map,
  Sparkles,
  Users,
  Globe,
  Zap,
} from "lucide-react";

/* ── Animated Counter ───────────────────────────────────── */
function Counter({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const count = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useMotionValueEvent(count, "change", (latest) => {
    setDisplay(Math.round(latest));
  });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, {
        duration: 2,
        ease: "easeOut" as const,
      });
      return controls.stop;
    }
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

/* ── Feature card data ──────────────────────────────────── */
const features = [
  {
    icon: MessageCircle,
    title: "Chat Naturally",
    description:
      "Tell TripAI where you want to go and what you like — just like talking to a travel agent. No forms, no filters, no hassle.",
  },
  {
    icon: Plane,
    title: "Find the Best Flights",
    description:
      "TripAI searches flights across airlines and surfaces the best options for your schedule, complete with times, stops, and prices.",
  },
  {
    icon: Building2,
    title: "Discover Great Hotels",
    description:
      "Browse curated hotel picks with star ratings, photos, and nightly rates. Pick the one that fits your style and budget.",
  },
  {
    icon: Map,
    title: "Get a Full Itinerary",
    description:
      "When you're ready, TripAI builds a day-by-day itinerary with flights, hotels, and activities — all in one shareable summary.",
  },
];

const stats = [
  { icon: Users, value: 10000, suffix: "+", label: "Trips planned" },
  { icon: Globe, value: 500, suffix: "+", label: "Destinations" },
  { icon: Zap, value: 24, suffix: "/7", label: "AI planning" },
];

/* ── Stagger animations ─────────────────────────────────── */
const containerStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemFadeUp = {
  hidden: { opacity: 0, transform: "translateY(24px)" },
  visible: {
    opacity: 1,
    transform: "translateY(0px)",
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

/* ── Landing Page ───────────────────────────────────────── */
export default function LandingPage() {
  return (
    <>
      {/* Skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-surface-light focus:text-text-light focus:rounded-[var(--radius-card)] focus:ring-2 focus:ring-accent focus:outline-none"
      >
        Skip to content
      </a>

      <div className="min-h-screen bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark overflow-x-hidden">
        {/* ── Header ──────────────────────────────────── */}
        <header className="fixed top-0 left-0 right-0 z-40 border-b border-border-light/50 dark:border-border-dark/50 glass-surface">
          <nav
            aria-label="Main navigation"
            className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between"
          >
            <Link
              to="/"
              className="text-lg font-bold text-text-light dark:text-text-dark hover:text-accent transition-colors duration-200"
              aria-current="page"
            >
              TripAI
            </Link>
            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="text-sm font-medium text-text-light/70 dark:text-text-dark/70 hover:text-accent transition-colors duration-200"
              >
                Log in
              </Link>
              <Link
                to="/login"
                className="text-sm font-medium bg-accent text-white px-5 py-2.5 rounded-[var(--radius-card)] hover:bg-accent-hover active:scale-[0.97] transition-[background-color,transform,box-shadow] duration-200 ease-out shadow-sm hover:shadow-md cursor-pointer"
              >
                Get started
              </Link>
            </div>
          </nav>
        </header>

        <main id="main-content">
          {/* ── Hero ──────────────────────────────────── */}
          <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 px-4">
            {/* Background layers */}
            <div className="absolute inset-0 bg-dot-grid pointer-events-none" />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(50% 40% at 50% 30%, rgba(217,119,87,0.12) 0%, transparent 70%)",
              }}
            />

            {/* Floating accent blobs */}
            <div
              className="absolute top-20 left-[10%] w-64 h-64 rounded-full opacity-[0.04] dark:opacity-[0.06] pointer-events-none animate-float"
              style={{
                background:
                  "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)",
                animationDelay: "0s",
              }}
            />
            <div
              className="absolute top-40 right-[10%] w-80 h-80 rounded-full opacity-[0.04] dark:opacity-[0.06] pointer-events-none animate-float"
              style={{
                background:
                  "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)",
                animationDelay: "2s",
              }}
            />

            <motion.div
              className="relative max-w-3xl mx-auto text-center"
              initial="hidden"
              animate="visible"
              variants={containerStagger}
            >
              <motion.div variants={itemFadeUp}>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20 mb-6">
                  <Sparkles className="w-3.5 h-3.5" />
                  AI-powered trip planning
                </span>
              </motion.div>

              <motion.h1
                variants={itemFadeUp}
                className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1]"
              >
                Plan your trip
                <br />
                <span className="text-gradient">with a conversation</span>
              </motion.h1>

              <motion.p
                variants={itemFadeUp}
                className="mt-6 text-lg sm:text-xl text-text-light/60 dark:text-text-dark/60 max-w-xl mx-auto leading-relaxed"
              >
                TripAI is the chat-based trip planner that finds flights, hotels,
                and builds day-by-day itineraries — all from one conversation.
              </motion.p>

              <motion.div
                variants={itemFadeUp}
                className="mt-10 flex items-center justify-center gap-4 flex-wrap"
              >
                <Link
                  to="/login"
                  className="group inline-flex items-center gap-2 text-sm font-semibold bg-accent text-white px-7 py-3.5 rounded-[var(--radius-card)] hover:bg-accent-hover active:scale-[0.97] transition-[background-color,transform,box-shadow] duration-200 ease-out shadow-md hover:shadow-lg cursor-pointer"
                >
                  Start planning
                  <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">
                    →
                  </span>
                </Link>
                <Link
                  to="/login"
                  className="text-sm font-medium text-text-light dark:text-text-dark border border-border-light dark:border-border-dark px-7 py-3.5 rounded-[var(--radius-card)] hover:border-accent hover:text-accent transition-colors duration-200 cursor-pointer"
                >
                  Log in
                </Link>
              </motion.div>
            </motion.div>
          </section>

          {/* ── Trust stats ───────────────────────────── */}
          <section
            aria-label="Trusted by travelers"
            className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20"
          >
            <motion.div
              className="flex flex-wrap justify-center gap-8 sm:gap-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerStagger}
            >
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={itemFadeUp}
                  className="flex flex-col items-center gap-2"
                >
                  <stat.icon className="w-5 h-5 text-accent/60" />
                  <span className="text-2xl sm:text-3xl font-bold text-text-light dark:text-text-dark">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </span>
                  <span className="text-xs sm:text-sm text-text-light/50 dark:text-text-dark/50">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* ── Features ──────────────────────────────── */}
          <section
            aria-labelledby="features-heading"
            className="max-w-6xl mx-auto px-4 sm:px-6 pb-24 sm:pb-32"
          >
            <motion.div
              className="text-center mb-14"
              initial={{ opacity: 0, transform: "translateY(16px)" }}
              whileInView={{ opacity: 1, transform: "translateY(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2
                id="features-heading"
                className="text-2xl sm:text-3xl font-bold"
              >
                How it works
              </h2>
              <p className="mt-3 text-text-light/50 dark:text-text-dark/50 max-w-md mx-auto">
                From first message to final itinerary — four simple steps
              </p>
            </motion.div>

            <motion.div
              className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={containerStagger}
            >
              {features.map((feature) => (
                <motion.article
                  key={feature.title}
                  variants={itemFadeUp}
                  className="group relative rounded-[var(--radius-card)] border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark p-6 hover:shadow-lg hover:border-accent/30 dark:hover:border-accent/30 transition-[box-shadow,border-color,transform] duration-300 ease-out hover:-translate-y-1 cursor-default"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/15 transition-colors duration-300">
                    <feature.icon className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="font-semibold text-text-light dark:text-text-dark mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-text-light/55 dark:text-text-dark/55 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.article>
              ))}
            </motion.div>
          </section>

          {/* ── CTA ───────────────────────────────────── */}
          <section className="relative overflow-hidden">
            {/* Gradient background */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(217,119,87,0.08) 0%, rgba(217,119,87,0.03) 50%, transparent 100%)",
              }}
            />
            <div className="absolute inset-0 border-t border-border-light dark:border-border-dark" />

            <motion.div
              className="relative max-w-3xl mx-auto px-4 sm:px-6 py-20 sm:py-28 text-center"
              initial={{ opacity: 0, transform: "translateY(24px)" }}
              whileInView={{ opacity: 1, transform: "translateY(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" as const }}
            >
              <h2 className="text-2xl sm:text-4xl font-bold">
                Ready to plan your next adventure?
              </h2>
              <p className="mt-4 text-text-light/55 dark:text-text-dark/55 max-w-md mx-auto">
                Sign up in seconds and start chatting with TripAI. Your next trip
                is just a conversation away.
              </p>
              <Link
                to="/login"
                className="group inline-flex items-center gap-2 mt-8 text-sm font-semibold bg-accent text-white px-8 py-4 rounded-[var(--radius-card)] hover:bg-accent-hover active:scale-[0.97] transition-[background-color,transform,box-shadow] duration-200 ease-out shadow-lg hover:shadow-xl cursor-pointer"
              >
                Get started free
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
            </motion.div>
          </section>
        </main>

        {/* ── Footer ─────────────────────────────────── */}
        <footer className="border-t border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-text-light/40 dark:text-text-dark/40">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-accent/50" />
              <span>&copy; {new Date().getFullYear()} TripAI</span>
            </div>
            <div className="flex items-center gap-6">
              <Link
                to="/login"
                className="hover:text-accent transition-colors duration-200"
              >
                Log in
              </Link>
              <Link
                to="/login"
                className="hover:text-accent transition-colors duration-200"
              >
                Get started
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
