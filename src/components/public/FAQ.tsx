/**
 * FAQ & Legal Components
 */

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does MAXXfam prevent duplicate UTR numbers and fake payment confirmations?',
      a: 'MAXXfam enforces database-level UNIQUE constraints and row-level locking on the `transactions.utr` column. When a customer or provider submits a bank UTR, MAXXfam checks all historical settled transactions. If the UTR has already been claimed or does not match authoritative bank records, the transaction is rejected immediately with DUPLICATE_UTR_DETECTED.',
    },
    {
      q: 'Does MAXXfam require external credentials to operate?',
      a: 'MAXXfam includes a built-in interactive Sandbox Engine for developer testing right away. To process live production payments with actual bank settlements, you can configure your official FamGateway API key and secret in the Admin Panel -> Payment Providers.',
    },
    {
      q: 'Can I host MAXXfam on cPanel, shared hosting, or an Apache/Nginx VPS?',
      a: 'Yes! MAXXfam is architected with a production PHP 8.2+ backend and standard MySQL 8 PDO migrations. Use the "PHP Source Code" tab in the top navigation to view or download the complete production PHP package, database schema (`schema.sql`), and cPanel deployment instructions.',
    },
    {
      q: 'Are webhook notifications signed?',
      a: 'Yes. Every webhook payload is signed using HMAC-SHA256 with a unique merchant secret. You can test your webhook receiver endpoint directly in the Developer Documentation console with live payload dispatches.',
    },
    {
      q: 'What is the transaction fee on UPI collections?',
      a: 'MAXXfam charges 0.0% gateway commission. Payments go directly from your customer\'s UPI app to your merchant settlement account with zero intermediary deductions.',
    },
  ];

  return (
    <section className="py-20 border-b border-slate-800/80 bg-slate-900/40">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2">
            Frequently Asked Questions
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Common Inquiries & Verification Details
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between text-sm font-semibold text-white hover:text-blue-400 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-blue-400' : ''}`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export const LegalPages: React.FC<{ type: 'privacy' | 'terms' }> = ({ type }) => {
  return (
    <div className="py-16 max-w-4xl mx-auto px-6">
      <h1 className="text-2xl font-bold text-white mb-6">
        {type === 'privacy' ? 'Privacy Policy' : 'Terms and Conditions of Service'}
      </h1>
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-xs text-slate-300 leading-relaxed space-y-4">
        <p className="font-semibold text-slate-100">1. Architectural Scope & Service Overview</p>
        <p>
          MAXXfam provides dynamic UPI payment session infrastructure, cryptographic webhook dispatching, and transaction reconciliation tools for verified merchants. MAXXfam does not hold merchant custody of funds; settlements are executed directly across NPCI UPI participating banking rails.
        </p>

        <p className="font-semibold text-slate-100">2. Authoritative Verification & Anti-Fraud Standards</p>
        <p>
          Merchants agree to rely strictly on authoritative banking APIs or signed webhooks for fulfillment. Submitting forged UTR numbers or bypassing duplicate detection will result in immediate suspension and security audit logging.
        </p>

        <p className="font-semibold text-slate-100">3. Data Security and Privacy</p>
        <p>
          All API secrets and provider credentials are stored with AES-256 server-side encryption. Customer payment references and emails are retained strictly for transaction receipting, audit compliance, and dispute resolution.
        </p>
      </div>
    </div>
  );
};
