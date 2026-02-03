import { motion } from "framer-motion";

export default function SkeletonScientistCard() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-slate-900 rounded-2xl p-6"
    >
      {/* Image skeleton */}
      <div className="h-40 rounded-xl bg-slate-800 animate-pulse mb-4"></div>

      {/* Name skeleton */}
      <div className="h-4 w-3/4 bg-slate-800 rounded animate-pulse mb-2"></div>

      {/* Field skeleton */}
      <div className="h-3 w-1/2 bg-slate-800 rounded animate-pulse"></div>
    </motion.div>
  );
}
