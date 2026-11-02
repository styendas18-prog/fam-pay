/**
 * Public Hero Component
 * Features an interactive dynamic UPI payment demonstration with real state transitions.
 */

import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  Lock,
  RefreshCw,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Zap,
} from 'lucide-react';

interface HeroProps {
  onOpenDashboard: () => void;
  onOpenDocs: () => void;
  onOpenCheckoutDemo: (orderId: string) => void;
  onOpenPhpSource: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenDashboard,
  onOpenDocs,
  onOpenCheckoutDemo,
  onOpenPhpSource,
}) => {
  const [demoAmount, setDemoAmount] = useState<number>(499.00);
  const [demoOrderId] = useState<string>('ORD_DEMO_7891');
  const [demoState, setDemoState] = useState<'IDLE' | 'GENERATED' | 'VERIFYING' | 'SUCCESS'>('GENERATED');
  const [demoUtr, setDemoUtr] = useState<string>('430599182341');

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Generate UPI string
  const upiString = `upi://pay?pa=demo.maxxfam@icici&pn=MAXXfam%20Demo&am=${demoAmount.toFixed(2)}&tr=${demoOrderId}&tn=Demo%20UPI%20Verification&cu=INR`;

  useEffect(() => {
    if (canvasRef.current && (demoState === 'GENERATED' || demoState === 'VERIFYING')) {
      QRCode.toCanvas(
        canvasRef.current,
        upiString,
        {
          width: 170,
          margin: 1,
          color: {
            dark: '#0B132B',
            light: '#FFFFFF',
          },
        },
        (err) => {
          if (err) console.error('Demo QR Error:', err);
        }
      );
    }
  }, [demoState, demoAmount, upiString]);

  const handleSimulatePayment = () => {
    setDemoState('VERIFYING');
    setTimeout(() => {
      const generatedUtr = `4${Math.floor(10000000000 + Math.random() * 90000000000)}`;
      setDemoUtr(generatedUtr);
      setDemoState('SUCCESS');
    }, 1200);
  };

  const handleResetDemo = () => {
    setDemoState('GENERATED');
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-20 border-b border-slate-800/80">
      {/* Background Gradient Mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(37,99,235,0.18),rgba(255,255,255,0))] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-950/60 border border-blue-800/40 rounded-full text-xs font-medium text-blue-300">
              <Zap className="w-3.5 h-3.5 text-blue-400" />
              <span>Next-Gen UPI Automation Architecture</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15] text-balance">
              Smart Payments. Real Verification. Complete Control.
            </h1>

            <p className="text-base text-slate-300 max-w-2xl leading-relaxed">
              MAXXfam empowers merchants and developers with zero-brokerage, high-concurrency dynamic UPI QR automation.
              Authoritatively verify bank reference numbers (UTR) with atomic database protection and real-time signed webhooks.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenDashboard}
                className="flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-blue-600/30 transition-all"
              >
                <span>Launch Merchant Console</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenDocs}
                className="flex items-center gap-2 px-4 py-3 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-200 text-sm font-semibold rounded-xl transition-colors"
              >
                <Code2 className="w-4 h-4 text-blue-400" />
                <span>REST API Reference</span>
              </button>

              <button
                onClick={onOpenPhpSource}
                className="flex items-center gap-2 px-4 py-3 bg-slate-900/80 hover:bg-slate-800/80 border border-emerald-800/50 text-emerald-400 text-sm font-semibold rounded-xl transition-colors"
              >
                <Lock className="w-4 h-4" />
                <span>PHP 8.2 & MySQL Codebase</span>
              </button>
            </div>

            {/* Proof Metric Strip */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-6 text-left">
              <div>
                <div className="text-xl font-bold font-mono text-white tabular-nums">0.0%</div>
                <div className="text-xs text-slate-400 mt-0.5">Gateway Commission</div>
              </div>
              <div>
                <div className="text-xl font-bold font-mono text-white tabular-nums">&lt;150ms</div>
                <div className="text-xs text-slate-400 mt-0.5">QR Generation Latency</div>
              </div>
              <div>
                <div className="text-xl font-bold font-mono text-emerald-400 tabular-nums">100%</div>
                <div className="text-xs text-slate-400 mt-0.5">Authoritative UTR Checks</div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Interactive Dynamic QR Demonstration */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
              {/* Header Label: Anti-Slop Clear Demo Indicator */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 text-xs">
                <div className="flex items-center gap-1.5 text-blue-400 font-semibold uppercase tracking-wider text-[11px]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Dynamic QR Interactive Sandbox</span>
                </div>
                <span className="text-[10px] text-amber-400 font-mono bg-amber-950/40 border border-amber-800/30 px-2 py-0.5 rounded">
                  DEMO DATA
                </span>
              </div>

              {/* Order Info & Amount Selector */}
              <div className="py-4">
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="text-slate-400">Order ID: <span className="font-mono text-slate-200">{demoOrderId}</span></span>
                  <div className="flex items-center gap-1">
                    {[199, 499, 1499].map((amt) => (
                      <button
                        key={amt}
                        onClick={() => {
                          setDemoAmount(amt);
                          setDemoState('GENERATED');
                        }}
                        className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                          demoAmount === amt
                            ? 'bg-blue-600 text-white font-bold'
                            : 'bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        ₹{amt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* State: GENERATED or VERIFYING */}
                {(demoState === 'GENERATED' || demoState === 'VERIFYING') && (
                  <div className="flex flex-col items-center">
                    <div className="bg-white p-3 rounded-xl shadow-md border border-slate-200 my-2">
                      <canvas ref={canvasRef} className="rounded" />
                    </div>

                    <div className="text-center mt-2 mb-4">
                      <div className="text-xl font-bold font-mono text-white tabular-nums">
                        ₹{demoAmount.toFixed(2)}
                      </div>
                      <div className="text-[11px] text-slate-400">NPCI Compliant UPI Dynamic String</div>
                    </div>

                    <button
                      onClick={handleSimulatePayment}
                      disabled={demoState === 'VERIFYING'}
                      className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs font-semibold rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
                    >
                      {demoState === 'VERIFYING' ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Polling Banking Provider API...</span>
                        </>
                      ) : (
                        <>
                          <Smartphone className="w-3.5 h-3.5" />
                          <span>Simulate Customer Payment in UPI App</span>
                        </>
                      )}
                    </button>
                  </div>
                )}

                {/* State: SUCCESS */}
                {demoState === 'SUCCESS' && (
                  <div className="py-6 flex flex-col items-center text-center animate-in zoom-in-95 duration-200">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div className="text-sm font-bold text-white mb-0.5">Authoritative Verification Confirmed</div>
                    <div className="text-xs text-slate-400 mb-4">Funds settled atomically to merchant settlement account</div>

                    <div className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-left text-xs space-y-1.5 mb-4">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Bank Reference (UTR):</span>
                        <span className="font-mono text-emerald-400 font-semibold">{demoUtr}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Order ID:</span>
                        <span className="font-mono text-white">{demoOrderId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Webhook Status:</span>
                        <span className="text-blue-400 font-mono">Dispatched (HTTP 200)</span>
                      </div>
                    </div>

                    <button
                      onClick={handleResetDemo}
                      className="text-xs text-blue-400 hover:text-blue-300 font-medium transition-colors"
                    >
                      ← Reset Sandbox Simulation
                    </button>
                  </div>
                )}
              </div>

              {/* Bottom Card Footer */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Duplicate UTR Defense Active</span>
                </span>
                <button
                  onClick={() => onOpenCheckoutDemo('ord_sample_03')}
                  className="text-blue-400 hover:text-blue-300 font-medium"
                >
                  View Hosted Checkout Page →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
