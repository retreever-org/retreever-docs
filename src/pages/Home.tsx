import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { toDocHref } from "../dashboard/service/DocSearch";

const Home: React.FC = () => {
  const frameworkLinks = [
    { label: "Spring Boot", path: "spring-boot/get-started", enabled: true },
    { label: "NestJS", enabled: false },
    { label: "ExpressJs", enabled: false },
    { label: "FastAPI", enabled: false },
    { label: "Django", enabled: false },
    { label: "ASP .NET", enabled: false },
    { label: "Gin", enabled: false },
  ] as const;

  return (
    <main className="min-h-[calc(100vh-3rem)] bg-surface-700 text-text-primary">
      <section className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-5xl items-center px-6 py-16 sm:px-8 lg:px-12">
        <div className="w-full max-w-3xl">
          <div className="inline-flex items-center rounded-full border border-primary-500/25 bg-primary-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-300">
            Retreever Docs
          </div>

          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-text-primary sm:text-5xl">
            API documentation and testing, embedded in your application.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-text-paragraph sm:text-lg">
            Retreever runs inside the host application and exposes a Studio for
            generated API docs, request execution, environment variables, and
            workflow testing. The documentation here covers framework-specific
            setup, security behavior, runtime endpoints, and Studio features.
          </p>

          <p className="mt-4 max-w-2xl text-base leading-7 text-text-paragraph">
            Start with the framework you are integrating. Spring Boot
            documentation is available now, and the remaining framework guides
            are reserved here for the same structure.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            {frameworkLinks.map((framework) =>
              framework.enabled ? (
                <Link
                  key={framework.label}
                  to={toDocHref(framework.path)}
                  className="inline-flex items-center gap-2 rounded-full border border-primary-500/35 bg-primary-500/12 px-4 py-2.5 text-sm font-medium text-primary-100 transition-colors hover:bg-primary-500/18 hover:text-primary-50"
                >
                  <span>{framework.label}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ) : (
                <button
                  key={framework.label}
                  type="button"
                  disabled
                  className="inline-flex items-center rounded-full border border-surface-500/35 bg-surface-900/20 px-4 py-2.5 text-sm font-medium text-text-muted"
                >
                  {framework.label}
                </button>
              )
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
