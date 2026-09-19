import React, { useState } from 'react';
import {
  Lock, Mail, User, ArrowRight, ShieldCheck,
  Sparkles, CheckCircle, Shield, KeyRound, AlertCircle, Info
} from 'lucide-react';
import { api } from '../../services/api';
import AutoResumeLogo from '../UI/AutoResumeLogo';

export default function AuthModal({ onLoginSuccess }) {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setIsLoading(true);

    try {
      if (isRegister) {
        if (!name.trim()) {
          setErrorMsg('Please enter your full name');
          setIsLoading(false);
          return;
        }
        if (password.length < 4) {
          setErrorMsg('Password must be at least 4 characters');
          setIsLoading(false);
          return;
        }
        const res = await api.register({ name, email, password });
        if (res && res.user) {
          onLoginSuccess(res.user);
        } else {
          setErrorMsg(res?.message || 'Registration failed');
        }
      } else {
        const res = await api.login({ email, password });
        if (res && res.user) {
          onLoginSuccess(res.user);
        } else {
          setErrorMsg(res?.message || 'Invalid email or password');
        }
      }
    } catch (err) {
      setErrorMsg(err.message || 'Authentication failed. Please verify your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden flex flex-col md:flex-row animate-popover">
        {/* Left Brand Panel */}
        <div className="md:w-5/12 bg-gradient-to-br from-slate-900 via-slate-850 to-slate-950 p-8 text-white flex flex-col justify-between relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#00c598]/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"></div>

          <div className="relative z-10">
            {/* Logo */}
            <AutoResumeLogo
              size="lg"
              theme="light-text"
              badge="A4 Pro"
              className="mb-8"
            />

            <h2 className="text-2xl font-black tracking-tight leading-snug mb-3">
              Build Dream Resumes That Get You Hired.
            </h2>
            <p className="text-slate-400 text-xs leading-relaxed mb-6">
              Access 10 modern ATS-friendly templates, pre-filled with realistic sample dummy data and live A4 PDF export.
            </p>

            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-2.5 text-slate-300">
                <CheckCircle className="w-4 h-4 text-[#00c598] shrink-0" />
                <span>10 Handcrafted Professional Templates</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300">
                <CheckCircle className="w-4 h-4 text-[#00c598] shrink-0" />
                <span>Preloaded with Realistic Sample Data</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300">
                <CheckCircle className="w-4 h-4 text-[#00c598] shrink-0" />
                <span>Admin User Role Management & Template Publishing</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300">
                <CheckCircle className="w-4 h-4 text-[#00c598] shrink-0" />
                <span>MongoDB Cloud Secure Authentication</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-8 border-t border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#00c598]" />
            <span>Encrypted Password & Role-Based Access</span>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="md:w-7/12 p-8 sm:p-10 flex flex-col justify-center bg-white">
          <div className="max-w-md mx-auto w-full">
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-[11px] font-bold mb-3 border border-slate-200">
                <KeyRound className="w-3.5 h-3.5 text-[#00c598]" />
                <span>{isRegister ? 'New Registration (Default: User)' : 'Verified Credentials Required'}</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                {isRegister ? 'Create Your Account' : 'Welcome Back'}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {isRegister
                  ? 'Sign up with your details. Your default account role will be User.'
                  : 'Enter your verified email and password to log in.'}
              </p>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-semibold flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {isRegister && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00c598]/50 focus:border-[#00c598] transition-all"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00c598]/50 focus:border-[#00c598] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00c598]/50 focus:border-[#00c598] transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-gradient-to-r from-[#00c598] to-[#00a37e] hover:from-[#00a37e] hover:to-[#008f6e] text-white font-bold text-xs rounded-xl shadow-md hover:shadow-lg transition-all duration-150 flex items-center justify-center gap-2 mt-2"
              >
                <span>{isLoading ? 'Verifying...' : isRegister ? 'Create Account & Sign In' : 'Log In with Verified Credentials'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-5 text-center">
              <button
                type="button"
                onClick={() => {
                  setIsRegister(!isRegister);
                  setErrorMsg('');
                }}
                className="text-xs text-slate-600 hover:text-[#00c598] font-bold transition-colors"
              >
                {isRegister
                  ? 'Already have an account? Log in'
                  : "Don't have an account? Sign up"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

