import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import GitHubLogo from '/images/github.svg';

const Cta: React.FC = () => {
  return (
    <section className="relative py-20 px-6 border-t-[0.01px] border-white/60">
      {/* Background subtle glow */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute left-1/2 -translate-x-1/2 top-10 w-[60%] h-[40%] bg-linear-to-br from-blue-500/15 via-purple-500/10 to-blue-500/15 blur-3xl opacity-40"
          animate={{ 
            scale: [1, 1.05, 1],
            opacity: [0.4, 0.5, 0.4]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: 'easeInOut' 
          }}
        />
      </div>

      {/* Content */}
      <div className="relative max-w-4xl mx-auto text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-semibold text-white mb-4"
        >
          Try Retreever Now
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed"
        >
          Add one dependency, start your Spring Boot app, and open{" "}
          <span className="text-blue-400 font-mono">/retreever</span>.  
          No YAML. No configuration. It just works.
        </motion.p>

        {/* Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row justify-center gap-4 mt-10"
        >
          <motion.a
            href="#installation"
            className="group relative inline-flex items-center gap-2 px-7 py-3 rounded-md font-medium text-slate-950 bg-linear-to-r from-blue-500 via-blue-500 to-blue-600 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105 transition-all duration-300 overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.4 }}
            />
            Get Started
            <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </motion.a>

          <motion.a
            href="https://github.com/Retreever-org"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-7 py-3 rounded-md font-medium border border-white/20 bg-white/5 text-slate-300 hover:text-white hover:border-white/40 hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <img src={GitHubLogo} alt="GitHub" className="h-4 w-4" />
            View on GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Cta;
