/**
 * Public Navbar Component
 * Complies with the Top Bar Contract:
 * [1-Line Brand Wordmark] — [4-5 single-line text links] — [1 primary action]
 */

import React from 'react';
import { UserRole } from '../../types';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  activeRole: UserRole;
  onSwitchRole: (role: UserRole) => void;
  onOpenAuth: (mode: 'login' | 'register') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  activeRole,
  onSwitchRole,
  onOpenAuth,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-3.5">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2.5 text-left shrink-0 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white font-black text-sm tracking-tighter shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            MX
          </div>
          <span className="text-lg font-extrabold tracking-tight text-white whitespace-nowrap">
            MAXXfam
          </span>
        </button>

        {/* Zone 2: 4–5 single-line text links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-300">
          <button
            onClick={() => onNavigate('features')}
            className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
              currentView === 'features' ? 'text-blue-400' : ''
            }`}
          >
            Features
          </button>
          <button
            onClick={() => onNavigate('how-it-works')}
            className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
              currentView === 'how-it-works' ? 'text-blue-400' : ''
            }`}
          >
            How It Works
          </button>
          <button
            onClick={() => onNavigate('docs')}
            className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
              currentView === 'docs' || currentView === 'api-ref' ? 'text-blue-400' : ''
            }`}
          >
            API & Docs
          </button>
          <button
            onClick={() => onNavigate('pricing')}
            className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
              currentView === 'pricing' ? 'text-blue-400' : ''
            }`}
          >
            Pricing
          </button>
          <button
            onClick={() => onNavigate('status')}
            className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
              currentView === 'status' ? 'text-blue-400' : ''
            }`}
          >
            System Status
          </button>
          <button
            onClick={() => onNavigate('export-php')}
            className={`hover:text-white transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              currentView === 'export-php' ? 'text-emerald-400' : 'text-slate-400'
            }`}
          >
            <span>PHP Source Code</span>
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action + Fast Sandbox Switcher */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Quick Environment Role Switcher */}
          <div className="hidden sm:flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-xs font-medium">
            <button
              onClick={() => {
                onSwitchRole('merchant');
                onNavigate('dashboard');
              }}
              className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
                activeRole === 'merchant' && currentView === 'dashboard'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Merchant Panel
            </button>
            <button
              onClick={() => {
                onSwitchRole('admin');
                onNavigate('admin');
              }}
              className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
                activeRole === 'admin' && currentView === 'admin'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Admin Panel
            </button>
          </div>

          <button
            onClick={() => onOpenAuth('login')}
            className="px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors whitespace-nowrap cursor-pointer"
          >
            Log In
          </button>

          <button
            onClick={() => onOpenAuth('register')}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-sm shadow-blue-600/30 transition-all whitespace-nowrap shrink-0 cursor-pointer"
          >
            Register
          </button>
        </div>
      </div>
    </header>
  );
};
