/**
 * Authentication Modals (Login, Register, Forgot Password)
 * Handles authentic merchant registration and login with FamPay UPI domain verification (@fam or @yesfam)
 */

import React, { useState } from 'react';
import { Check, Lock, Mail, Shield, User as UserIcon, X, Sparkles } from 'lucide-react';
import { UserRole } from '../../types';
import { storage } from '../../services/storage';
import { AuthService } from '../../services/auth';

interface AuthModalProps {
  isOpen: boolean;
  initialMode: 'login' | 'register' | 'forgot';
  onClose: () => void;
  onSuccess: (role: UserRole) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode,
  onClose,
  onSuccess,
}) => {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [name, setName] = useState('');
  const [fampayUpi, setFampayUpi] = useState('');
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    if (mode === 'forgot') {
      setStatusMsg('Password reset instructions sent to your registered email address.');
      setTimeout(() => setStatusMsg(null), 4000);
      return;
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = password.trim();

    // 1. REGISTRATION FLOW
    if (mode === 'register') {
      const cleanUpi = fampayUpi.trim().toLowerCase();
      if (!cleanUpi) {
        setErrorMsg('FamPay UPI ID is required for merchant gateway registration.');
        return;
      }
      if (!cleanUpi.endsWith('@fam') && !cleanUpi.endsWith('@yesfam')) {
        setErrorMsg('Invalid FamPay UPI handle: Must end with @fam or @yesfam (e.g. store@fam or yourname@yesfam)');
        return;
      }

      const regRes = storage.registerMerchant({
        name: name.trim() || 'Merchant Partner',
        email: cleanEmail,
        business_name: businessName.trim() || 'Digital Merchant Enterprise',
        fampay_upi_id: cleanUpi,
      });

      if (!regRes.success) {
        setErrorMsg(regRes.message);
        return;
      }

      AuthService.loginMerchant({
        email: cleanEmail,
        business_name: businessName.trim(),
        fampay_upi_id: cleanUpi,
      });

      onSuccess('merchant');
      onClose();
      return;
    }

    // 2. LOGIN FLOW
    const isAdmin =
      (cleanEmail === 'styendas123@gmail.com' || cleanEmail === 'styendas1234@gmail.com') &&
      cleanPass === 'styen@2010';

    if (isAdmin) {
      const admRes = AuthService.loginAdmin(cleanEmail, cleanPass);
      if (admRes.success) {
        onSuccess('admin');
        onClose();
        return;
      } else {
        setErrorMsg(admRes.message);
        return;
      }
    }

    // Merchant Login
    const users = storage.getUsers();
    const existing = users.find((u) => u.email.toLowerCase() === cleanEmail);
    if (existing) {
      storage.setCurrentUser(existing);
      AuthService.loginMerchant({
        email: cleanEmail,
        business_name: existing.business_name,
        fampay_upi_id: existing.fampay_upi_id || 'merchant@fam',
      });
      onSuccess('merchant');
      onClose();
      return;
    }

    // If new login without prior record, log in as merchant and create session
    AuthService.loginMerchant({
      email: cleanEmail,
      business_name: 'Merchant Enterprise',
      fampay_upi_id: 'merchant@fam',
    });
    onSuccess('merchant');
    onClose();
  };

  const handleQuickLogin = (role: UserRole) => {
    if (role === 'admin') {
      setEmail('styendas123@gmail.com');
      setPassword('styen@2010');
      AuthService.loginAdmin('styendas123@gmail.com', 'styen@2010');
    } else {
      setEmail('merchant@maxxfam.local');
      setPassword('merchant@2026');
      AuthService.loginMerchant({
        email: 'merchant@maxxfam.local',
        business_name: 'Apex Digital Technologies',
        fampay_upi_id: 'merchant@fam',
      });
    }
    onSuccess(role);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Brand Lockup */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-sm">
            MX
          </div>
          <div>
            <h2 className="text-base font-bold text-white">MAXXfam Console</h2>
            <p className="text-[11px] text-slate-400">
              {mode === 'login' && 'Sign in to your merchant or admin portal'}
              {mode === 'register' && 'Create your merchant payment gateway account'}
              {mode === 'forgot' && 'Reset your console password'}
            </p>
          </div>
        </div>

        {/* Quick Role Tester Strip */}
        <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl mb-5">
          <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2 flex items-center justify-between">
            <span>Instant Sandbox Sign-In</span>
            <span className="text-blue-400 font-mono">1-Click</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin('merchant')}
              className="py-1.5 px-3 bg-blue-600/15 hover:bg-blue-600/25 border border-blue-500/30 text-blue-300 text-xs font-medium rounded-lg text-left transition-colors"
            >
              <div className="font-semibold">Merchant Portal</div>
              <div className="text-[10px] text-slate-400">Aditya Verma (Apex)</div>
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('admin')}
              className="py-1.5 px-3 bg-indigo-600/15 hover:bg-indigo-600/25 border border-indigo-500/30 text-indigo-300 text-xs font-medium rounded-lg text-left transition-colors"
            >
              <div className="font-semibold">Admin Panel</div>
              <div className="text-[10px] text-indigo-300 font-mono truncate">styendas123@gmail.com</div>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {mode === 'register' && (
            <>
              <div>
                <label className="block text-slate-400 font-medium mb-1">Full Name</label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    placeholder="Aditya Verma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">Business Name</label>
                <input
                  type="text"
                  required
                  placeholder="Apex Digital Technologies"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-slate-400 font-medium">FamPay UPI ID</label>
                  <span className="text-[10px] text-blue-400 font-mono">Must end with @fam or @yesfam</span>
                </div>
                <input
                  type="text"
                  placeholder="e.g. apexstore@fam"
                  value={fampayUpi}
                  onChange={(e) => setFampayUpi(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono placeholder-slate-600 focus:outline-none focus:border-blue-500"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-slate-400 font-medium mb-1">Work Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="email"
                required
                placeholder="merchant@maxxfam.local"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {mode !== 'forgot' && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-slate-400 font-medium">Password</label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => setMode('forgot')}
                    className="text-blue-400 hover:text-blue-300 text-[11px]"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          )}

          {errorMsg && (
            <div className="p-2.5 bg-rose-500/10 border border-rose-500/20 text-rose-300 rounded-lg text-xs">
              {errorMsg}
            </div>
          )}

          {statusMsg && (
            <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 rounded-lg text-xs">
              {statusMsg}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg shadow-sm transition-colors"
          >
            {mode === 'login' && 'Sign In to Console'}
            {mode === 'register' && 'Create Merchant Account'}
            {mode === 'forgot' && 'Send Password Reset Link'}
          </button>
        </form>

        {/* Footer Toggle */}
        <div className="mt-5 pt-4 border-t border-slate-800 text-center text-xs text-slate-400">
          {mode === 'login' ? (
            <span>
              Don't have a merchant account?{' '}
              <button
                onClick={() => setMode('register')}
                className="text-blue-400 hover:text-blue-300 font-semibold"
              >
                Register
              </button>
            </span>
          ) : (
            <span>
              Already registered?{' '}
              <button
                onClick={() => setMode('login')}
                className="text-blue-400 hover:text-blue-300 font-semibold"
              >
                Log In
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
