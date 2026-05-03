"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Heart, ArrowRight } from "lucide-react";
import Link from 'next/link';

const ProductCard = ({ product }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group flex flex-col h-full"
    >
      <div className="bg-white rounded-[3rem] p-5 shadow-sm group-hover:shadow-xl transition-all duration-300 border-2 border-transparent group-hover:border-dragonfruit/10 relative overflow-hidden flex flex-col flex-1">
        
        {/* Product Image Container */}
        <div className="overflow-hidden rounded-[2.5rem] mb-6 aspect-square w-full relative bg-gray-50 z-0">
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
            src={product.image}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          {/* Heart/Favorite Button */}
          <div className="absolute top-4 right-4 z-20">
            <button className="p-3 rounded-full bg-white/80 backdrop-blur-md text-dragonfruit hover:bg-dragonfruit hover:text-white transition-all duration-300 shadow-sm">
              <Heart size={16} />
            </button>
          </div>

          <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
            <span className="bg-white/90 backdrop-blur text-dragonfruit font-black px-3 py-1.5 rounded-full text-[10px] shadow-sm uppercase tracking-tighter">
              Quick View
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="px-2 flex flex-col flex-1 relative z-10">
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1 mr-2">
              {/* Changed text-neutral to a vibrant Hibiscus/Dragonfruit tone */}
              <h3 className="font-black text-xl text-dragonfruit leading-tight line-clamp-1 uppercase tracking-tighter">
                {product.name}
              </h3>
              {/* Changed Tangerine to a deep summery Teal for contrast */}
              <p className="text-[10px] font-bold text-[#008080] uppercase tracking-widest mt-1 italic">
                {product.brand}
              </p>
            </div>
            <span className="text-2xl font-black text-dragonfruit flex-shrink-0">
              ${product.price}
            </span>
          </div>

          {/* Action Bar - Fixed Visibility */}
          <div className="mt-auto pt-5 border-t border-dashed border-gray-100 flex justify-between items-center gap-2">
            <div className="flex items-center gap-1 font-black text-sun bg-sun/10 px-3 py-1.5 rounded-full text-xs shrink-0">
              <Star size={12} className="fill-sun" /> {product.rating}
            </div>

            <Link href={`/products/${product.id}`} className="contents">
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="bg-dragonfruit hover:bg-tangerine text-white px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-tight shadow-lg shadow-dragonfruit/20 transition-all duration-300 flex items-center gap-2 relative z-30"
              >
                <span>Details</span>
                <ArrowRight size={14} />
              </motion.button>
            </Link>
          </div>
        </div>

        {/* Stock Indicator */}
        {product.stock < 10 && (
          <div className="absolute top-8 left-8 bg-tangerine text-white text-[8px] font-black px-2.5 py-1 rounded-full uppercase tracking-tighter animate-pulse z-20 shadow-md">
            Only {product.stock} left!
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;