import React from "react";
import { motion } from "framer-motion";
import {
  Github,
  BookOpen,
  Zap,
  Shield,
  Code,
  Mail,
} from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="relative w-full overflow-hidden border-t border-surface-500/20 bg-surface-700/30 pb-12 pt-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-text-primary">
              <Zap className="h-6 w-6 text-text-primary" />
              Try Retreever
            </h3>
            <div className="space-y-2">
              <a
                href="https://mvnrepository.com/artifact/dev.retreever/retreever"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex cursor-pointer items-center gap-3 rounded-xl border border-surface-500/20 bg-surface-900/20 p-4 backdrop-blur-sm transition-all duration-200 hover:bg-surface-900/30 hover:shadow-2xl hover:shadow-surface-500/10"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-surface-500/20 bg-surface-900/20 transition-transform group-hover:scale-110">
                  <BookOpen className="h-5 w-5 text-text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-text-primary transition-colors group-hover:text-text-primary">
                    retreever
                  </div>
                  <div className="text-sm text-text-muted">Maven Central</div>
                </div>
                <svg
                  className="ml-auto h-4 w-4 text-text-muted transition-colors group-hover:text-text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
          </motion.div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="mb-4 text-xl font-bold text-text-primary">
              Resources
            </h3>
            <div className="space-y-3">
              <a
                href="https://github.com/retreever-org"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex cursor-pointer items-center gap-3 rounded-lg p-3 text-text-muted transition-all duration-200 hover:text-text-primary"
              >
                <Github className="h-5 w-5" />
                GitHub Organization
              </a>
              <a
                href="/docs"
                className="group flex cursor-pointer items-center gap-3 rounded-lg p-3 text-text-muted transition-all duration-200 hover:text-text-primary"
              >
                <BookOpen className="h-5 w-5" />
                Documentation
              </a>
              <a
                href="/changelog"
                className="group flex cursor-pointer items-center gap-3 rounded-lg p-3 text-text-muted transition-all duration-200 hover:text-text-primary"
              >
                <Code className="h-5 w-5" />
                Changelog
              </a>
            </div>
          </motion.div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="mb-4 text-xl font-bold text-text-primary">
              Company
            </h3>
            <div className="space-y-3">
              <a
                href="/about"
                className="group flex cursor-pointer items-center gap-3 rounded-lg p-3 text-text-muted transition-all duration-200 hover:text-text-primary"
              >
                About
              </a>
              <a
                href="/privacy"
                className="group flex cursor-pointer items-center gap-3 rounded-lg p-3 text-text-muted transition-all duration-200 hover:text-text-primary"
              >
                <Shield className="h-5 w-5" />
                Privacy Policy
              </a>
            </div>
          </motion.div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="mb-4 text-xl font-bold text-text-primary">
              Get in touch
            </h3>
            <div className="space-y-3">
              <a
                href="mailto:hello@retreever.dev"
                className="group flex cursor-pointer items-center gap-3 rounded-lg p-3 text-text-muted transition-all duration-200 hover:text-text-primary"
              >
                <Mail className="h-5 w-5" />
                hello@retreever.dev
              </a>
            </div>
          </motion.div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-surface-500/20 pt-8 text-sm text-text-muted md:flex-row">
          <motion.p
            className="max-w-2xl text-center leading-relaxed text-text-muted md:text-left"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Built for developers who are tired of stale documentation,
            duplicated effort, and YAML fatigue.
            <span className="font-semibold text-text-primary">
              {" "}
              Retreever documents everything you need, instantly.
            </span>
          </motion.p>

          <div className="text-xs text-text-muted">
            © 2025 Retreever. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
