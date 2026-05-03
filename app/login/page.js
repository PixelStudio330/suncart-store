"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Sun, LogIn } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const { data, error: authError } = await authClient.signIn.email({
      email,
      password,
    });

    if (authError) {
      setError(authError.message || "Invalid credentials. Please try again.");
    } else {
      router.push("/");
    }
  };

  const handleGoogleLogin = async () => {
    await authClient.signIn.social({ provider: "google" });
  };

  return (
    <main className="min-h-screen bg-[#F7BCB0] flex items-center justify-center p-6 relative overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white/90 backdrop-blur-2xl p-10 rounded-[3rem] shadow-2xl border border-white/50 relative z-10"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-[#EAA624]/10 rounded-3xl flex items-center justify-center mx-auto mb-6 rotate-3">
            <Sun className="w-8 h-8 text-[#EAA624]" />
          </div>
          <h1 className="text-4xl font-black text-[#C85555] uppercase tracking-tighter italic">Welcome Back</h1>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-2">The sun is waiting for you</p>
        </div>

        {error && (
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="mb-6 text-xs font-bold text-red-500 bg-red-50 p-4 rounded-2xl border border-red-100">
            {error}
          </motion.div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            type="email" placeholder="Email Address" required
            className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-100 focus:outline-none focus:ring-2 focus:ring-[#EAA624] transition-all font-medium"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" placeholder="Password" required
            className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-100 focus:outline-none focus:ring-2 focus:ring-[#EAA624] transition-all font-medium"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button 
            type="submit"
            className="w-full py-5 bg-[#C85555] text-white font-black uppercase tracking-widest rounded-2xl hover:bg-[#b04a4a] transition-all shadow-lg shadow-[#C85555]/20 flex items-center justify-center gap-2 group"
          >
            Sign In <LogIn className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </form>

        <div className="mt-8 space-y-6">
          <button 
            onClick={handleGoogleLogin}
            className="w-full py-4 border-2 border-slate-50 rounded-2xl flex items-center justify-center gap-3 font-bold text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
            Login with Google
          </button>
          
          <div className="text-center">
            <p className="text-sm font-bold text-slate-400 uppercase tracking-tighter">
              New to SunCart? <Link href="/register" className="text-[#EAA624] hover:text-[#d49520] transition-colors">Join Now</Link>
            </p>
          </div>
        </div>
      </motion.div>
    </main>
  );
}