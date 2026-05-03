"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, ArrowRight, Image as ImageIcon } from "lucide-react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({ name: "", email: "", image: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    
    const { data, error: authError } = await authClient.signUp.email({
      email: formData.email,
      password: formData.password,
      name: formData.name,
      image: formData.image,
    });

    if (authError) {
      setError(authError.message || "Registration failed. Please try again.");
    } else {
      router.push("/login");
    }
  };

  const handleGoogleLogin = async () => {
    await authClient.signIn.social({ provider: "google" });
  };

  return (
    <main className="min-h-screen bg-[#F7BCB0] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Blur Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#EAA624]/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#C85555]/20 rounded-full blur-[120px]" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/90 backdrop-blur-2xl p-10 rounded-[3rem] shadow-2xl border border-white/50 relative z-10"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-[#C85555]/10 text-[#C85555] px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
            <Sparkles className="w-3 h-3" /> Join the Summer Club
          </div>
          <h1 className="text-4xl font-black text-[#C85555] uppercase tracking-tighter italic">Create Account</h1>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          {error && <p className="text-xs font-bold text-red-500 bg-red-50 p-3 rounded-xl border border-red-100">{error}</p>}
          
          <div className="space-y-1">
            <input 
              type="text" placeholder="Full Name" required
              className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-100 focus:outline-none focus:ring-2 focus:ring-[#EAA624] transition-all placeholder:text-slate-300 font-medium"
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <input 
            type="email" placeholder="Email Address" required
            className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-100 focus:outline-none focus:ring-2 focus:ring-[#EAA624] transition-all placeholder:text-slate-300 font-medium"
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />

          <div className="relative">
            <input 
              type="url" placeholder="Photo URL (Optional)"
              className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-100 focus:outline-none focus:ring-2 focus:ring-[#EAA624] transition-all placeholder:text-slate-300 font-medium"
              onChange={(e) => setFormData({...formData, image: e.target.value})}
            />
            <ImageIcon className="absolute right-5 top-4 w-5 h-5 text-slate-200" />
          </div>

          <input 
            type="password" placeholder="Password" required
            className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-100 focus:outline-none focus:ring-2 focus:ring-[#EAA624] transition-all placeholder:text-slate-300 font-medium"
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />

          <button 
            type="submit"
            className="w-full py-5 bg-[#C85555] text-white font-black uppercase tracking-widest rounded-2xl hover:bg-[#b04a4a] transition-all shadow-lg shadow-[#C85555]/20 flex items-center justify-center gap-2 group"
          >
            Register <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-8">
          <div className="relative flex items-center justify-center mb-6">
            <div className="border-t border-slate-100 w-full" />
            <span className="bg-white px-4 text-[10px] font-bold text-slate-300 uppercase tracking-widest absolute">Or use social</span>
          </div>

          <button 
            onClick={handleGoogleLogin}
            className="w-full py-4 border-2 border-slate-50 rounded-2xl flex items-center justify-center gap-3 font-bold text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
            Sign up with Google
          </button>
        </div>

        <p className="mt-8 text-center text-sm font-bold text-slate-400 uppercase tracking-tighter">
          Already a member? <Link href="/login" className="text-[#EAA624] hover:text-[#d49520] transition-colors">Login Here</Link>
        </p>
      </motion.div>
    </main>
  );
}