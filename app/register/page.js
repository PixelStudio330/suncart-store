"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, ArrowRight, Image as ImageIcon, Eye, EyeOff } from "lucide-react";
import { toast } from "react-hot-toast";

/**
 * RegisterPage Component
 * Adheres to Assignment Category: category-A8-Jackfruit requirements.
 * Ensures Register -> Login redirect flow.
 */
export default function RegisterPage() {
  const [formData, setFormData] = useState({ name: "", email: "", image: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { data, error: authError } = await authClient.signUp.email({
      email: formData.email,
      password: formData.password,
      name: formData.name,
      image: formData.image,
      dontLogin: true, // This *should* work, but we'll add a safety net below
    });

    if (authError) {
      setLoading(false);
      setError(authError.message || "Registration failed. Please try again.");
      toast.error(authError.message || "Registration failed");
    } else {
      await authClient.signOut(); 
      
      setLoading(false);
      toast.success("Account created successfully! Please log in to continue.");
      router.push("/login");
    }
  };

  const handleGoogleLogin = async () => {
  
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/", 
    });
  };

  return (
    <main className="min-h-screen bg-[#F7BCB0] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Aesthetic Background Decorations */}
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
          {/* Error Message Requirement */}
          {error && (
            <p className="text-xs font-bold text-red-500 bg-red-50 p-3 rounded-xl border border-red-100">
              {error}
            </p>
          )}

          {/* Form Fields */}
          <input
            type="text"
            placeholder="Full Name"
            required
            className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-100 focus:outline-none focus:ring-2 focus:ring-[#EAA624] transition-all placeholder:text-slate-500 font-medium text-slate-800"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <input
            type="email"
            placeholder="Email Address"
            required
            className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-100 focus:outline-none focus:ring-2 focus:ring-[#EAA624] transition-all placeholder:text-slate-500 font-medium text-slate-800"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />

          <div className="relative">
            <input
              type="url"
              placeholder="Photo URL (Optional)"
              className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-100 focus:outline-none focus:ring-2 focus:ring-[#EAA624] transition-all placeholder:text-slate-500 font-medium text-slate-800"
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            />
            <ImageIcon className="absolute right-5 top-4.5 w-5 h-5 text-slate-400" />
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-100 focus:outline-none focus:ring-2 focus:ring-[#EAA624] transition-all placeholder:text-slate-500 font-medium text-slate-800"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-5 top-4.5 text-slate-400 hover:text-[#C85555] transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-5 bg-[#C85555] text-white font-black uppercase tracking-widest rounded-2xl hover:bg-[#b04a4a] transition-all shadow-lg shadow-[#C85555]/20 flex items-center justify-center gap-2 group disabled:opacity-50"
          >
            {loading ? "Creating..." : "Register"}
            {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>

        <div className="mt-8">
          <div className="relative flex items-center justify-center mb-6">
            <div className="border-t border-slate-100 w-full" />
            <span className="bg-white px-4 text-[10px] font-bold text-slate-300 uppercase tracking-widest absolute">
              Or use social
            </span>
          </div>

          {/* Social Login Requirement */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full py-4 border-2 border-slate-50 rounded-2xl flex items-center justify-center gap-3 font-bold text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
            Sign up with Google
          </button>
        </div>

        {/* Link to Login Requirement */}
        <p className="mt-8 text-center text-sm font-bold text-slate-400 uppercase tracking-tighter">
          Already a member?{" "}
          <Link href="/login" className="text-[#EAA624] hover:text-[#d49520] transition-colors">
            Login Here
          </Link>
        </p>
      </motion.div>
    </main>
  );
}