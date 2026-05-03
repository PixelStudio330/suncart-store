"use client";

import React from "react";
import { motion } from "framer-motion";
import { authClient } from "@/lib/auth-client"; 
import { User, Mail, Camera, Edit3, ArrowLeft } from "lucide-react";
import Link from "next/link";

const ProfilePage = () => {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) return (
    <div className="h-screen flex items-center justify-center text-[#C85555] font-black italic animate-pulse">
      Loading...
    </div>
  );
  
  if (!session) return (
    <div className="h-screen flex items-center justify-center text-slate-400 font-bold">
      Please log in to view your profile.
    </div>
  );

  const user = session.user;

  return (
    <div className="min-h-screen bg-[#FFFBF0] pt-32 pb-20 px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        {/* Navigation */}
        <Link href="/" className="inline-flex items-center gap-2 text-[#C85555] font-black uppercase tracking-tighter mb-8 hover:gap-4 transition-all italic">
          <ArrowLeft size={18} /> Back to Shopping
        </Link>

        <div className="bg-white rounded-[3rem] p-10 shadow-xl shadow-[#F7BCB0]/20 border border-[#F7BCB0]/30 relative overflow-hidden">
          {/* Decorative Background Element */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#EAA624]/10 rounded-full blur-3xl" />

          <div className="relative z-10 flex flex-col items-center">
            {/* Profile Avatar */}
            <div className="relative mb-8">
              <div className="w-32 h-32 rounded-full border-4 border-[#F7BCB0] overflow-hidden p-1 bg-white shadow-inner">
                <img 
                  src={user.image || "https://ui-avatars.com/api/?name=" + user.name} 
                  alt={user.name} 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="absolute bottom-1 right-1 bg-[#EAA624] p-2 rounded-full text-white shadow-lg border-2 border-white">
                <Camera size={16} />
              </div>
            </div>

            <h1 className="text-4xl font-black text-[#C85555] uppercase italic tracking-tighter mb-2">
              {user.name}
            </h1>
            <p className="text-slate-400 font-medium mb-10 flex items-center gap-2">
              <Mail size={14} className="text-[#EAA624]" /> {user.email}
            </p>

            {/* Profile Details Card */}
            <div className="w-full space-y-4 mb-10">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex items-center justify-between group hover:border-[#F7BCB0] transition-colors">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#C85555] mb-1">User Name</p>
                  <p className="font-bold text-slate-700">{user.name}</p>
                </div>
                <User className="text-[#F7BCB0] group-hover:scale-110 transition-transform" size={20} />
              </div>
            </div>

            {/* Action Button */}
            <Link href="/profile/update" className="w-full">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#C85555] hover:bg-[#EAA624] text-white py-5 rounded-full font-black uppercase tracking-widest shadow-lg shadow-[#C85555]/20 transition-all flex items-center justify-center gap-3"
              >
                <Edit3 size={18} /> Update Info
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;