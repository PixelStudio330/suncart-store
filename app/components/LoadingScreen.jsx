"use client";

import { motion } from "framer-motion";
import { Sun } from "lucide-react";

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#FFFBF0]"
    >
      <div className="relative flex flex-col items-center gap-6">
        {/* Pulsing Sun Icon */}
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 10, -10, 0] 
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="relative"
        >
          {/* Outer Glow Effect */}
          <motion.div 
            animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.4, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute inset-0 bg-[#EAA624] blur-2xl rounded-full"
          />
          
          <Sun 
            size={64} 
            className="text-[#EAA624] relative z-10" 
            strokeWidth={1.5}
          />
        </motion.div>

        {/* Loading Text */}
        <div className="flex flex-col items-center">
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[#C85555] font-black italic text-xl uppercase tracking-[0.2em] ml-2"
          >
            Loading<span className="text-[#EAA624]">...</span>
          </motion.h2>
          
          {/* Subtle Progress Bar */}
          <motion.div className="w-24 h-[2px] bg-slate-200 mt-4 rounded-full overflow-hidden">
            <motion.div 
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="w-full h-full bg-[#EAA624]"
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}