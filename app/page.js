"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import products from '@/data/products.json';
import ProductCard from './components/ProductCard';
import ProductShowcase from './components/ProductShowcase'; 
import ProductBrand from './components/ProductBrand';
import Footer from './components/Footer';
import SummerCareTips from './components/SummerCareTips';
import OfferSlider from './components/OfferSlider';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">

      {/* Hero Banner Section */}
      <section className="relative flex flex-col items-center justify-center min-h-[85vh] sm:min-h-[90vh] md:min-h-screen px-4 text-center overflow-hidden bg-[#F7BCB0]">
        {/* Background Layer */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <img 
            src="/img/hero.png" 
            className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay" 
            alt="Summer Background" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-white/40 z-10" />
        </div>

        {/* Hero Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: [0, -15, 0] }} 
          transition={{
            opacity: { duration: 0.8 },
            y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
          }}
          className="relative z-30 flex flex-col items-center -mt-8 sm:-mt-20 md:-mt-32 w-full max-w-[95vw] lg:max-w-none"
        >
          <motion.span 
            whileHover={{ scale: 1.05 }}
            className="bg-[#C85555] text-white px-5 sm:px-6 md:px-8 py-2 md:py-3 rounded-full text-[8px] sm:text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] mb-6 sm:mb-10 md:mb-16 inline-flex items-center gap-3 shadow-[0_20px_40px_rgba(200,85,85,0.2)] border border-white/30 backdrop-blur-sm"
          >
            <span className="flex items-center gap-2 md:gap-3">
              <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-[#EAA624]" /> Tropical Drop Live
            </span>
          </motion.span>
          
          <h1 className="relative flex flex-col items-center w-full select-none">
            {/* 
                Text Scaling Logic:
                - Mobile: 18vw / 14vw
                - Tablet (sm/md): 16vw / 13vw (prevents overflow on iPad)
                - Desktop (lg): 13rem / 9rem
            */}
            <span className="text-[18vw] sm:text-[16vw] lg:text-[13rem] font-black uppercase tracking-[-0.07em] leading-[0.8] lg:leading-[0.85] text-white drop-shadow-[0_15px_30px_rgba(0,0,0,0.2)]">
              SunCart
            </span>
            <span className="text-[14vw] sm:text-[13vw] lg:text-[9rem] font-black uppercase tracking-[-0.04em] leading-[0.8] lg:leading-[0.9] text-white/90 drop-shadow-[0_10px_20px_rgba(0,0,0,0.15)]">
              Store
            </span>

            <div className="relative mt-6 sm:mt-10 lg:mt-12 group">
              <span className="text-lg sm:text-2xl md:text-4xl lg:text-5xl text-white font-serif italic lowercase tracking-tight drop-shadow-md px-4 block">
                your summer essentials 
                <span className="block sm:inline font-light opacity-80 sm:ml-4">— delivered.</span>
              </span>
              
              {/* Badge adjusted for Tablet proximity */}
              <div className="absolute -top-6 -right-2 sm:-top-8 sm:-right-10 md:-right-20 lg:-right-24 rotate-12 bg-white/20 backdrop-blur-lg border border-white/40 px-2 sm:px-3 py-0.5 md:py-1 rounded-lg lg:rounded-xl shadow-lg">
                <span className="text-[7px] sm:text-[9px] md:text-[12px] font-bold text-white italic uppercase tracking-widest">
                  EST. 2026
                </span>
              </div>
            </div>
          </h1>
        </motion.div>

        {/* Floating Elements Layer - Optimized for Tablet viewports */}
        <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
          <motion.img 
            src="/img/coco.png" 
            animate={{ y: [-12, 12, -12], rotate: [-15, -12, -15] }} 
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} 
            className="absolute w-full h-full object-contain scale-[0.3] sm:scale-[0.4] lg:scale-[0.5] top-[5%] lg:top-[10%] left-[-35%] sm:left-[-30%] lg:left-[-39%] drop-shadow-2xl origin-center" 
            alt=""
          />
          <motion.img 
            src="/img/green-coc.png" 
            animate={{ y: [-12, 12, -12], rotate: [18, 20, 18] }} 
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} 
            className="absolute w-full h-full object-contain scale-[0.25] sm:scale-[0.35] lg:scale-[0.45] top-[10%] lg:top-[15%] left-[-20%] sm:left-[-15%] lg:left-[-30%] drop-shadow-2xl origin-center opacity-40 sm:opacity-70 lg:opacity-100" 
            alt=""
          />
          <motion.img 
            src="/img/shell.png" 
            animate={{ y: [10, -10, 10], rotate: [20, 25, 20] }} 
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} 
            className="absolute w-full h-full object-contain scale-[0.12] sm:scale-[0.2] lg:scale-[0.25] top-[-25%] lg:top-[-20%] right-[-35%] sm:right-[-30%] lg:right-[-40%] drop-shadow-xl origin-center" 
            alt=""
          />
          <motion.img 
            src="/img/starwhite.png" 
            animate={{ y: [-15, 15, -15], rotate: [-10, -5, -10] }} 
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} 
            className="absolute w-full h-full object-contain scale-[0.18] sm:scale-[0.25] lg:scale-[0.3] top-[-30%] lg:top-[-30%] right-[-30%] sm:right-[-25%] lg:right-[-33%] drop-shadow-xl origin-center" 
            alt=""
          />
        </div>

        {/* Wave Divider responsive height scaling */}
        <div className="absolute bottom-0 left-0 w-full z-40 translate-y-[1px]">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-[calc(130%+1.3px)] h-[60px] sm:h-[100px] md:h-[140px] lg:h-[180px] fill-white">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
          </svg>
        </div>
      </section>

      {/* Product Sections with Tablet-Specific Grid Gaps */}
      <div className="relative bg-white pt-6 sm:pt-10 pb-8 sm:pb-12">
        <OfferSlider />
      </div>

      <section className="relative z-50 px-4 sm:px-6 pb-12 -mt-4 sm:-mt-8 pt-8 sm:pt-12">
        <div className="container mx-auto">
          <div className="flex flex-col items-center mb-10 sm:mb-16 text-center">
            <motion.h2 className="text-3xl sm:text-5xl lg:text-7xl font-black text-[#C85555] uppercase tracking-tighter mb-4">
              The Summer <span className="text-[#EAA624]">Selection</span>
            </motion.h2>
            <p className="text-slate-500 font-medium max-w-md leading-relaxed text-xs sm:text-sm lg:text-base">
              Hand-picked essentials crafted for the sun-seekers and the dreamers.
            </p>
          </div>

          {/* Grid remains 2 cols for tablet (sm/md) for better legibility */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8 lg:gap-10">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer and Tips */}
      <div className="relative bg-gradient-to-b from-white to-[#FFF9F0]">
        <SummerCareTips />
      </div>
      <div className="-mt-8 sm:-mt-16">
        <ProductBrand />
      </div>
      <Footer />
    </main>
  );
}