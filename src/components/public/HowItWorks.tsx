/**
 * How It Works Section
 * Step-by-step mechanism from order creation to settlement
 */

import React from 'react';
import { ArrowRight, CheckCircle, Database, Lock, QrCode, Smartphone } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Merchant Creates Payment Order',
      desc: 'Through your backend REST API or Merchant Dashboard, initiate an order with amount in INR, description, and optional customer email/phone.',
      icon: Database,
    },
    {
      num: '02',
      title: 'Dynamic QR & Intent Session Generated',
      desc: 'MAXXfam produces an NPCI-compliant dynamic UPI payload with exact amount and order reference, returning a hosted checkout URL in <150ms.',
      icon: QrCode,
    },
    {
      num: '03',
      title: 'Customer Pays via Any UPI App',
      desc: 'Customer scans the QR code or taps the mobile intent button in PhonePe, Google Pay, or Paytm. The transaction is initiated through the UPI network.',
      icon: Smartphone,
    },
    {
      num: '04',
      title: 'Authoritative Bank Verification & Webhook',
      desc: 'The payment engine probes the authoritative provider or receives a signed webhook. Status updates atomically, prevents duplicate UTR reuse, and notifies your server.',
      icon: CheckCircle,
    },
  ];

  return (
    <section className="py-20 border-b border-slate-800/80 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2">
            Architecture Workflow
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            How MAXXfam Automates UPI Collections
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            A frictionless, automated verification cycle eliminating manual screenshot reviews and human reconciliation errors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="bg-slate-900 border border-slate-800 rounded-xl p-6 relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-2xl font-black text-slate-700">{step.num}</span>
                    <div className="w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="text-sm font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center text-[11px] text-blue-400 font-medium">
                  <span>Step {idx + 1} of 4</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
