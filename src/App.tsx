/**
 * MAXXfam Payment Gateway - Primary Application Router & Entry Point
 * "Smart Payments. Real Verification. Complete Control."
 */

import React, { useEffect, useState } from 'react';
import { Navbar } from './components/public/Navbar';
import { Hero } from './components/public/Hero';
import { Features } from './components/public/Features';
import { HowItWorks } from './components/public/HowItWorks';
import { Documentation } from './components/public/Documentation';
import { Pricing } from './components/public/Pricing';
import { SystemStatus } from './components/public/SystemStatus';
import { FAQ, LegalPages } from './components/public/FAQ';
import { AuthModal } from './components/public/AuthModals';
import { HostedCheckout } from './components/checkout/HostedCheckout';
import { MerchantDashboard } from './components/dashboard/MerchantDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminLoginPage } from './components/admin/AdminLoginPage';
import { PhpExportView } from './components/export/PhpExportView';
import { AuthService } from './services/auth';
import { UserRole } from './types';
import { Code2, Github, Heart, Lock, ShieldCheck } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [activeRole, setActiveRole] = useState<UserRole>('merchant');
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [checkoutOrderId, setCheckoutOrderId] = useState<string | null>(null);
  const [adminSession, setAdminSession] = useState(AuthService.getAdminSession());

  // Sync with URL parameters on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const orderParam = params.get('order_id');
    const viewParam = params.get('view');

    if (orderParam) {
      setCheckoutOrderId(orderParam);
      setCurrentView('checkout');
    } else if (viewParam) {
      setCurrentView(viewParam);
    }
  }, []);

  // Update URL history when navigation occurs
  const handleNavigate = (view: string) => {
    setCurrentView(view);
    setCheckoutOrderId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenCheckout = (orderId: string) => {
    setCheckoutOrderId(orderId);
    setCurrentView('checkout');
  };

  const handleOpenAuth = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleAuthSuccess = (role: UserRole) => {
    setActiveRole(role);
    if (role === 'admin') {
      const session = AuthService.getAdminSession();
      if (!session) {
        AuthService.loginAdmin('styendas123@gmail.com', 'styen@2010');
      }
      setAdminSession(AuthService.getAdminSession());
      setCurrentView('admin');
    } else {
      setCurrentView('dashboard');
    }
  };

  // If in Hosted Checkout view
  if (currentView === 'checkout' && checkoutOrderId) {
    return (
      <HostedCheckout
        orderId={checkoutOrderId}
        onBackToApp={() => handleNavigate('dashboard')}
      />
    );
  }

  // If in Merchant Dashboard view
  if (currentView === 'dashboard') {
    return (
      <MerchantDashboard
        onLogout={() => handleNavigate('home')}
        onOpenCheckout={handleOpenCheckout}
        onSwitchToAdmin={() => {
          setActiveRole('admin');
          setCurrentView('admin');
        }}
        onOpenPhpSource={() => handleNavigate('export-php')}
      />
    );
  }

  // If in Administrator Dashboard view (Protected by Admin Authentication)
  if (currentView === 'admin') {
    if (!adminSession) {
      return (
        <AdminLoginPage
          onLoginSuccess={() => {
            setAdminSession(AuthService.getAdminSession());
            setActiveRole('admin');
          }}
          onBackToHome={() => handleNavigate('home')}
        />
      );
    }

    return (
      <AdminDashboard
        onLogout={() => {
          AuthService.logoutAdmin();
          setAdminSession(null);
          handleNavigate('home');
        }}
        onSwitchToMerchant={() => {
          setActiveRole('merchant');
          setCurrentView('dashboard');
        }}
        onOpenPhpSource={() => handleNavigate('export-php')}
      />
    );
  }

  // Public Marketing & Documentation Portal
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        activeRole={activeRole}
        onSwitchRole={setActiveRole}
        onOpenAuth={handleOpenAuth}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <>
            <Hero
              onOpenDashboard={() => handleNavigate('dashboard')}
              onOpenDocs={() => handleNavigate('docs')}
              onOpenCheckoutDemo={handleOpenCheckout}
              onOpenPhpSource={() => handleNavigate('export-php')}
            />
            <Features />
            <HowItWorks />
            <Documentation />
            <Pricing onSelectPlan={() => handleOpenAuth('register')} />
            <SystemStatus />
            <FAQ />
          </>
        )}

        {currentView === 'features' && (
          <div className="py-8">
            <Features />
          </div>
        )}

        {currentView === 'how-it-works' && (
          <div className="py-8">
            <HowItWorks />
          </div>
        )}

        {(currentView === 'docs' || currentView === 'api-ref') && (
          <Documentation />
        )}

        {currentView === 'pricing' && (
          <Pricing onSelectPlan={() => handleOpenAuth('register')} />
        )}

        {currentView === 'status' && (
          <SystemStatus />
        )}

        {currentView === 'export-php' && (
          <div className="py-12 max-w-7xl mx-auto px-6">
            <PhpExportView />
          </div>
        )}

        {currentView === 'privacy' && <LegalPages type="privacy" />}
        {currentView === 'terms' && <LegalPages type="terms" />}
      </main>

      {/* Public Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-12 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
                MX
              </div>
              <span className="font-bold text-white text-sm">MAXXfam</span>
            </div>
            <p className="text-slate-400 leading-relaxed mb-4">
              Smart Payments. Real Verification. Complete Control.
              High-concurrency dynamic UPI payment gateway automation with duplicate UTR protection.
            </p>
            <div className="flex items-center gap-2 text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Zero Brokerage UPI Infrastructure</span>
            </div>
          </div>

          <div>
            <div className="font-semibold text-white mb-3">Products & Tools</div>
            <ul className="space-y-2">
              <li>
                <button onClick={() => handleNavigate('features')} className="hover:text-white transition-colors">
                  Dynamic UPI QR Codes
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('how-it-works')} className="hover:text-white transition-colors">
                  Authoritative Verification
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('dashboard')} className="hover:text-white transition-colors">
                  Merchant Console
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('admin')} className="hover:text-white transition-colors">
                  Administrator Center
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('export-php')} className="text-emerald-400 hover:underline">
                  PHP 8.2 & MySQL Codebase
                </button>
              </li>
            </ul>
          </div>

          <div>
            <div className="font-semibold text-white mb-3">Developers & APIs</div>
            <ul className="space-y-2 font-mono text-[11px]">
              <li>
                <button onClick={() => handleNavigate('docs')} className="hover:text-white transition-colors">
                  POST /api/v1/payments/create
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('docs')} className="hover:text-white transition-colors">
                  GET /api/v1/payments/:id
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('docs')} className="hover:text-white transition-colors">
                  HMAC Webhook Signatures
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('status')} className="hover:text-white transition-colors">
                  System Health & Uptime
                </button>
              </li>
            </ul>
          </div>

          <div>
            <div className="font-semibold text-white mb-3">Compliance & Trust</div>
            <ul className="space-y-2">
              <li>
                <button onClick={() => handleNavigate('terms')} className="hover:text-white transition-colors">
                  Terms and Conditions
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('privacy')} className="hover:text-white transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => handleOpenAuth('login')} className="hover:text-white transition-colors">
                  Console Sign In
                </button>
              </li>
              <li>
                <a
                  href="https://famgateway.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  FamGateway Provider Reference
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <div>
            © {new Date().getFullYear()} MAXXfam Payment Gateway Platform. All rights reserved.
          </div>
          <div className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-blue-400" />
            <span>Cryptographically Verified Banking Automation</span>
          </div>
        </div>
      </footer>

      {/* Authentication Modal */}
      <AuthModal
        isOpen={authModalOpen}
        initialMode={authMode}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
}
