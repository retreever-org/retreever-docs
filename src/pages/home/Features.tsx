import { motion } from "framer-motion";
import { useRef } from "react";
import { Zap, Wand2, ShieldCheck, Network } from "lucide-react";

export default function Features() {
  const features = [
    {
      title: "Instant, Accurate Docs",
      description:
        "Retreever discovers controllers, generics, errors, and validation rules — without annotations or YAML.",
      icon: Zap,
    },
    {
      title: "One-Click Testing",
      description:
        "Send requests, edit payloads, tweak headers, and inspect responses in the same UI. Zero context switching.",
      icon: Wand2,
    },
    {
      title: "Security-Aware",
      description:
        "Supports auth headers and lets you test secured endpoints exactly as your app expects them.",
      icon: ShieldCheck,
    },
    {
      title: "Stays Updated, Always",
      description:
        "Every endpoint, schema, and error is synced with your code on startup. No drift. No stale docs.",
      icon: Network,
    },
  ];

  const ref = useRef(null);

  return (
    <section className="w-full py-20 text-white border-t border-(--dark-border)/30">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-center leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Retreever gives you{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-blue-600">
            API docs that never lie
          </span>{" "}
          — instantly.
        </motion.h2>

        <motion.p
          className="text-gray-300 text-center mt-4 text-lg max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Your code is the source of truth. Retreever reflects your controllers,
          models, generics, and exceptions.
        </motion.p>

        {/* Features Grid */}
        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16"
        >
          {features.map((f, index) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                className="flex flex-col items-start bg-neutral-900/40 border border-neutral-800 p-6 rounded-2xl backdrop-blur-sm hover:-translate-y-3 transition duration-500 ease-in-out hover:shadow-blue-400/10 hover:shadow-2xl"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeInOut", delay: index * 0.15 - 1 }}
              >
                <Icon className="w-8 h-8 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm">{f.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
