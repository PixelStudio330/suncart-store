"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Sparkles, Image as ImageIcon, User, CheckCircle, X } from "lucide-react";
import { toast } from "react-hot-toast";

const ProfileUpdateForm = ({ initialData }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    image: initialData?.image || ""
  });

  const isUnchanged = 
    formData.name === (initialData?.name || "") && 
    formData.image === (initialData?.image || "");

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (isUnchanged) return; 
    
    setLoading(true);
    try {
      await authClient.updateUser({
        name: formData.name,
        image: formData.image,
      });
      toast.success("Profile updated!");
      router.push("/profile");
      router.refresh();
    } catch (error) {
      toast.error("Update failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleUpdate} className="space-y-8">
      {/* Name Field */}
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-5">
          Preferred Name
        </label>
        <div className="relative">
          <User className="absolute left-6 top-1/2 -translate-y-1/2 text-[#F7BCB0]" size={18} />
          <input 
            type="text" 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full bg-slate-50 border-2 border-slate-100 rounded-full py-5 pl-14 pr-8 focus:outline-none focus:border-[#C85555] font-bold text-slate-700 transition-all shadow-sm"
            required
          />
        </div>
      </div>

      {/* Avatar Field */}
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-5">
          Avatar URL
        </label>
        <div className="relative">
          <ImageIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-[#F7BCB0]" size={18} />
          <input 
            type="url" 
            value={formData.image}
            onChange={(e) => setFormData({...formData, image: e.target.value})}
            className="w-full bg-slate-50 border-2 border-slate-100 rounded-full py-5 pl-14 pr-8 focus:outline-none focus:border-[#C85555] font-bold text-slate-700 transition-all shadow-sm"
          />
        </div>
      </div>

      <motion.button 
        whileHover={!isUnchanged && !loading ? { scale: 1.02 } : {}}
        whileTap={!isUnchanged && !loading ? { scale: 0.98 } : {}}
        disabled={loading || isUnchanged}
        className={`w-full py-5 rounded-full font-black uppercase tracking-widest shadow-xl transition-all duration-500 flex items-center justify-center gap-3 ${
          isUnchanged || loading 
            ? "bg-slate-100 text-slate-400 grayscale cursor-not-allowed shadow-none" 
            : "bg-[#EAA624] text-white hover:bg-[#C85555] grayscale-0"
        }`}
      >
        {loading ? (
          "Saving..."
        ) : (
          <>
            <CheckCircle size={20} /> 
            {isUnchanged ? "No Changes Made" : "Update Now"}
          </>
        )}
      </motion.button>
    </form>
  );
};

// 2. The Main Page Component
const UpdateProfile = () => {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  if (isPending) return (
    <div className="h-screen flex items-center justify-center bg-[#FFFBF0]">
      <div className="text-[#C85555] font-black italic animate-pulse">Checking credentials...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FFFBF0] pt-32 pb-20 px-6">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-lg mx-auto">
        <div className="bg-white rounded-[3rem] p-10 shadow-2xl border border-[#F7BCB0]/30 relative">
          <button onClick={() => router.back()} className="absolute top-8 right-8 text-slate-300 hover:text-[#C85555] transition-colors">
            <X size={24} />
          </button>

          <div className="text-center mb-10">
            <div className="inline-block p-4 rounded-full bg-[#EAA624]/10 mb-4">
              <Sparkles className="text-[#EAA624]" size={32} />
            </div>
            <h2 className="text-3xl font-black text-[#C85555] uppercase italic tracking-tighter">
              Update <span className="text-[#EAA624]">Details</span>
            </h2>
          </div>
          <ProfileUpdateForm key={session?.user?.id} initialData={session?.user} />
        </div>
      </motion.div>
    </div>
  );
};

export default UpdateProfile;