import { motion } from 'framer-motion';
import { ChevronRight, Sparkles, Play } from 'lucide-react';

const Intro: React.FC = () => {
  return (
    <section className="relative border-t border-(--dark-border)/20 py-24 px-6 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute right-0 top-1/4 w-80 h-80 bg-linear-to-br from-(--rt-blue-1)/10 via-purple-500/5 to-(--rt-blue-1)/10 rounded-full blur-3xl opacity-50 max-w-none"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.6, 0.5]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: 'easeInOut' 
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-4">
        {/* Left Side: Text */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-(--text-light)/70 leading-relaxed max-w-lg"
          >
            Retreever automatically discovers your Spring Boot controllers, models,
            generics, and exception handlers to generate a complete, always-accurate
            API documentation model — <span className="font-mono text-(--rt-blue-1)">without annotations, YAML, or configuration</span>.
          </motion.p>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-4 text-lg text-(--text-light)/50 leading-relaxed max-w-lg"
          >
            Ships with a modern built-in testing interface to send requests,
            edit payloads, and debug endpoints instantly.
          </motion.p>
        </motion.div>

        {/* Right Side: Realistic Retreever UI Mock */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          className="relative"
        >
          {/* Realistic Retreever UI mock */}
          <div className="relative bg-(--dark-2)/50 border border-(--dark-border) rounded-2xl p-8 backdrop-blur-xl shadow-2xl shadow-black/30 max-w-full">
            {/* Header bar */}
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/10">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 bg-red-400/60 rounded-full" />
                <div className="w-3 h-3 bg-yellow-400/60 rounded-full" />
                <div className="w-3 h-3 bg-green-400/60 rounded-full" />
              </div>
              <div className="flex-1 h-5 bg-linear-to-r from-(--rt-blue-1)/40 to-purple-500/40 rounded-full mx-4" />
              <Sparkles className="h-4 w-4 text-(--rt-blue-1)" />
            </div>

            {/* Endpoint card */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs font-mono rounded">POST</span>
                <span className="font-mono text-sm text-slate-300">/api/users</span>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-(--dark-3)/50 border border-(--dark-border) rounded p-2">
                  <div className="text-slate-400 mb-1">Status</div>
                  <div className="font-mono text-green-400 text-sm">200 OK</div>
                </div>
                <div className="bg-(--dark-3)/50 border border-(--dark-border) rounded p-2">
                  <div className="text-slate-400 mb-1">Time</div>
                  <div className="font-mono text-blue-400 text-sm">47ms</div>
                </div>
              </div>
            </div>

            {/* Test button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-(--rt-blue-1)/90 to-(--rt-blue-2)/90 border border-(--rt-blue-1)/50 text-white font-medium py-3 px-4 rounded-lg backdrop-blur-sm shadow-lg shadow-(--rt-blue-1)/20 hover:shadow-xl hover:shadow-(--rt-blue-1)/30 transition-all duration-300"
            >
              <Play className="h-4 w-4" />
              Send Request
              <ChevronRight className="h-4 w-4" />
            </motion.button>

            {/* Network flow indicator - contained */}
            <div className="absolute -bottom-3 -right-3 w-20 h-20 border-2 border-(--rt-blue-1)/30 rounded-full bg-(--rt-blue-1)/10" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Intro;
