import { motion, AnimatePresence } from "framer-motion";
import { HiX } from "react-icons/hi";

export default function FilterSidebar({
  title = "Filters",
  isOpen,
  onClose,
  children,
}) {
  return (
    <>
      {/* DESKTOP */}
      <aside className="hidden lg:block w-72 bg-slate-900/80 p-6 rounded-2xl h-fit sticky top-10">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        {children}
      </aside>

      {/* MOBILE */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-y-0 left-0 z-50 w-72 bg-slate-900/95 p-6 overflow-y-auto"
          >
            <button
              onClick={onClose}
              className="mb-4 p-2 bg-slate-800 rounded-xl"
            >
              <HiX className="w-6 h-6" />
            </button>

            <h2 className="text-xl font-bold mb-4">{title}</h2>
            {children}
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
