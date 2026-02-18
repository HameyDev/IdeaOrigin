import { useRef } from "react";
import { useInView } from "framer-motion";
import CountUp from "./CountUp";

export default function StatCard({ item }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div
      ref={ref}
      className="group relative bg-slate-900/70 backdrop-blur border border-white/10 rounded-3xl p-10 hover:border-cyan-400 hover:shadow-[0_0_40px_rgba(34,211,238,0.25)] transition-all duration-300"
    >
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-400/10 to-emerald-400/10 opacity-0 group-hover:opacity-100 transition" />

      <div className="relative z-10">
        <h3 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-emerald-400">
          <CountUp value={item.value} start={isInView} />
          {item.suffix}
        </h3>

        <p className="mt-3 text-lg font-semibold text-white">
          {item.label}
        </p>

        <p className="mt-2 text-sm text-gray-400">
          {item.desc}
        </p>
      </div>
    </div>
  );
}
