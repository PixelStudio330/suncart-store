"use client";

import React from "react";
import { motion } from "framer-motion";
import { Flame, Zap, Star } from "lucide-react";

const OfferSlider = () => {
  return (
    <div className="relative z-[60] -mt-10 mb-10 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-3 rotate-[-1.5deg] scale-[1.03]"
      >
        {/* Primary Deal Ribbon */}
        <div className="flex bg-[#C85555] py-5 border-y-4 border-white shadow-[0_20px_50px_rgba(200,85,85,0.3)] overflow-hidden">
          <motion.div 
            animate={{ x: [0, -1000] }}
            transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
            className="flex whitespace-nowrap gap-20 items-center"
          >
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex items-center gap-8 text-white">
                <span className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic">
                  50% OFF!
                </span>
                <Flame className="w-10 h-10 text-[#EAA624] fill-[#EAA624]" />
                <span className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic">
                  Hot Deal
                </span>
                <Star className="w-10 h-10 text-white fill-white opacity-50" />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Secondary Info Ribbon */}
        <div className="flex bg-[#EAA624] py-3 border-y-2 border-white/30 overflow-hidden shadow-xl">
          <motion.div 
            animate={{ x: [-1000, 0] }}
            transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
            className="flex whitespace-nowrap gap-16 items-center"
          >
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex items-center gap-6 text-[#C85555]">
                <span className="text-[11px] font-black uppercase tracking-[0.5em]">
                  Limited Tropical Drop
                </span>
                <Zap className="w-4 h-4 fill-[#C85555]" />
                <span className="text-[11px] font-black uppercase tracking-[0.5em]">
                  Summer Essentials
                </span>
                <div className="w-2 h-2 rounded-full bg-white shadow-sm" />
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Decorative Blur for Depth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-1/2 bg-[#C85555]/20 blur-[100px] pointer-events-none -z-10" />
    </div>
  );
};

export default OfferSlider;