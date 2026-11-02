/**
 * Public Features Section
 * High-density fintech breakdown without marketing fluff
 */

import React from 'react';
import {
  Code,
  CreditCard,
  Key,
  Layers,
  Lock,
  QrCode,
  RefreshCw,
  Shield,
  Smartphone,
  Webhook,
  Zap,
} from 'lucide-react';

export const Features: React.FC = () => {
  const features = [
    {
      icon: QrCode,
      title: 'Dynamic UPI QR Automation',
      description: 'Generate on-the-fly UPI QR codes with exact order sums and unique transaction references per session to prevent mismatched deposits.',
    },
    {
      icon: Shield,
      title: 'Authoritative Payment Verification',
      description: 'Transactions transition to SUCCESS strictly after authoritative banking or provider confirmation. No fake screenshot or client-only confirmations.',
    },
    {
      icon: Lock,
      title: 'Atomic Duplicate UTR Defense',
      description: 'Prevents replay fraud with database unique constraints on the bank reference number (UTR). If a UTR is entered twice, it is instantly rejected.',
    },
    {
      icon: Webhook,
      title: 'Signed HMAC-SHA256 Webhooks',
      description: 'Receive real-time payment alerts with cryptographic signature verification, delivery history logs, and automatic exponential backoff retries.',
    },
    {
      icon: Smartphone,
      title: 'Mobile UPI Intent Links',
      description: 'Single-tap payment on mobile devices launches PhonePe, Google Pay, Paytm, or BHIM directly without manual VPA copying.',
    },
    {
      icon: Code,
      title: 'Developer First REST API',
      description: 'Clean JSON endpoints with standard Bearer token authentication, idempotency keys, and comprehensive cURL, PHP, and Node.js SDK examples.',
    },
  ];

  return (
    <section className="py-20 border-b border-slate-800/80 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2">
            Engineering & Infrastructure
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Built for High-Reliability Fintech Operations
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Designed for platforms processing thousands of UPI collections daily with zero tolerance for reconciliation discrepancies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
