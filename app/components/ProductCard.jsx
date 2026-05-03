"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Heart, ArrowRight } from "lucide-react";
import Link from 'next/link';

const ProductCard = ({ product }) => {

  const colors = {
    dragonfruit: "#D64076",
    teal: "#008080",
    sun: "#EAA624",
    tangerine: "#FF8C42"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group flex flex-col h-full"
    >
      <div className="bg-white rounded-[3rem] p-6 shadow-sm hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-[#D64076]/10 relative overflow-hidden flex flex-col flex-1">
        
        {/* Image Section */}
        <div className="overflow-hidden rounded-[2.5rem] mb-6 aspect-square w-full relative bg-[#FDF5F0]">
          <motion.img
            whileHover={{ scale: 1.05 }}
            src={product.image}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          <div className="absolute top-5 right-5 z-20">
            <button className="p-3 rounded-full bg-white shadow-lg text-[#D64076] hover:bg-[#D64076] hover:text-white transition-colors duration-300">
              <Heart size={18} />
            </button>
          </div>

          <div className="absolute top-5 left-5 z-20">
            <span className="bg-[#008080] text-white font-black px-4 py-1.5 rounded-full text-[9px] uppercase tracking-widest shadow-md">
              {product.category || "Essential"}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col flex-1">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h3 className="font-black text-2xl text-slate-900 leading-tight uppercase tracking-tighter group-hover:text-[#D64076] transition-colors duration-300">
                {product.name}
              </h3>
              <p className="text-[11px] font-black text-[#008080] uppercase tracking-widest mt-1 italic opacity-80">
                {product.brand}
              </p>
            </div>
            <span className="text-2xl font-black text-[#D64076] ml-2">
              ${product.price}
            </span>
          </div>

          <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 mb-8 font-medium italic">
            {product.description}
          </p>

          {/* Action Area */}
          <div className="mt-auto pt-6 border-t border-dashed border-slate-100 flex items-center justify-between gap-4">
            <div className="flex items-center gap-1 font-black text-[#EAA624] bg-[#EAA624]/10 px-3 py-1.5 rounded-xl text-xs">
              <Star size={14} className="fill-[#EAA624]" /> {product.rating}
            </div>

            <Link href={`/products/${product.id}`} className="flex-1">
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="w-full bg-[#D64076] text-white py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-[0.15em] shadow-lg shadow-[#D64076]/30 flex items-center justify-center gap-2 hover:bg-[#008080] transition-all duration-300"
              >
                <span>View Details</span>
                <ArrowRight size={16} />
              </motion.button>
            </Link>
          </div>
        </div>

        {/* Stock Alert */}
        {product.stock < 10 && (
          <div className="absolute top-[35%] -right-1 bg-[#FF8C42] text-white text-[9px] font-black px-4 py-1.5 rounded-l-full uppercase tracking-tighter shadow-lg">
            Only {product.stock} left!
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;