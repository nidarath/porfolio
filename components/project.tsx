"use client";
import { motion } from "framer-motion";

export default function Project() {
  return (
    <section id="work" className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h2 className="text-4xl font-bold text-black mb-10">Selected Work</h2>
        {/* Placeholder */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6">
          <div className="w-80 h-60 bg-white shadow-lg rounded-xl flex items-center justify-center text-gray-300">Project 1</div>
          <div className="w-80 h-60 bg-white shadow-lg rounded-xl flex items-center justify-center text-gray-300">Project 2</div>
        </div>
      </motion.div>
    </section>
  );
}