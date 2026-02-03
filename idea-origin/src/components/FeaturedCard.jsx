import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function FeaturedCard({
  to,
  image,
  title,
  subtitle,
  description,
  cta = "Read More →",
}) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      className="group"
    >
      <Link
        to={to}
        className="block w-[280px] h-[380px] relative
                   bg-slate-950 rounded-3xl overflow-hidden
                   border border-white/10
                   hover:border-cyan-400
                   hover:shadow-[0_0_35px_rgba(34,211,238,0.35)]
                   transition-all duration-300
                   flex flex-col"
      >
        {/* IMAGE */}
        <div className="relative h-[160px] overflow-hidden shrink-0">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover
                       group-hover:scale-110
                       transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t
                          from-slate-900/80 to-transparent" />
        </div>

        {/* CONTENT */}
        <div className="flex-1 p-5 flex flex-col justify-between">
          <div>
            <h3
              className="text-lg w-full font-bold text-white
                         truncate
                         group-hover:text-cyan-400 transition"
              title={title}
            >
              {title}
            </h3>

            {subtitle && (
              <p className="text-emerald-400 text-sm mt-1 truncate">
                {subtitle}
              </p>
            )}

            <p className="text-gray-400 mt-3 text-sm leading-relaxed line-clamp-3">
              {description}
            </p>
          </div>

          <span className="text-cyan-400 group-hover:text-emerald-400
                           font-medium text-sm mt-4">
            {cta}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
