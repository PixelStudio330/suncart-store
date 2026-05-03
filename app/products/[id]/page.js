"use client";

import React, { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import products from "@/data/products.json";
import { motion } from "framer-motion";
import { 
  Star, 
  Package, 
  ArrowLeft, 
  ShoppingCart, 
  ShieldCheck, 
  Zap, 
  Heart,
  Share2,
  Check
} from "lucide-react";
import Link from "next/link";

export default function ProductDetails({ params }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7BCB0]/10">
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-12 h-12 border-4 border-[#C85555] border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!session) return null;

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-black text-[#C85555] italic uppercase tracking-tighter">Lost in the dunes?</h1>
        <Link href="/" className="mt-8 bg-[#EAA624] text-white px-8 py-4 rounded-full font-black uppercase tracking-widest shadow-lg">
          Return to Oasis
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white overflow-x-hidden selection:bg-[#F7BCB0]">
      {/* Decorative Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#F7BCB0]/20 rounded-full blur-[80px] md:blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-[#008080]/10 rounded-full blur-[80px] md:blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-24">
        {/* Breadcrumb & Actions */}
        <div className="flex justify-between items-center mb-8 md:mb-12">
          <Link href="/" className="group flex items-center gap-3 text-[#C85555] font-black uppercase tracking-[0.2em] text-[9px] md:text-[10px]">
            <div className="w-8 h-8 rounded-full border border-[#C85555]/20 flex items-center justify-center group-hover:bg-[#C85555] group-hover:text-white transition-all">
              <ArrowLeft size={14} />
            </div>
            <span className="hidden sm:inline">Back to Shop</span>
          </Link>
          <div className="flex gap-3">
            {/* Pop of Magenta for the Heart */}
            <button className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-slate-400 hover:text-[#D100D1] hover:bg-[#D100D1]/5 transition-all">
              <Heart size={18} />
            </button>
            <button className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-slate-400 hover:text-[#008080] transition-all">
              <Share2 size={18} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-20 items-start">
          
          {/* Left: Image Section */}
          <div className="lg:col-span-7 lg:sticky lg:top-32">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative"
            >
              <div className="absolute -inset-2 md:-inset-4 bg-gradient-to-br from-[#F7BCB0]/40 to-[#008080]/10 rounded-[2.5rem] md:rounded-[4rem] blur-2xl opacity-50" />
              <div className="relative aspect-[4/5] rounded-[2rem] md:rounded-[3.5rem] overflow-hidden border-[6px] md:border-[12px] border-white shadow-xl bg-slate-50">
                <motion.img 
                  layoutId={`img-${product.id}`}
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
                
                <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 bg-[#D100D1] text-white px-4 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl font-black uppercase tracking-widest text-[8px] md:text-[10px] shadow-xl flex items-center gap-2">
                  <Zap size={12} className="fill-white" /> Trending
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Content Section */}
          <div className="lg:col-span-5 pt-0 lg:pt-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
                <span className="px-3 py-1 rounded-full bg-[#EAA624]/10 text-[#EAA624] text-[9px] font-black uppercase tracking-[0.2em]">
                  {product.brand}
                </span>
                <span className="px-3 py-1 rounded-full bg-[#008080]/10 text-[#008080] text-[9px] font-black uppercase tracking-[0.2em]">
                  {product.category}
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl xl:text-7xl font-black text-[#C85555] uppercase tracking-tighter italic leading-[0.9] mb-6 md:mb-8">
                {product.name}
              </h1>

              {/* Stats Bar - Responsive Grid */}
              <div className="grid grid-cols-3 gap-2 md:gap-4 p-2 bg-slate-50/50 backdrop-blur-md rounded-2xl md:rounded-3xl border border-slate-100 mb-8 md:mb-10">
                <div className="bg-white p-3 md:p-4 rounded-xl md:rounded-2xl shadow-sm flex flex-col items-center">
                  <div className="flex items-center gap-1 text-[#EAA624] mb-0.5 md:mb-1">
                    <Star size={12} className="fill-[#EAA624]" />
                    <span className="font-black text-xs md:text-sm">{product.rating}</span>
                  </div>
                  <span className="text-[7px] md:text-[9px] font-bold text-slate-400 uppercase tracking-widest text-center">Rating</span>
                </div>
                <div className="bg-white p-3 md:p-4 rounded-xl md:rounded-2xl shadow-sm flex flex-col items-center">
                  {/* Teal for Stock logic */}
                  <span className="font-black text-[#008080] text-xs md:text-sm mb-0.5 md:mb-1">{product.stock}</span>
                  <span className="text-[7px] md:text-[9px] font-bold text-slate-400 uppercase tracking-widest text-center">In Stock</span>
                </div>
                <div className="bg-white p-3 md:p-4 rounded-xl md:rounded-2xl shadow-sm flex flex-col items-center">
                   <Check size={14} className="text-[#D100D1] mb-0.5 md:mb-1" />
                  <span className="text-[7px] md:text-[9px] font-bold text-slate-400 uppercase tracking-widest text-center">Official</span>
                </div>
              </div>

              <p className="text-slate-500 text-base md:text-lg leading-relaxed mb-8 md:mb-10 font-medium">
                {product.description}
              </p>

              <div className="flex items-baseline gap-3 mb-8 md:mb-12 border-b border-slate-100 pb-6 md:pb-8">
                <span className="text-5xl md:text-7xl font-black text-[#C85555] tracking-tighter leading-none">${product.price}</span>
                <span className="text-[#008080] font-bold uppercase text-[9px] md:text-[10px] tracking-[0.2em]">Verified Listing</span>
              </div>

              {/* Action Button */}
              <div className="space-y-4">
                <motion.button 
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full bg-[#C85555] text-white py-5 md:py-8 rounded-2xl md:rounded-[2.5rem] font-black uppercase tracking-[0.2em] text-[10px] md:text-xs shadow-lg flex items-center justify-center gap-4 group transition-colors hover:bg-[#D100D1]"
                >
                  <ShoppingCart size={18} className="group-hover:rotate-12 transition-transform" />
                  Secure the Summer
                </motion.button>
                
                <p className="text-center text-[8px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Secure checkout powered by SunCart
                </p>
              </div>

              {/* Mini Features - Responsive Stack */}
              <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 md:p-6 rounded-2xl md:rounded-[2rem] bg-[#008080]/5 border border-[#008080]/10">
                  <Package className="text-[#008080] mb-2 md:mb-3" size={20} />
                  <h4 className="font-black text-[9px] md:text-[10px] uppercase tracking-widest text-[#008080]">Global Shipping</h4>
                  <p className="text-[9px] md:text-[10px] text-slate-500 font-medium mt-1">Free delivery over $200</p>
                </div>
                <div className="p-5 md:p-6 rounded-2xl md:rounded-[2rem] bg-[#D100D1]/5 border border-[#D100D1]/10">
                  <ShieldCheck className="text-[#D100D1] mb-2 md:mb-3" size={20} />
                  <h4 className="font-black text-[9px] md:text-[10px] uppercase tracking-widest text-[#D100D1]">Premium Quality</h4>
                  <p className="text-[9px] md:text-[10px] text-slate-500 font-medium mt-1">100% Sourced by Nyra</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}