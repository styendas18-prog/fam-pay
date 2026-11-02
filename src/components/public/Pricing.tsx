/**
 * Pricing Page
 * Transparent fintech pricing architecture
 */

import React from 'react';
import { Check, Shield, Zap } from 'lucide-react';

interface PricingProps {
  onSelectPlan: (plan: string) => void;
}

export const Pricing: React.FC<PricingProps> = ({ onSelectPlan }) => {
  const plans = [
    {
      name: 'Starter Merchant',
      badge: 'For Growing Businesses',
      price: '₹0',
      period: 'Zero Monthly Fee',
      commission: '0.0% UPI Gateway Fee',
      description: 'Ideal for startups, creators, and freelancers automating up to ₹2,00,000 monthly in UPI collections.',
      features: [
        'Dynamic UPI QR Generation',
        'Mobile UPI Intent Support',
        'Authoritative UTR Verification Engine',
        'Duplicate Transaction Defense',
        'Standard HMAC Webhooks (1s latency)',
        'Merchant Operations Dashboard',
        'Email Support',
      ],
      cta: 'Start Free Account',
      popular: false,
    },
    {
      name: 'Growth & High Volume',
      badge: 'Most Popular',
      price: '₹999',
      period: 'per month',
      commission: '0.0% Commission (Zero Brokerage)',
      description: 'Built for high-velocity merchants, SaaS products, and e-commerce platforms requiring instant webhooks.',
      features: [
        'Unlimited Dynamic UPI QRs',
        'Sub-100ms QR Generation Latency',
        'Real-time FamGateway Direct Integration',
        'Prioritized UTR Verification Prober',
        'Automated Exponential Backoff Webhook Retries',
        'Unlimited Team & Developer API Keys',
        'Exportable PHP 8.2 & MySQL Codebase',
        'Priority 24/7 SLA Support',
      ],
      cta: 'Deploy Growth Platform',
      popular: true,
    },
    {
      name: 'Enterprise Self-Hosted',
      badge: 'Full Source Code',
      price: '₹4,999',
      period: 'one-time license',
      commission: '100% Self-Hosted & Owned',
      description: 'Complete production PHP 8.2+ MVC and MySQL 8 schema deployed on your own VPS or cPanel server.',
      features: [
        'Complete PHP 8.2 MVC Source Code',
        'MySQL 8 Migration Scripts (All 22 Tables)',
        'Standalone Apache / Nginx Deployment',
        'Direct Bank API & FamGateway Connectors',
        'Custom Domain & Brand White-labeling',
        'Zero Transaction Limits Forever',
        'Complete Codebase Ownership',
      ],
      cta: 'Get Full Source Code',
      popular: false,
    },
  ];

  return (
    <section className="py-20 border-b border-slate-800/80 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2">
            Pricing & Commercials
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Transparent Pricing with 0% UPI Commission
          </h1>
          <p className="text-sm text-slate-400 mt-2">
            Keep 100% of your earnings. No hidden transaction percentages or delayed settlement windows.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((p, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-8 flex flex-col justify-between transition-all ${
                p.popular
                  ? 'bg-slate-900 border-2 border-blue-500 shadow-2xl shadow-blue-500/10'
                  : 'bg-slate-900 border border-slate-800'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-blue-400">{p.badge}</span>
                  {p.popular && (
                    <span className="text-[10px] uppercase font-bold text-white bg-blue-600 px-2.5 py-0.5 rounded-full">
                      Popular Choice
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-white mb-1">{p.name}</h3>
                <p className="text-xs text-slate-400 mb-6">{p.description}</p>

                <div className="mb-6 pb-6 border-b border-slate-800">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black font-mono text-white tabular-nums">{p.price}</span>
                    <span className="text-xs text-slate-400 font-mono">{p.period}</span>
                  </div>
                  <div className="mt-2 text-xs font-semibold text-emerald-400">{p.commission}</div>
                </div>

                <div className="space-y-3 mb-8">
                  {p.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2.5 text-xs text-slate-300">
                      <Check className="w-4 h-4 text-blue-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onSelectPlan(p.name)}
                className={`w-full py-3 px-4 rounded-xl text-xs font-semibold transition-all ${
                  p.popular
                    ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30'
                    : 'bg-slate-800 hover:bg-slate-700 text-white'
                }`}
              >
                {p.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
