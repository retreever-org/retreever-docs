import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Code2, Play } from "lucide-react";

export const Quickstart: React.FC = () => {
  return (
    <section className="w-full py-32 flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-emerald-500/5 rounded-full blur-xl animate-ping" />
      </div>

      <div className="text-center max-w-4xl px-6 relative z-10">
        {/* Main heading with icon */}
        <motion.div
          className="w-full inline-flex justify-center items-center gap-2 mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h2 className="w-full text-3xl md:text-6xl lg:text-7xl font-black bg-linear-to-r from-blue-100 via-blue-400-30% to-blue-600 bg-clip-text text-transparent leading-tight">
              Get Started in Seconds
            </h2>
          </div>
        </motion.div>

        {/* Punchy subtitle */}
        <motion.p
          className="mt-6 text-xl md:text-2xl text-[#A8B2C7] max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Drop one dependency into your Spring Boot app. No config. No
          annotations.
          <span className="font-semibold text-white">
            {" "}
            Docs appear instantly.
          </span>
        </motion.p>

        {/* Quickstart steps */}
        <motion.div
          className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center gap-3 px-6 py-3 bg-neutral-900/50 border border-neutral-800/50 rounded-xl backdrop-blur-sm">
            <Code2 className="w-5 h-5 text-emerald-400" />
            <span className="text-sm font-mono text-emerald-300">
              Add Maven dependency
            </span>
          </div>
          <div className="w-12 h-px bg-linear-to-r from-transparent via-neutral-700 to-transparent sm:block hidden" />
          <div className="flex items-center gap-3 px-6 py-3 bg-neutral-900/50 border border-neutral-800/50 rounded-xl backdrop-blur-sm">
            <Play className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-mono text-blue-300">
              Run your app
            </span>
          </div>
          <div className="w-12 h-px bg-linear-to-r from-transparent via-neutral-700 to-transparent sm:block hidden" />
          <div className="flex items-center gap-3 px-6 py-3 bg-neutral-900/50 border border-neutral-800/50 rounded-xl backdrop-blur-sm">
            <Zap className="w-5 h-5 text-purple-400" />
            <span className="text-sm font-mono text-purple-300">
              🚀 Instant docs
            </span>
          </div>
        </motion.div>

        {/* Enhanced CTA */}
        <motion.button
          className="
            group mt-16 inline-flex items-center gap-3
            px-10 py-5 rounded-2xl
            text-white font-bold text-xl
            bg-linear-to-r from-blue-500 to-blue-600
            hover:shadow-[0_0_35px_rgba(59,130,246,0.5)]
            hover:shadow-blue-500/30
            transition-all duration-300
            backdrop-blur-sm border border-blue-500/30
            relative overflow-hidden cursor-pointer
          "
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>Try Retreever</span>
          <motion.div
            className="w-5 h-5 shrink-0"
            initial={{ x: 0 }}
            animate={{ x: 4 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowRight size={20} />
          </motion.div>

          {/* Shine effect */}
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-gull transition-transform duration-700" />
        </motion.button>

        {/* Trust indicator */}
        <motion.p
          className="mt-10 text-sm text-[#64748B] flex items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          Integrates with Spring Boot Apps • Versions 6.x & 7.x
        </motion.p>
      </div>
            {/* Animated grid pattern */}
            
            <motion.div
              className="pointer-events-none absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl"
              animate={{
                y: [0, 30, 0],
                x: [0, 20, 0],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="pointer-events-none absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl"
              animate={{
                y: [0, -30, 0],
                x: [0, -20, 0],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            {/* Floating elements for visual interest */}
        <div className="pointer-events-none absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-0.5 bg-linear-to-r from-blue-400/30 via-blue-400/50 to-blue-400/30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
              animate={{
                x: [0, 100, 0],
                opacity: [0, 1, 0],
                scale: [1, 1.3, 1],
              }}
              transition={{
                x: {
                  duration: 4 + Math.random() * 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
                opacity: {
                  duration: 2 + Math.random() * 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
                scale: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
                delay: Math.random() * 2,
              }}
              // Arrowhead using pseudo-element
              data-testid={`arrow-${i}`}
            >
              <div
                className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-l-[6px] border-transparent border-r-0 border-t-[3px]"
                style={{
                  transform: `rotate(${Math.random() * 20 - 10}deg)`, // slight angle variation
                }}
              />
            </motion.div>
          ))}
        </div>
    </section>
  );
};
