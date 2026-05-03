"use client";

import React, { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import products from "@/data/products.json";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Star, 
  Package, 
  ArrowLeft, 
  ShoppingCart, 
  ShieldCheck, 
  Zap, 
  Heart,
  Share2
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
      <div className="min-h-screen flex flex-col items-center justify-center space-y-6">
        <h1 className="text-6xl font-black text-[#C85555] italic">Lost in the dunes?</h1>
        <Link href="/" className="bg-[#EAA624] text-white px-8 py-4 rounded-full font-black uppercase tracking-widest">
          Return to Oasis
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white overflow-hidden selection:bg-[#F7BCB0]">
      {/* Decorative Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#F7BCB0]/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-[#EAA624]/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24">
        {/* Breadcrumb & Quick Actions */}
        <div className="flex justify-between items-center mb-12">
          <Link href="/" className="group flex items-center gap-3 text-[#C85555] font-black uppercase tracking-[0.2em] text-[10px]">
            <div className="w-8 h-8 rounded-full border border-[#C85555]/20 flex items-center justify-center group-hover:bg-[#C85555] group-hover:text-white transition-all">
              <ArrowLeft size={14} />
            </div>
            Back to Shop
          </Link>
          <div className="flex gap-4">
            <button className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-slate-400 hover:text-[#C85555] transition-colors">
              <Heart size={18} />
            </button>
            <button className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-slate-400 hover:text-[#C85555] transition-colors">
              <Share2 size={18} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left: Image Gallery Style */}
          <div className="lg:col-span-7 sticky top-32">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-br from-[#F7BCB0]/40 to-[#EAA624]/20 rounded-[4rem] blur-2xl opacity-50" />
              <div className="relative aspect-[4/5] rounded-[3.5rem] overflow-hidden border-[12px] border-white shadow-[0_40px_100px_-20px_rgba(200,85,85,0.15)] bg-slate-50">
                <motion.img 
                  layoutId={`img-${product.id}`}
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
                
                {/* Floating Badge */}
                <div className="absolute bottom-8 right-8 bg-[#C85555] text-white px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl flex items-center gap-2">
                  <Zap size={14} className="fill-white" /> Trending Now
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Content Editorial Style */}
          <div className="lg:col-span-5 pt-4">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="inline-block px-4 py-1.5 rounded-full bg-[#EAA624]/10 text-[#EAA624] text-[10px] font-black uppercase tracking-[0.3em] mb-6">
                {product.brand} • {product.category}
              </div>

              <h1 className="text-6xl xl:text-7xl font-black text-[#C85555] uppercase tracking-tighter italic leading-[0.85] mb-8">
                {product.name}
              </h1>

              {/* Stats Bar */}
              <div className="flex gap-4 p-2 bg-slate-50/50 backdrop-blur-md rounded-3xl border border-slate-100 mb-10">
                <div className="flex-1 bg-white p-4 rounded-2xl shadow-sm flex flex-col items-center">
                  <div className="flex items-center gap-1 text-[#EAA624] mb-1">
                    <Star size={14} className="fill-[#EAA624]" />
                    <span className="font-black text-sm">{product.rating}</span>
                  </div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Rating</span>
                </div>
                <div className="flex-1 bg-white p-4 rounded-2xl shadow-sm flex flex-col items-center">
                  <span className="font-black text-[#C85555] text-sm mb-1">{product.stock}</span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Left</span>
                </div>
                <div className="flex-1 bg-white p-4 rounded-2xl shadow-sm flex flex-col items-center">
                   <ShieldCheck size={16} className="text-emerald-500 mb-1" />
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Verified</span>
                </div>
              </div>

              <p className="text-slate-500 text-lg leading-relaxed mb-10 font-medium">
                {product.description}
              </p>

              <div className="flex items-baseline gap-3 mb-12 border-b border-slate-100 pb-8">
                <span className="text-7xl font-black text-[#C85555] tracking-tighter leading-none">${product.price}</span>
                <span className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em]">Ready to ship</span>
              </div>

              {/* Interaction Block */}
              <div className="space-y-4">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-[#C85555] text-white py-8 rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-xs shadow-[0_20px_40px_-10px_rgba(200,85,85,0.4)] flex items-center justify-center gap-4 group"
                >
                  <ShoppingCart size={20} className="group-hover:rotate-12 transition-transform" />
                  Secure the Summer
                </motion.button>
                
                <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest pt-2">
                  Complimentary Gift Wrapping on all orders
                </p>
              </div>

              {/* Mini Features */}
              <div className="mt-16 grid grid-cols-2 gap-4">
                <div className="p-6 rounded-[2rem] bg-[#F7BCB0]/10 border border-[#F7BCB0]/20">
                  <Package className="text-[#C85555] mb-3" size={20} />
                  <h4 className="font-black text-[10px] uppercase tracking-widest text-[#C85555]">Quick Ship</h4>
                  <p className="text-[10px] text-slate-500 font-medium mt-1">2-3 Day Delivery</p>
                </div>
                <div className="p-6 rounded-[2rem] bg-[#EAA624]/10 border border-[#EAA624]/20">
                  <ShieldCheck className="text-[#EAA624] mb-3" size={20} />
                  <h4 className="font-black text-[10px] uppercase tracking-widest text-[#EAA624]">Eco-Friendly</h4>
                  <p className="text-[10px] text-slate-500 font-medium mt-1">Sustainable Sourcing</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}