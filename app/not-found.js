"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Compass, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FFFBF0] flex items-center justify-center px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md"
      >
        {/* Decorative Element */}
        <div className="relative inline-block mb-8">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-[#EAA624]/10 rounded-full scale-150 blur-xl"
          />
          <Compass size={80} className="text-[#C85555] relative z-10" strokeWidth={1} />
        </div>

        {/* Error Text */}
        <h1 className="text-8xl font-black text-[#C85555] opacity-20 italic">404</h1>
        <h2 className="text-3xl font-black text-[#C85555] uppercase italic tracking-tighter mt-[-2rem] mb-4">
          Lost in the <span className="text-[#EAA624]">Clouds?</span>
        </h2>
        
        <p className="text-slate-500 font-medium mb-10 leading-relaxed">
          The page you&apos;re looking for has drifted away. Let&apos;s get you back to the sunshine. ☀️
        </p>

        {/* Home Redirect Button */}
        <Link href="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#C85555] text-white px-10 py-4 rounded-full font-black uppercase tracking-widest shadow-xl hover:bg-[#EAA624] transition-colors flex items-center gap-3 mx-auto"
          >
            <Home size={18} />
            Back to Home
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}