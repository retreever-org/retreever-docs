import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { toDocHref } from "../dashboard/service/DocSearch";

const accentTextClassName = "text-[rgb(var(--docs-accent-strong))]";
const accentSoftClassName = "bg-[rgb(var(--docs-accent-soft)/0.10)]";
const accentBorderClassName = "border-[rgb(var(--docs-accent-border)/0.28)]";
const accentHoverBorderClassName =
  "hover:border-[rgb(var(--docs-accent-border)/0.45)]";
const accentHoverSoftClassName =
  "hover:bg-[rgb(var(--docs-accent-soft)/0.16)]";
const accentHoverTextClassName =
  "hover:text-[rgb(var(--docs-accent-strong))]";
const surfacePillClassName =
  "border border-surface-500/35 bg-surface-900/20 text-text-primary";

const Home: React.FC = () => {
  const frameworkLinks = [
    { label: "Spring Boot", path: "spring-boot/get-started" },
    { label: "NestJS", path: "nestjs/get-started" },
    { label: "ExpressJS", path: "expressjs/get-started" },
    { label: "FastAPI", path: "fastapi/get-started" },
    { label: "Django", path: "django/get-started" },
    { label: "ASP.NET", path: "asp-net/get-started" },
    { label: "Gin", path: "gin/get-started" },
  ] as const;

  return (
    <main className="min-h-[calc(100vh-3rem)] bg-surface-700 text-text-primary">
      <section className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-5xl items-center px-6 py-16 sm:px-8 lg:px-12">
        <div className="w-full max-w-3xl">
          <div
            className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider ${accentBorderClassName} ${accentSoftClassName} ${accentTextClassName}`}
          >
            RETREEVER DOCS
          </div>

          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-text-primary sm:text-5xl">
            Retreever Studio Documentation and Tutorials
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-text-paragraph sm:text-lg">
            Retreever is a runtime-native API Studio that enables backend teams
            to generate API documentation from running services, execute
            requests in the same application context, manage authorization,
            inspect responses, and validate real API workflows without
            rebuilding the API surface manually.
          </p>

          <p className="mt-4 max-w-2xl text-base leading-7 text-text-paragraph">
            Explore the documentation to understand framework integration,
            secure enablement, deployment behavior, Studio features, and safe
            configuration across local, shared, and production-like
            environments.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            {frameworkLinks.map((framework) => (
              <Link
                key={framework.label}
                to={toDocHref(framework.path)}
                className={`group inline-flex items-center rounded-full px-4 py-2.5 text-sm font-medium transition-all ${surfacePillClassName} ${accentHoverBorderClassName} ${accentHoverSoftClassName} ${accentHoverTextClassName}`}
              >
                <span>{framework.label}</span>
                <span className="ml-0 inline-flex w-0 overflow-hidden opacity-0 transition-all duration-200 group-hover:ml-2 group-hover:w-4 group-hover:opacity-100">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
