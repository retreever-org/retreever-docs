import { ExternalLink, Mail, Package } from "lucide-react";

const currentYear = new Date().getFullYear();

const footerSections = [
  {
    title: "Guides",
    links: [
      { label: "Spring Boot Get Started", href: "/spring-boot/get-started" },
      { label: "Security", href: "/spring-boot/security" },
      { label: "Environment Automation", href: "/spring-boot/environment-automation" },
      { label: "Studio Storage", href: "/spring-boot/studio-storage" },
      { label: "Runtime Endpoints", href: "/spring-boot/runtime-endpoints" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation Home", href: "/" },
      { label: "Experience", href: "https://exp.retreever.dev" },
      { label: "Help", href: "/help" },
      { label: "Official Site", href: "https://retreever.dev" },
    ],
  },
  {
    title: "Open Source",
    links: [
      { label: "GitHub", href: "https://github.com/retreever-org" },
      {
        label: "Maven Central",
        href: "https://mvnrepository.com/artifact/dev.retreever/retreever",
      },
      { label: "Contributing", href: "/contribution/spring-boot" },
      { label: "MIT License", href: "https://opensource.org/license/mit" },
    ],
  },
];

const badges = [
  "OSS",
  "MIT Licensed",
  "No telemetry by default",
  "Same-origin Studio",
];

const isExternalLink = (href: string) => /^https?:\/\//.test(href);

type FooterLink = {
  label: string;
  href: string;
};

const FooterLink = ({ link }: { link: FooterLink }) => {
  const external = isExternalLink(link.href);

  return (
    <a
      href={link.href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group inline-flex items-center gap-1.5 text-sm text-text-muted transition-colors duration-200 hover:text-[rgb(var(--docs-accent-strong))]"
    >
      <span>{link.label}</span>
      {external && (
        <ExternalLink className="h-3.5 w-3.5 opacity-0 transition-opacity duration-200 group-hover:opacity-80" />
      )}
    </a>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="relative overflow-hidden border-t border-surface-500/30 bg-surface-700">
      <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[42rem] -translate-x-1/2 rounded-full bg-primary-500/10 blur-[120px]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-10 pt-14 sm:px-8 sm:pt-16 lg:px-10">
        <div className="grid min-w-0 gap-12 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:items-start lg:gap-14">
          <div className="flex min-w-0 flex-col items-start">
            <div className="flex items-center gap-4">
              <div className="flex h-13 w-13 items-center justify-center rounded-2xl shadow-[0_0_30px_rgba(31,120,255,0.35)]">
                <img
                  src="/images/icon512v2.png"
                  alt="Retreever Logo"
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="min-w-0">
                <h2 className="text-2xl font-bold leading-none text-text-primary">
                  Retreever
                </h2>
                <p className="mt-1 text-sm text-text-muted">
                  Runtime Native API Studio
                </p>
              </div>
            </div>

            <p className="mt-7 max-w-lg text-base leading-7 text-text-paragraph">
              Embedded API documentation, testing, and workflow tooling
              generated directly from your running application. Always live,
              always aligned with the runtime.
            </p>

            <div className="mt-7 w-full max-w-lg rounded-2xl border border-surface-500/45 bg-surface-panel/70 p-5 shadow-[0_20px_70px_rgba(0,0,0,0.22)]">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary-500/25 bg-primary-500/10 text-primary-400">
                  <Package className="h-5 w-5" />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-semibold text-text-primary">
                    Embedded Studio. Same-origin. No Retreever account required.
                  </p>
                  <p className="mt-2 text-sm leading-6 text-text-paragraph">
                    Add{" "}
                    <code className="rounded-md border border-surface-500/50 bg-surface-900 px-1.5 py-0.5 font-mono text-xs text-text-primary">
                      dev.retreever:retreever
                    </code>
                    , run your app, and open{" "}
                    <code className="rounded-md border border-surface-500/50 bg-surface-900 px-1.5 py-0.5 font-mono text-xs text-text-primary">
                      /retreever
                    </code>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid min-w-0 max-w-[58rem] grid-cols-1 gap-10 sm:grid-cols-2 xl:grid-cols-[repeat(4,minmax(0,11rem))] xl:gap-12">
            {footerSections.map((section) => (
              <div key={section.title} className="min-w-0">
                <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-text-primary">
                  {section.title}
                </h3>

                <div className="mt-5 flex flex-col gap-3.5">
                  {section.links.map((link) => (
                    <FooterLink key={`${section.title}-${link.label}`} link={link} />
                  ))}
                </div>
              </div>
            ))}

            <div className="min-w-0">
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-text-primary">
                Connect
              </h3>

              <div className="mt-5 flex flex-col gap-3.5">
                <a
                  href="mailto:hello@retreever.dev"
                  className="inline-flex min-w-0 items-center gap-2.5 text-sm text-text-muted transition-colors duration-200 hover:text-[rgb(var(--docs-accent-strong))]"
                >
                  <Mail className="h-4 w-4 shrink-0" />
                  <span className="min-w-0 break-words">hello@retreever.dev</span>
                </a>
                <a
                  href="https://www.linkedin.com/company/retreever/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-w-0 items-center gap-2.5 text-sm text-text-muted transition-colors duration-200 hover:text-[rgb(var(--docs-accent-strong))]"
                >
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center text-xs font-bold">
                    in
                  </span>
                  <span>LinkedIn</span>
                  <ExternalLink className="h-3.5 w-3.5 opacity-70" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 h-px w-full bg-linear-to-r from-transparent via-white/10 to-transparent" />

        <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            {badges.map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-surface-500/35 bg-surface-100/4 px-3 py-1 text-xs font-medium text-text-muted"
              >
                {badge}
              </span>
            ))}
          </div>

          <p className="text-sm text-text-muted">
            &copy; {currentYear} Retreever. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
