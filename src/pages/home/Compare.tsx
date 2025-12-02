import { motion } from "framer-motion";
import { comparisonData } from "./comparision";
import { MoveRight } from "lucide-react";

const Compare: React.FC = () => {
  return (
    <section id="features" className="relative py-4 px-4 md:py-10 md:px-16 bg-(--dark-3) overflow-hidden border-t border-(--dark-border)/20">
      {/* Subtle background linear glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-1/4 w-96 h-96 bg-linear-to-br from-(--rt-blue-1)/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute right-0 bottom-1/4 w-80 h-80 bg-linear-to-tl from-purple-500/5 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center max-w-4xl mx-auto mb-20"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-4xl md:text-5xl lg:text-6xl font-black bg-linear-to-r from-white via-blue-100 to-(--rt-blue-1) bg-clip-text text-transparent mb-6 leading-tight"
          style={{
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-100 via-blue-400-40% to-blue-600">
            How Retreever Compares
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          className="text-xl text-(--text-light)/70 max-w-2xl mx-auto"
        >
          Zero-config API documentation that discovers your entire Spring Boot
          ecosystem automatically
        </motion.p>
      </motion.div>

      <div className="flex justify-center items-center md:hidden w-full mr-auto mb-4">
        <div className="flex justify-center items-center rounded-4xl px-4 py-2 bg-neutral-700/20">
          <span className="mr-2 text-slate-400 font-medium">Scroll Right</span>{" "}
          <MoveRight className="mt-1 text-slate-400 font-medium" />
        </div>
      </div>

      {/* Table container slides up */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-7xl mx-auto overflow-x-auto md:border border-(--dark-border) rounded-3xl shadow-lg shadow-black/20"
      >
        <motion.table
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="w-full min-w-[720px] border-separate border-spacing-0 md:bg-neutral-900/20 rounded-3xl shadow-2xl shadow-black/40 overflow-hidden"
        >
          {/* Header */}
          <thead>
            <tr>
              <th className="sticky left-0 z-20 md:bg-neutral-900/20 text-left px-8 py-6 text-slate-200 text-lg font-semibold">
                Feature
              </th>

              {comparisonData.tools.map((tool) => (
                <th
                  key={tool.id}
                  className="px-6 py-6 text-center md:bg-neutral-900/20 text-slate-200 text-sm font-medium"
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-7 h-7 rounded-xl md:bg-neutral-900/20 flex items-center justify-center">
                      <img
                        src={tool.logo}
                        className="object-cover"
                        alt={tool.name}
                      />
                    </div>
                    <span className="tracking-tight">{tool.name}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Rows */}
          <tbody>
            {comparisonData.features.map((row) => (
              <tr
                key={row.feature}
                className="border-b border-(--dark-border) transition-colors duration-200 md:bg-neutral-900/20 hover:bg-neutral-900/20/10"
              >
                {/* Sticky Feature Column */}
                <td className="sticky left-0 z-10 px-8 py-4 font-medium text-slate-200 text-sm">
                  {row.feature}
                </td>

                {/* Tool Values */}
                {comparisonData.tools.map((tool) => {
                  const value = (row as any)[tool.id];

                  let iconClass = "text-(--text-light)/70";
                  let pillClass =
                    "inline-flex items-center justify-center px-5 py-3 md:px-3 md:py-1.5 rounded-full text-sm font-mono";

                  if (value.startsWith("✔")) {
                    iconClass = "text-green-400/80";
                    pillClass += " bg-green-500/10";
                  } else if (value.startsWith("✖")) {
                    iconClass = "text-red-400/80";
                    pillClass += " bg-red-500/10";
                  } else if (value.startsWith("⚠")) {
                    iconClass = "text-yellow-400/80";
                    pillClass += " bg-yellow-500/10";
                  }

                  return (
                    <td
                      key={tool.id}
                      className="px-6 py-4 text-center text-sm opacity-95"
                    >
                      <span className={pillClass}>
                        <span className={iconClass}>{value}</span>
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </motion.table>
      </motion.div>
    </section>
  );
};

export default Compare;
