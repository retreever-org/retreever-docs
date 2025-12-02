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
    <footer className="w-full bg-(--dark-3)/30 border-t border-(--dark-border)/30 pt-20 pb-12 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Try Section */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="flex items-center gap-2 text-xl font-bold text-white mb-4">
              <Zap className="w-6 h-6 text-blue-400" />
              Try Retreever
            </h3>
            <div className="space-y-2">
              <a
                href="https://mvnrepository.com/artifact/dev.retreever/retreever-spring"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 p-4 rounded-xl bg-neutral-900/50 border border-neutral-800/50 hover:shadow-2xl hover:shadow-blue-300/10 hover:bg-neutral-900 transition-all duration-200 backdrop-blur-sm cursor-pointer"
              >
                <div className="w-10 h-10 bg-linear-to-br from-emerald-500/20 to-green-500/20 rounded-lg flex items-center justify-center border border-emerald-500/30 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <div className="font-semibold text-white group-hover:text-blue-400 transition-colors">retreever-spring</div>
                  <div className="text-sm text-neutral-400">Maven Central</div>
                </div>
                <svg className="w-4 h-4 ml-auto text-neutral-500 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </motion.div>

          {/* GitHub & Resources */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-xl font-bold text-white mb-4">Resources</h3>
            <div className="space-y-3">
              <a href="https://github.com/Retreever-org" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 p-3 rounded-lg hover:text-(--rt-blue-1) transition-all duration-200 text-neutral-300 cursor-pointer">
                <Github className="w-5 h-5" />
                GitHub Organization
              </a>
              <a href="/docs" className="group flex items-center gap-3 p-3 rounded-lg hover:text-(--rt-blue-1) transition-all duration-200 text-neutral-300 cursor-pointer">
                <BookOpen className="w-5 h-5" />
                Documentation
              </a>
              <a href="/changelog" className="group flex items-center gap-3 p-3 rounded-lg  hover:text-(--rt-blue-1) transition-all duration-200 text-neutral-300 cursor-pointer">
                <Code className="w-5 h-5" />
                Changelog
              </a>
            </div>
          </motion.div>

          {/* Company */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold text-white mb-4">Company</h3>
            <div className="space-y-3">
              <a href="/about" className="group flex items-center gap-3 p-3 rounded-lg  hover:text-(--rt-blue-1) transition-all duration-200 text-neutral-300 cursor-pointer">
                About
              </a>
              <a href="/privacy" className="group flex items-center gap-3 p-3 rounded-lg  hover:text-(--rt-blue-1) transition-all duration-200 text-neutral-300 cursor-pointer">
                <Shield className="w-5 h-5" />
                Privacy Policy
              </a>
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-xl font-bold text-white mb-4">Get in touch</h3>
            <div className="space-y-3">
              <a href="mailto:hello@retreever.com" className="group flex items-center gap-3 p-3 rounded-lg  hover:text-blue-400 transition-all duration-200 text-neutral-300 cursor-pointer">
                <Mail className="w-5 h-5" />
                hello@retreever.com
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-neutral-800/50 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-neutral-500">
          <motion.p
            className="text-neutral-400 leading-relaxed max-w-2xl text-center md:text-left"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            ❤️ Built for developers who are tired of stale documentation, duplicated effort, and YAML fatigue —{" "}
            <span className="font-semibold text-white">Retreever documents everything you need, instantly.</span>
          </motion.p>
          
          <div className="text-xs text-neutral-600">
            © 2025 Retreever. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
