import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const cardClassName =
  "rounded-3xl border border-surface-500/40 bg-surface-900/20 p-6 backdrop-blur-sm";
const accentTextClassName = "text-[rgb(var(--docs-accent-strong))]";
const accentSoftClassName = "bg-[rgb(var(--docs-accent-soft)/0.10)]";
const accentBorderClassName = "border-[rgb(var(--docs-accent-border)/0.28)]";
const accentHoverBorderClassName =
  "hover:border-[rgb(var(--docs-accent-border)/0.45)]";
const accentHoverTextClassName = "hover:text-[rgb(var(--docs-accent-strong))]";
const iconContainerClassName =
  `flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border ${accentBorderClassName} ${accentSoftClassName}`;

export default function Help() {
  return (
    <main className="flex-1 overflow-auto bg-inherit text-inherit">
      <div className="relative isolate min-h-full overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "linear-gradient(rgba(59, 139, 255, 0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 139, 255, 0.12) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />
        </div>

        <div className="relative mx-auto flex max-w-5xl flex-col gap-8 px-6 py-12 sm:px-8 lg:py-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="flex items-center"
          >
            <Link
              to="/"
              className={`inline-flex items-center gap-2 rounded-full border border-surface-500/20 bg-surface-900/20 px-4 py-2 text-sm font-medium text-text-primary transition-colors ${accentHoverBorderClassName} ${accentHoverTextClassName}`}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to docs
            </Link>
          </motion.div>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className={cardClassName}
          >
            <div className="max-w-3xl space-y-4">
              <div
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-mono uppercase tracking-[0.24em] ${accentBorderClassName} ${accentSoftClassName} ${accentTextClassName}`}
              >
                Support
              </div>
              <h1 className="text-4xl font-black tracking-tight text-text-primary sm:text-5xl">
                Need help with Retreever?
              </h1>
              <p className="max-w-2xl text-base leading-7 text-text-paragraph sm:text-lg">
                Reach out with product questions, documentation feedback, or
                integration issues. We will respond through email or LinkedIn.
              </p>
            </div>
          </motion.section>

          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.a
              href="mailto:hello@retreever.dev"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className={`${cardClassName} ${accentHoverBorderClassName} group block transition-colors`}
            >
              <div className="flex items-start gap-4">
                <div className={`${iconContainerClassName} ${accentTextClassName}`}>
                  <Mail className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium uppercase tracking-[0.22em] text-text-muted">
                    Email us
                  </p>
                  <p className="text-2xl font-bold tracking-tight text-text-primary">
                    hello@retreever.dev
                  </p>
                  <p className="text-sm leading-6 text-text-paragraph">
                    Best for support requests, feedback, and implementation
                    questions.
                  </p>
                </div>
              </div>
            </motion.a>

            <motion.a
              href="https://www.linkedin.com/company/retreever/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className={`${cardClassName} ${accentHoverBorderClassName} group block transition-colors`}
            >
              <div className="flex h-full flex-col justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className={`${iconContainerClassName} ${accentTextClassName}`}>
                    <Linkedin className="h-6 w-6" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium uppercase tracking-[0.22em] text-text-muted">
                      LinkedIn
                    </p>
                    <p className="text-2xl font-bold tracking-tight text-text-primary">
                      Retreever on LinkedIn
                    </p>
                    <p className="text-sm leading-6 text-text-paragraph">
                      Use our company page for updates, outreach, or direct
                      contact.
                    </p>
                  </div>
                </div>

                <div
                  className={`inline-flex items-center gap-2 text-sm font-medium transition-transform group-hover:translate-x-0.5 ${accentTextClassName}`}
                >
                  Visit LinkedIn
                  <ExternalLink className="h-4 w-4" />
                </div>
              </div>
            </motion.a>
          </div>
        </div>
      </div>
    </main>
  );
}
