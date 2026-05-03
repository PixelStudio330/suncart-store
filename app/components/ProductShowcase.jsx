"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ArrowRight } from "lucide-react";
import Link from "next/link";

const ProductShowcase = ({ products }) => {
  const showcaseProducts = products.slice(0, 3);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive detection properly
  useEffect(() => {
    const checkRes = () => setIsMobile(window.innerWidth < 768);
    checkRes();
    window.addEventListener("resize", checkRes);
    return () => window.removeEventListener("resize", checkRes);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % showcaseProducts.length);
  }, [showcaseProducts.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + showcaseProducts.length) % showcaseProducts.length);
  }, [showcaseProducts.length]);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 3500);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  const getPosition = (index) => {
    const diff = (index - currentIndex + showcaseProducts.length) % showcaseProducts.length;
    if (diff === 0) return "center";
    if (diff === 1) return "right";
    return "left";
  };

  // Modern variants using the isMobile state
  const variants = {
    center: { x: 0, scale: 1, zIndex: 30, opacity: 1, filter: "blur(0px)" },
    left: { 
      x: isMobile ? "-45%" : "-65%", 
      scale: isMobile ? 0.7 : 0.75, 
      zIndex: 10, 
      opacity: 0.7, 
      filter: "blur(2px)" 
    },
    right: { 
      x: isMobile ? "45%" : "65%", 
      scale: isMobile ? 0.7 : 0.75, 
      zIndex: 10, 
      opacity: 0.7, 
      filter: "blur(2px)" 
    },
  };

  return (
    <section className="py-12 md:py-24 overflow-hidden bg-white">
      <div className="container mx-auto px-4 md:px-6">
        
        <div 
          className="relative h-[550px] md:h-[650px] flex items-center justify-center touch-none"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence mode="popLayout">
            {showcaseProducts.map((product, index) => {
              const pos = getPosition(index);
              
              return (
                <motion.div
                  key={product.id}
                  initial={false}
                  animate={pos}
                  variants={variants}
                  transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                  // Add drag functionality for mobile/tablet swipe
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = offset.x;
                    if (swipe < -50) nextSlide();
                    else if (swipe > 50) prevSlide();
                  }}
                  onClick={() => pos !== 'center' && setCurrentIndex(index)}
                  className="absolute w-[80%] max-w-[300px] md:max-w-[400px] cursor-pointer"
                >
                  <motion.div 
                    whileHover={!isMobile ? { 
                      y: -15, 
                      scale: pos === 'center' ? 1.02 : 0.8,
                      zIndex: 50
                    } : {}}
                    className={`relative bg-white rounded-[2.5rem] md:rounded-[3.5rem] p-3 md:p-4 shadow-2xl border-4 transition-all duration-500 ${
                      pos === 'center' ? 'border-[#D64076]/20' : 'border-transparent'
                    }`}
                  >
                    {/* Badge */}
                    {pos === 'center' && (
                      <motion.div 
                        layoutId="badge"
                        className="absolute -top-3 -right-3 md:-top-6 md:-right-6 bg-[#EAA624] text-white p-4 md:p-6 rounded-full font-black text-[9px] md:text-xs uppercase tracking-tighter z-50 shadow-xl border-4 border-white rotate-12"
                      >
                        Hot Deal
                      </motion.div>
                    )}

                    <div className="relative aspect-[4/5] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden bg-[#FDF5F0] mb-4 md:mb-6">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover pointer-events-none"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                      
                      <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 text-white">
                        <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] mb-1 opacity-90">{product.brand}</p>
                        <h4 className="text-lg md:text-2xl font-black leading-tight uppercase tracking-tighter">{product.name}</h4>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className={`transition-all duration-500 ${pos === 'center' ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
                      <div className="flex justify-between items-center px-2 mb-4 md:mb-6">
                        <div className="flex items-center gap-1.5 bg-[#EAA624]/10 text-[#EAA624] px-3 py-1 md:px-4 md:py-2 rounded-2xl text-[10px] md:text-sm font-black">
                          <Star size={12} className="fill-[#EAA624]" /> {product.rating}
                        </div>
                        <span className="text-xl md:text-3xl font-black text-[#D64076]">${product.price}</span>
                      </div>

                      <Link href={`/products/${product.id}`} onClick={(e) => e.stopPropagation()}>
                        <button className="w-full bg-[#D64076] text-white py-3.5 md:py-5 rounded-[1.5rem] md:rounded-[2rem] font-black text-[11px] md:text-base uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-[#D64076]/20">
                          View Details
                          <ArrowRight size={16} />
                        </button>
                      </Link>
                    </div>

                    {pos !== 'center' && (
                      <div className="text-center py-1">
                        <span className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-400">Tap to Switch</span>
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-2 mt-4">
          {showcaseProducts.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                currentIndex === i ? "w-8 md:w-12 bg-[#D64076]" : "w-1.5 bg-slate-200"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;