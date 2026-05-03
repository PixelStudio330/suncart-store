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
      <section className="relative flex flex-col items-center justify-center min-h-screen px-4 text-center overflow-hidden bg-[#F7BCB0]">
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
          animate={{ 
            opacity: 1, 
            y: [0, -15, 0], 
          }} 
          transition={{
            opacity: { duration: 0.8 },
            y: {
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
          className="relative z-30 flex flex-col items-center -mt-24 md:-mt-32"
        >
          <motion.span 
            whileHover={{ scale: 1.05 }}
            className="bg-[#C85555] text-white px-8 py-3 rounded-full text-[11px] font-black uppercase tracking-[0.5em] mb-16 inline-flex items-center gap-3 shadow-[0_20px_40px_rgba(200,85,85,0.2)] border border-white/30 backdrop-blur-sm"
          >
            <span className="flex items-center gap-3">
              <Sparkles className="w-4 h-4 text-[#EAA624]" /> Tropical Drop Live
            </span>
          </motion.span>
          
          <h1 className="relative flex flex-col items-center">
            <span className="text-[15vw] md:text-[13rem] font-black uppercase tracking-[-0.07em] leading-[0.85] text-white drop-shadow-[0_15px_30px_rgba(0,0,0,0.2)]">
              SunCart
            </span>
            <span className="text-[12vw] md:text-[9rem] font-black uppercase tracking-[-0.04em] leading-[0.9] text-white/90 drop-shadow-[0_10px_20px_rgba(0,0,0,0.15)]">
              Store
            </span>

            <div className="relative mt-12 group">
              <span className="text-3xl md:text-5xl text-white font-serif italic lowercase tracking-tight drop-shadow-md">
                your summer essentials 
                <span className="block md:inline font-light opacity-80 md:ml-4">— delivered.</span>
              </span>
              
              <div className="absolute -top-10 -right-16 md:-right-24 rotate-12 bg-white/20 backdrop-blur-lg border border-white/40 px-4 py-1 rounded-xl shadow-lg">
                <span className="text-[12px] font-bold text-white italic uppercase tracking-widest">
                  EST. 2026
                </span>
              </div>
            </div>
          </h1>
        </motion.div>

        {/* Floating Elements Layer */}
        <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
          <motion.img 
            src="/img/coco.png" 
            animate={{ y: [-12, 12, -12], rotate: [-15, -12, -15] }} 
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} 
            className="absolute w-full h-full object-contain scale-[0.5] top-[10%] left-[-30%] md:left-[-39%] drop-shadow-2xl origin-center" 
            alt=""
          />
          <motion.img 
            src="/img/green-coc.png" 
            animate={{ y: [-12, 12, -12], rotate: [18, 20, 18] }} 
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} 
            className="absolute w-full h-full object-contain scale-[0.45] top-[15%] left-[-15%] md:left-[-30%] drop-shadow-2xl origin-center" 
            alt=""
          />
          <motion.img 
            src="/img/shell.png" 
            animate={{ y: [10, -10, 10], rotate: [20, 25, 20] }} 
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} 
            className="absolute w-full h-full object-contain scale-[0.25] top-[-20%] right-[-30%] md:right-[-40%] drop-shadow-xl origin-center" 
            alt=""
          />
          <motion.img 
            src="/img/starwhite.png" 
            animate={{ y: [-15, 15, -15], rotate: [-10, -5, -10] }} 
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} 
            className="absolute w-full h-full object-contain scale-[0.3] top-[-30%] right-[-25%] md:right-[-33%] drop-shadow-xl origin-center" 
            alt=""
          />
        </div>

        <div className="absolute bottom-0 left-0 w-full z-40 translate-y-[1px]">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-[calc(135%+1.3px)] h-[180px] fill-white">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
          </svg>
        </div>
      </section>

      <div className="relative bg-white pt-10 pb-12">
        <OfferSlider />
      </div>

      {/* Dynamic Products Grid Section */}
      <section className="relative z-50 px-6 pb-12 -mt-8 pt-12">
        <div className="container mx-auto">
          <div className="flex flex-col items-center mb-16 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-black text-[#C85555] uppercase tracking-tighter mb-4"
            >
              The Summer <span className="text-[#EAA624]">Selection</span>
            </motion.h2>
            <p className="text-slate-500 font-medium max-w-md leading-relaxed">
              Hand-picked essentials crafted for the sun-seekers and the dreamers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Products Showcase */}
      <section className="relative z-50 bg-white pt-10 pb-6"> 
        <div className="container mx-auto">
          <div className="flex flex-col items-center mb-10 text-center px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="bg-[#EAA624]/10 text-[#EAA624] px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-6 border border-[#EAA624]/20"
            >
              Trending Now
            </motion.div>
            
            <div className="flex flex-col items-center text-center">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-5xl md:text-7xl font-black text-[#C85555] uppercase tracking-tighter mb-4"
              >
                Popular <span className="text-[#EAA624]">Products</span>
              </motion.h2>
              <p className="text-slate-500 font-medium max-w-md leading-relaxed">
                Community&apos;s top picks that are making waves this week.
              </p>
            </div>
          </div>
          <ProductShowcase products={products} />
        </div>
      </section>

      
<div className="relative bg-gradient-to-b from-white to-[#FFF9F0]">
  <SummerCareTips />
</div>
      {/* Brand Partners Showcase */}
      <div className="-mt-16">
        <ProductBrand />
      </div>
      <div>
        <Footer />
      </div>

    </main>
  );
}