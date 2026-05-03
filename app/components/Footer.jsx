"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  ArrowUpRight, 
  Mail, 
  MapPin, 
  Sparkles 
} from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Shop: ["New Arrivals", "Best Sellers", "Sale", "Gift Cards"],
    Support: ["Order Status", "Shipping", "Returns", "Contact Us"],
    Legal: ["Privacy Policy", "Terms of Service", "Accessibility"],
  };

  const socials = [
    { name: "instagram", href: "#" },
    { name: "twitter", href: "#" },
    { name: "facebook", href: "#" },
  ];

  return (
    <footer className="relative bg-white pt-24 pb-12 overflow-hidden">
      {/* Border Top Accent */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F7BCB0] to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Newsletter Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-[#C85555] rounded-[3rem] p-8 md:p-16 overflow-hidden mb-24"
        >
          <div className="absolute top-[-20%] right-[-10%] w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-4 italic">
                Join the <span className="text-[#EAA624]">Sugar Cubes</span>
              </h2>
              <p className="text-white/70 font-medium max-w-sm">
                Exclusive summer drops and seasonal discounts delivered to your inbox.
              </p>
            </div>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Enter your email..." 
                className="w-full bg-white/10 border-2 border-white/20 rounded-full py-6 px-8 text-white placeholder:text-white/40 focus:outline-none focus:border-[#EAA624] transition-all"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#EAA624] text-white p-4 rounded-full hover:bg-white hover:text-[#C85555] transition-all">
                <ArrowUpRight size={20} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-24">
          
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3 mb-8">
              <span className="text-3xl font-black tracking-tighter text-[#C85555] uppercase italic">
                SUN<span className="text-[#EAA624]">CART</span>
              </span>
            </Link>
            <p className="text-slate-500 font-medium leading-relaxed mb-8 max-w-xs">
              Curating the finest summer essentials for your golden hours.
            </p>
            
            {/* Social Links - Edge to Edge Images */}
            <div className="flex gap-5"> 
              {socials.map((social) => (
                <Link 
                  key={social.name} 
                  href={social.href}
                  className="w-12 h-12 rounded-full border border-slate-100 flex items-center justify-center bg-white shadow-sm hover:shadow-md hover:bg-[#F7BCB0]/10 hover:border-[#F7BCB0] transition-all duration-300 group overflow-hidden"
                >
                  <img 
                    src={`/img/${social.name}.png`} 
                    alt={social.name} 
                    className="w-full h-full object-cover p-0 group-hover:scale-110 transition-transform duration-300"
                  />
                </Link>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 md:grid-cols-3 gap-8">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#C85555] mb-6">{category}</h4>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link}>
                      <Link href="#" className="text-sm font-bold text-slate-500 hover:text-[#EAA624] transition-colors">{link}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="lg:col-span-3 bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#C85555] mb-6">Find Us</h4>
            <div className="space-y-4">
              <div className="flex gap-3">
                <MapPin className="text-[#EAA624] shrink-0" size={16} />
                <span className="text-xs font-bold text-slate-600">123 Sunbeam Ave, FL</span>
              </div>
              <div className="flex gap-3">
                <Mail className="text-[#EAA624] shrink-0" size={16} />
                <span className="text-xs font-bold text-slate-600">hello@suncart.store</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            © {currentYear} SunCart — All Rights Reserved
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Crafted by</span>
            <div className="px-4 py-1.5 rounded-full bg-[#C85555]/5 border border-[#C85555]/10 flex items-center gap-2">
              <Sparkles size={12} className="text-[#EAA624]" />
              <span className="text-[11px] font-black text-[#C85555] uppercase italic">Gulnahar</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;