"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X, User, LogOut } from "lucide-react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await authClient.signOut();
    setMobileMenuOpen(false);
    router.push("/login");
  };

  const leftLinks = [
    { name: "Shop", href: "/" },
    { name: "Products", href: "/" },
  ];

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

            {!isScrolled && <div className="w-24 hidden md:block" />}

            {/* RIGHT SECTION */}
            <div className="flex items-center justify-end gap-4 md:gap-8 flex-1">
              {isPending ? (
                <div className="w-8 h-8 rounded-full bg-slate-100 animate-pulse" />
              ) : session ? (
                <div className="flex items-center gap-4">
                 
                  <Link href="/profile" className="flex items-center gap-2 group">
                    <div className="text-right hidden lg:block">
                      <p className="text-[10px] font-black text-[#C85555] uppercase leading-none">Hello,</p>
                      <p className="text-[12px] font-bold text-slate-700 truncate max-w-[80px]">{session.user.name?.split(' ')[0]}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full border-2 border-[#EAA624] overflow-hidden group-hover:scale-110 transition-transform">
                      <img 
                        src={session.user.image || "https://api.dicebear.com/7.x/adventurer/svg?seed=Nyra"} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="p-2 text-[#C85555] hover:bg-[#C85555]/10 rounded-full transition-colors"
                    title="Logout"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              ) : (
                <div className="hidden md:flex items-center gap-6">
                  <Link href="/login" className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C85555]/70 hover:text-[#C85555]">
                    Login
                  </Link>
                  <Link href="/register" className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#EAA624] hover:text-[#C85555]">
                    Register
                  </Link>
                </div>
              )}
              
              <Link href="#">
                <button className={`bg-[#EAA624] text-white rounded-full font-black uppercase tracking-widest hover:bg-[#C85555] transition-all flex items-center gap-2 shadow-lg active:scale-95 ${isScrolled ? 'px-6 py-2.5 text-[11px]' : 'px-5 py-2 text-[10px]'}`}>
                  <span className="hidden sm:inline">Bag</span>
                  <ShoppingBag size={14} />
                </button>
              </Link>
            </div>
          </div>

          {/* CENTRAL FLOATING LOGO */}
          <AnimatePresence>
            {!isScrolled && (
              <motion.div 
                initial={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[110]"
              >
                <Link href="/" className="relative group block">
                  <div className="absolute inset-0 bg-white rounded-full scale-125 shadow-xl group-hover:bg-[#F7BCB0]/40 transition-colors duration-500" />
                  <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center overflow-hidden transition-transform duration-500 group-hover:scale-110">
                    <img src="/img/logo.png" alt="Logo" className="w-full h-full object-contain" />
                  </div>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* MOBILE MENU */}
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
              {leftLinks.map((link) => (
                <Link key={link.name} href={link.href} onClick={() => setMobileMenuOpen(false)} className="text-4xl font-black uppercase text-[#C85555]">
                  {link.name}
                </Link>
              ))}
              
              <div className="h-px bg-[#C85555]/20 my-4" />
              
              {session ? (
                <>
                  
                  <Link href="/profile" onClick={() => setMobileMenuOpen(false)} className="text-4xl font-black uppercase text-white italic">Profile</Link>
                  <button onClick={handleLogout} className="text-left text-4xl font-black uppercase text-[#C85555]">Logout</button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="text-4xl font-black uppercase text-white italic">Login</Link>
                  <Link href="/register" onClick={() => setMobileMenuOpen(false)} className="text-4xl font-black uppercase text-[#EAA624]">Register</Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}