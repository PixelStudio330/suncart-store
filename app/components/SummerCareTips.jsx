"use client";

import { motion } from "framer-motion";
import { Droplets, Sun, Sparkles, Wind } from "lucide-react";
// Import the JSON directly from your data folder
import tips from "@/data/tips.json"; 

const iconMap = {
  Droplets: <Droplets className="w-5 h-5" />,
  Sun: <Sun className="w-5 h-5" />,
  Wind: <Wind className="w-5 h-5" />,
  Sparkles: <Sparkles className="w-5 h-5" />,
};

export default function SummerCareTips() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-white overflow-hidden">
      <div className="container mx-auto px-6 text-center">
        
        {/* RADIANT SUN HEADER */}
        <div className="relative mb-20 inline-block">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1], 
              rotate: 360,
              opacity: [0.2, 0.4, 0.2] 
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="w-40 h-40 bg-[#EAA624] rounded-full blur-[50px] absolute -top-8 -left-8 pointer-events-none"
          />
          
          <div className="relative z-10">
             <motion.div 
                whileHover={{ scale: 1.1, rotate: 10 }}
                className="w-20 h-20 bg-[#EAA624] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg border-4 border-white cursor-help"
             >
                <Sun className="w-10 h-10 text-white animate-pulse" />
             </motion.div>
             
             <h2 className="text-4xl md:text-5xl font-black text-[#C85555] uppercase italic tracking-tighter">
                Sun-Kissed Wisdom
             </h2>
             <p className="text-slate-400 text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] mt-3">
                Straight from the Source
             </p>
          </div>
        </div>

        {/* DYNAMIC TIPS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {tips.map((tip, index) => (
            <motion.div
              key={tip.id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                delay: index * 0.1, 
                type: "spring", 
                stiffness: 100 
              }}
              whileHover={{ y: -12 }}
              className="group bg-white/80 backdrop-blur-sm p-10 rounded-[3.5rem] border border-orange-100 shadow-sm hover:shadow-2xl transition-all duration-500"
            >
              <div className={`w-16 h-16 ${tip.color} rounded-[1.5rem] flex items-center justify-center mb-8 mx-auto transition-all duration-500 group-hover:rotate-[15deg] group-hover:scale-110 shadow-inner`}>
                {iconMap[tip.icon] || <Sparkles className="w-6 h-6" />}
              </div>

              <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight mb-4 italic">
                {tip.text}
              </h3>
              
              <p className="text-slate-500 text-sm font-medium leading-relaxed text-center">
                {tip.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}