"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Left side navigation
  const leftLinks = [
    { name: "Shop", href: "/" },
    { name: "Collections", href: "/" },
  ];

  // Right side navigation
  const rightLinks = [
    { name: "Login", href: "/login" },
    { name: "Register", href: "/register" },
  ];

  const allLinks = [...leftLinks, ...rightLinks];

  return (
    <>
      <nav className={`fixed w-full z-[100] transition-all duration-500 ease-in-out ${
        isScrolled ? "top-0 px-0" : "top-6 px-6"
      }`}>
        <div className={`container mx-auto relative transition-all duration-500 ${
          isScrolled ? "max-w-full" : "max-w-6xl"
        }`}>
          
          <div className={`
            flex items-center justify-between transition-all duration-500 ease-in-out
            bg-white/80 backdrop-blur-xl shadow-2xl relative
            ${isScrolled 
              ? "px-10 lg:px-20 py-4 rounded-none border-b border-[#F7BCB0]/30" 
              : "px-8 py-3 rounded-full border border-white/50"} 
          `}>
            
            {/* LEFT SECTION */}
            <div className="flex items-center gap-8 flex-1">
              <AnimatePresence mode="wait">
                {isScrolled ? (
                  <motion.div 
                    key="scrolled-logo"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <Link href="/" className="flex items-center gap-3 group">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden transition-transform group-hover:scale-110">
                         <img src="/img/logo.png" alt="SunCart" className="w-full h-full object-contain" />
                      </div>
                      <span className="text-xl font-black tracking-tighter text-[#C85555] uppercase italic">
                        SUN<span className="text-[#EAA624]">CART</span>
                      </span>
                    </Link>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="top-links-left"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hidden md:flex items-center gap-8"
                  >
                    {leftLinks.map((link) => (
                      <Link 
                        key={link.name} 
                        href={link.href} 
                        className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C85555]/70 hover:text-[#C85555] transition-colors"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
              
              <button onClick={() => setMobileMenuOpen(true)} className="md:hidden text-[#C85555]">
                <Menu size={24} />
              </button>
            </div>

            {/* CENTER SECTION (Only visible on scroll) */}
            {isScrolled && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="hidden lg:flex items-center gap-8"
              >
                {allLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    href={link.href} 
                    className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 hover:text-[#C85555] transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </motion.div>
            )}

            {!isScrolled && <div className="w-24 hidden md:block" />}

            {/* RIGHT SECTION */}
            <div className="flex items-center justify-end gap-6 md:gap-8 flex-1">
              <div className="hidden md:flex items-center gap-8">
                 {!isScrolled && rightLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    href={link.href} 
                    className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C85555]/70 hover:text-[#C85555] transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
              
              <Link href="#">
                <button className={`bg-[#EAA624] text-white rounded-full font-black uppercase tracking-widest hover:bg-[#C85555] transition-all flex items-center gap-2 shadow-lg active:scale-95 ${isScrolled ? 'px-6 py-2.5 text-[11px]' : 'px-5 py-2 text-[10px]'}`}>
                  <span className="hidden sm:inline">Bag</span>
                  <ShoppingBag size={14} />
                </button>
              </Link>
            </div>
          </div>

          {/* CENTRAL FLOATING LOGO (Static top state) */}
          <AnimatePresence>
            {!isScrolled && (
              <motion.div 
                initial={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[110]"
              >
                <Link href="/" className="relative group block">
                  <div className="absolute inset-0 bg-white rounded-full scale-125 shadow-xl group-hover:bg-[#AADCF2] transition-colors duration-500" />
                  <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center overflow-hidden transition-transform duration-500 group-hover:scale-110">
                    <img src="/img/logo.png" alt="Logo" className="w-full h-full object-contain" />
                  </div>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* --- MOBILE MENU --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="fixed inset-0 z-[200] bg-[#F7BCB0] flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-[#C85555] font-black tracking-tighter text-2xl uppercase italic">
                SUN<span className="text-[#EAA624]">CART</span>
              </span>
              <button onClick={() => setMobileMenuOpen(false)} className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-[#C85555]">
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col gap-6">
              {allLinks.map((link, idx) => (
                <motion.div key={link.name} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + idx * 0.05 }}>
                  <Link href={link.href} onClick={() => setMobileMenuOpen(false)} className="group flex items-center justify-between text-4xl font-black uppercase text-[#C85555] hover:text-white transition-colors">
                    {link.name}
                    <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}