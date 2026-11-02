/**
 * Secure Administrator Login Page
 * Requires exact credentials:
 * Email: styendas123@gmail.com
 * Password: styen@2010
 * Enforces session management and security logging.
 */

import React, { useState } from 'react';
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Key,
  Lock,
  Mail,
  RefreshCw,
  Shield,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';
import { AuthService } from '../../services/auth';

interface AdminLoginPageProps {
  onLoginSuccess: () => void;
  onBackToHome: () => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({
  onLoginSuccess,
  onBackToHome,
}) => {
  const [email, setEmail] = useState('styendas123@gmail.com');
  const [password, setPassword] = useState('styen@2010');
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage(null);

    setTimeout(() => {
      const res = AuthService.loginAdmin(email, password);
      setSubmitting(false);

      if (res.success) {
        onLoginSuccess();
      } else {
        setErrorMessage(res.message);
      }
    }, 600);
  };

  const handleAutofill = () => {
    setEmail('styendas123@gmail.com');
    setPassword('styen@2010');
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between py-10 px-4 sm:px-6 relative overflow-hidden">
      {/* Subtle Background Radial Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(79,70,229,0.15),rgba(255,255,255,0))] pointer-events-none" />

      {/* Top Bar with Return Action */}
      <header className="max-w-md w-full mx-auto flex items-center justify-between pb-6">
        <button
          onClick={onBackToHome}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Public Portal</span>
        </button>

        <div className="flex items-center gap-1.5 text-xs text-indigo-400 bg-indigo-950/60 border border-indigo-800/40 px-2.5 py-1 rounded-md">
          <Shield className="w-3.5 h-3.5" />
          <span>Restricted Admin Portal</span>
        </div>
      </header>

      {/* Main Login Card */}
      <main className="max-w-md w-full mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl relative z-10">
        {/* Brand & Security Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-700 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-600/25 mx-auto mb-3">
            MX
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">
            Administrator Authentication
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            MAXXfam Gateway Governance & Platform Operations
          </p>
        </div>

        {/* Credentials Notice Box */}
        <div className="p-3 bg-slate-950 border border-indigo-900/40 rounded-xl mb-6 text-xs text-slate-300">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-semibold text-indigo-300 flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5" />
              <span>Required Super Admin Credentials:</span>
            </span>
            <button
              type="button"
              onClick={handleAutofill}
              className="text-[11px] text-blue-400 hover:text-blue-300 font-medium underline"
            >
              Fill Credentials
            </button>
          </div>
          <div className="font-mono text-[11px] text-slate-400 space-y-0.5">
            <div>Email: <span className="text-white">styendas123@gmail.com</span></div>
            <div>Password: <span className="text-white">styen@2010</span></div>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-medium mb-1">Administrator Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="email"
                required
                placeholder="styendas123@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-white font-mono placeholder-slate-600 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Administrative Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="password"
                required
                placeholder="styen@2010"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-white font-mono placeholder-slate-600 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {errorMessage && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-lg text-rose-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold rounded-lg shadow-md shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Verifying Security Token...</span>
              </>
            ) : (
              <span>Authenticate & Enter Admin Console</span>
            )}
          </button>
        </form>

        {/* Security Audit Footnote */}
        <div className="mt-6 pt-4 border-t border-slate-800 text-center text-[11px] text-slate-500 space-y-1">
          <div className="flex items-center justify-center gap-1 text-slate-400">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            <span>Audit Trail Active</span>
          </div>
          <div>All login attempts and IP addresses are recorded to the system security ledger.</div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-md w-full mx-auto text-center text-xs text-slate-500">
        <div>MAXXfam Payment Gateway &copy; {new Date().getFullYear()}</div>
      </footer>
    </div>
  );
};
