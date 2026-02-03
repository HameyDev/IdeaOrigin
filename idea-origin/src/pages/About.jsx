import { motion } from "framer-motion";

export default function About() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="bg-slate-950 text-white min-h-screen">

      {/* HEADER */}
      <motion.section
        className="py-16 text-center px-6 sm:px-12 lg:px-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
          About Discovery Stories
        </h1>
        <p className="mt-4 text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
          Behind every great idea is a human story.
        </p>
      </motion.section>

      {/* MAIN CONTENT */}
      <section className="max-w-5xl mx-auto px-6 sm:px-0 pb-20 space-y-12 sm:space-y-16">

        {/* WHO WE ARE */}
        <motion.div
          className="bg-slate-900 rounded-2xl p-6 sm:p-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
            What is Discovery Stories?
          </h2>
          <p className="text-gray-300 leading-relaxed text-sm sm:text-base md:text-lg">
            Discovery Stories is a platform that brings science to life by
            sharing the human journeys behind the world’s greatest discoveries.
            We focus not just on the results, but on the struggles, failures,
            and moments of inspiration that shaped history.
          </p>
        </motion.div>

        {/* MISSION */}
        <motion.div
          className="bg-slate-900 rounded-2xl p-6 sm:p-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
            Our Mission
          </h2>
          <p className="text-gray-300 leading-relaxed text-sm sm:text-base md:text-lg">
            Our mission is to make science more engaging and relatable.
            We believe that when people understand the story behind an idea,
            learning becomes more meaningful and inspiring.
          </p>
        </motion.div>

        {/* WHY THIS PROJECT */}
        <motion.div
          className="bg-slate-900 rounded-2xl p-6 sm:p-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
            Why This Project?
          </h2>
          <p className="text-gray-300 leading-relaxed text-sm sm:text-base md:text-lg">
            Many students see science as difficult and boring.
            This project was created to change that — by turning discoveries
            into stories that anyone can enjoy and remember.
          </p>
        </motion.div>

        {/* VISION */}
        <motion.div
          className="bg-slate-900 rounded-2xl p-6 sm:p-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
            Our Vision
          </h2>
          <p className="text-gray-300 leading-relaxed text-sm sm:text-base md:text-lg">
            We envision a future where learning science feels like reading
            a great story — full of curiosity, emotion, and wonder.
            In the future, Discovery Stories will include interactive timelines,
            videos, and community contributions.
          </p>
        </motion.div>

      </section>
    </div>
  );
}
