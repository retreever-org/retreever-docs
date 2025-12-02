import { motion } from "framer-motion";
import { ChevronRight, PlayCircle, Sparkles } from "lucide-react";
import GitHubDarkLogo from "/github-dark.svg";
import RetreeverIcon from "/retreever-icon-box.svg";

const LOGO_BLUE = "#3B8BFF";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-(--dark-3) text-white">
      {/* Animated gradient background */}
      
      {/* Floating orbs */}
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

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/5 px-4 py-1.5 backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-200">
              Zero Config API Testing
            </span>
          </div>
        </motion.div>

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 flex items-center gap-3"
        >
          <motion.img
            src={RetreeverIcon}
            alt="Retreever"
            className="h-12 w-12 rounded-2xl rotate-6"
            whileHover={{ rotate: 6, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          <span className="text-2xl font-bold tracking-tight">Retreever</span>
        </motion.div>

        {/* Main heading with gradient text */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6 text-5xl font-black leading-tight tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
        >
          <span className="bg-linear-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
            Test APIs
          </span>
          <br />
          <span className="bg-linear-to-r from-blue-200 via-blue-400 to-blue-500 bg-clip-text text-transparent">
            Instantly
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-10 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg"
        >
          Instant API Documentation & Testing for Spring Boot — zero config,
          always live, beautifully simple.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <motion.a
            href="https://github.com/Retreever-org"
            target="_blank"
            rel="noreferrer"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-8 py-4 text-sm font-semibold text-slate-950 transition-all"
            style={{
              backgroundColor: LOGO_BLUE,
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              className="absolute inset-0 bg-white"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
              style={{ opacity: 0.2 }}
            />
            <img
              src={GitHubDarkLogo}
              alt="GitHub"
              className="relative z-10 h-5 w-5"
            />
            <span className="relative z-10 font-mono text-xs uppercase tracking-widest">
              View Source
            </span>
            <ChevronRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </motion.a>

          <motion.button
            type="button"
            className="group inline-flex items-center gap-2.5 rounded-full border border-slate-700/50 bg-slate-900/50 px-8 py-4 text-sm font-semibold text-slate-200 backdrop-blur-sm transition-all hover:border-slate-600 hover:bg-slate-800/50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <PlayCircle className="h-5 w-5 text-blue-400 transition-transform group-hover:scale-110" />
            See How It Works
          </motion.button>
        </motion.div>

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
      </div>
    </section>
  );
};

export default Hero;
