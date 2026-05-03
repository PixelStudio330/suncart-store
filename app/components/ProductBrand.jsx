"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import brandData from "@/data/brands.json"; 

const Popular = () => {
  const brands = [...brandData, ...brandData];

  if (!brands.length) return null;

  return (
    <section className="px-4 mt-32 relative overflow-hidden bg-white pb-24">
      {/* Background Blurs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#EAA624]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#C85555]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="relative flex flex-col items-center mb-20 text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-[#EAA624]/10 text-[#EAA624] px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-8 border border-[#EAA624]/20 inline-flex items-center gap-2"
        >
          <Sparkles className="w-3 h-3" /> Elite Showcase
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-black text-[#C85555] uppercase tracking-tighter mb-4 leading-none"
        >
          Popular <span className="text-[#EAA624]">Brands</span>
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-slate-500 font-medium max-w-md leading-relaxed"
        >
          The brands that help us deliver your summer essentials with style and care.
        </motion.p>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full overflow-hidden py-12 group">
        {/* Edge Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-r from-white via-white/40 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-l from-white via-white/40 to-transparent z-20 pointer-events-none" />

        <motion.div 
          className="flex gap-12 w-max"
          animate={{ x: [0, -1920] }}
          transition={{
            x: { repeat: Infinity, repeatType: "loop", duration: 50, ease: "linear" },
          }}
          whileHover={{ animationPlayState: "paused" }}
        >
          {brands.map((brand, index) => (
            <motion.div 
              key={`${brand.id}-${index}`} 
              whileHover={{ y: -12, scale: 1.02 }}
              style={{ 
                backgroundColor: `${brand.color}15`, 
                borderColor: brand.color,
              }}
              className="relative w-80 h-52 backdrop-blur-md rounded-[3.5rem] border-4 flex flex-col items-center justify-center transition-all duration-500 overflow-hidden group/card"
            >
              {/* Glass Shine */}
              <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />

              <div className="relative z-10 flex flex-col items-center">
                <motion.div 
                   animate={{ y: [0, -8, 0] }}
                   transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: (index % 6) * 0.2 }}
                   className="text-6xl mb-3 drop-shadow-xl"
                >
                  {brand.logo}
                </motion.div>
                
                <div className="text-center px-6">
                  <h4 className="font-black text-2xl text-slate-900 leading-tight tracking-tighter">
                    {brand.name}
                  </h4>
                  <p className="text-[10px] text-slate-700 font-bold uppercase tracking-widest mt-2 bg-white/60 px-3 py-1 rounded-full border border-white/40">
                    {brand.desc}
                  </p>
                </div>
              </div>

              {/* Decorative Corner Detail */}
              <div 
                style={{ backgroundColor: brand.color }}
                className="absolute bottom-6 right-8 w-2 h-2 rounded-full opacity-40" 
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Footer Branding Pills */}
      <div className="mt-16 flex flex-wrap justify-center gap-4">
         {['☀️ Stay Golden', '🌊 Ride the Wave', '🍦 Stay Cool'].map((text, i) => (
           <span key={i} className="text-[10px] font-black uppercase tracking-[0.3em] text-[#C85555]/60 border border-[#C85555]/10 bg-[#C85555]/5 px-6 py-2 rounded-full">
             {text}
           </span>
         ))}
      </div>
    </section>
  );
};

export default Popular;