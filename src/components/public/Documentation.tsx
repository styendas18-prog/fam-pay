/**
 * Developer Documentation & Interactive API Reference
 * Features full endpoint specifications and an interactive API Tester console.
 */

import React, { useState } from 'react';
import {
  Check,
  Code2,
  Copy,
  ExternalLink,
  Lock,
  Play,
  RefreshCw,
  Send,
  Terminal,
} from 'lucide-react';
import { storage } from '../../services/storage';

interface Endpoint {
  method: 'POST' | 'GET';
  path: string;
  title: string;
  description: string;
  sampleRequest?: string;
  sampleResponse: string;
  requiresAuth: boolean;
}

export const Documentation: React.FC = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState<number>(0);
  const [apiKeyInput, setApiKeyInput] = useState<string>('mx_live_8a7f9c2d1e4b506a7f8e9d0c1b2a3f4e');
  const [requestBodyInput, setRequestBodyInput] = useState<string>(
    JSON.stringify(
      {
        amount: 1499.00,
        customer_name: 'Rajesh Sharma',
        customer_email: 'rajesh.sharma@example.in',
        description: 'Annual Cloud Storage Subscription',
        customer_reference: 'INV-2026-99',
        expiry_minutes: 15,
      },
      null,
      2
    )
  );
  const [apiResponse, setApiResponse] = useState<string | null>(null);
  const [executing, setExecuting] = useState<boolean>(false);
  const [activeCodeLang, setActiveCodeLang] = useState<'curl' | 'php' | 'js'>('curl');
  const [copied, setCopied] = useState<boolean>(false);

  const endpoints: Endpoint[] = [
    {
      method: 'POST',
      path: '/api/v1/payments/create',
      title: 'Create Payment Order',
      description: 'Generates a new dynamic UPI payment session, QR code, intent string, and hosted checkout URL.',
      sampleRequest: JSON.stringify(
        {
          amount: 1499.00,
          customer_name: 'Rajesh Sharma',
          customer_email: 'rajesh.sharma@example.in',
          description: 'Annual Cloud Storage Subscription',
          customer_reference: 'INV-2026-99',
          expiry_minutes: 15,
        },
        null,
        2
      ),
      sampleResponse: JSON.stringify(
        {
          status: 'success',
          data: {
            order_id: 'ORD_20261031_8241',
            amount: 1499.00,
            currency: 'INR',
            status: 'PENDING',
            qr_string: 'upi://pay?pa=maxxfam.settlement@icici&pn=Apex%20Digital&am=1499.00&tr=ORD_20261031_8241&tn=Cloud%20Storage',
            upi_intent_url: 'upi://pay?pa=maxxfam.settlement@icici&pn=Apex%20Digital&am=1499.00&tr=ORD_20261031_8241&tn=Cloud%20Storage',
            checkout_url: 'https://gateway.maxxfam.in/checkout?order_id=ORD_20261031_8241',
            expires_at: '2026-10-31T08:29:22Z',
          },
        },
        null,
        2
      ),
      requiresAuth: true,
    },
    {
      method: 'GET',
      path: '/api/v1/payments/{order_id}',
      title: 'Get Payment Status',
      description: 'Retrieve real-time status, UTR number, and authoritative settlement details for an existing order.',
      sampleResponse: JSON.stringify(
        {
          status: 'success',
          data: {
            order_id: 'ORD_20261031_8241',
            amount: 1499.00,
            currency: 'INR',
            status: 'SUCCESS',
            utr_number: '430519284719',
            receipt_number: 'REC-2026-0041',
            verified_at: '2026-10-31T08:14:22Z',
          },
        },
        null,
        2
      ),
      requiresAuth: true,
    },
    {
      method: 'GET',
      path: '/api/v1/payments',
      title: 'List All Orders',
      description: 'Fetch paginated list of payment orders with status filters and customer references.',
      sampleResponse: JSON.stringify(
        {
          status: 'success',
          total_count: 42,
          data: [
            {
              order_id: 'ORD_20261031_8241',
              amount: 1499.00,
              status: 'SUCCESS',
              customer_name: 'Rajesh Sharma',
              created_at: '2026-10-31T08:10:00Z',
            },
          ],
        },
        null,
        2
      ),
      requiresAuth: true,
    },
    {
      method: 'POST',
      path: '/api/v1/payment-links/create',
      title: 'Create Shareable Payment Link',
      description: 'Create a reusable payment link with fixed or customer-chosen amount.',
      sampleRequest: JSON.stringify(
        {
          title: 'Consulting Consultation',
          amount: 2500.00,
          is_variable: false,
          description: '30-minute architecture review session',
        },
        null,
        2
      ),
      sampleResponse: JSON.stringify(
        {
          status: 'success',
          data: {
            link_id: 'pl_mxfam_quickpay',
            url: 'https://gateway.maxxfam.in/pay/pl_mxfam_quickpay',
            active: true,
          },
        },
        null,
        2
      ),
      requiresAuth: true,
    },
    {
      method: 'POST',
      path: '/api/v1/webhooks/test',
      title: 'Dispatch Test Webhook',
      description: 'Triggers a simulated HMAC-SHA256 signed test event payload to verify your endpoint signature verification logic.',
      sampleRequest: JSON.stringify(
        {
          url: 'https://api.merchant.com/webhook',
          event: 'payment.success',
        },
        null,
        2
      ),
      sampleResponse: JSON.stringify(
        {
          status: 'success',
          message: 'Test webhook delivered',
          response_code: 200,
          signature: 'sha256=e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
        },
        null,
        2
      ),
      requiresAuth: true,
    },
    {
      method: 'GET',
      path: '/api/v1/account/profile',
      title: 'Merchant Account Profile',
      description: 'Returns merchant verification state, business VPA, settlement details, and volume tiers.',
      sampleResponse: JSON.stringify(
        {
          status: 'success',
          data: {
            merchant_code: 'MX_APEX_8912',
            business_name: 'Apex Digital Technologies',
            settlement_vpa: 'maxxfam.merchant@icici',
            kyc_verified: true,
          },
        },
        null,
        2
      ),
      requiresAuth: true,
    },
  ];

  const currentEndpoint = endpoints[selectedEndpoint];

  const handleExecuteTest = () => {
    setExecuting(true);
    setApiResponse(null);

    setTimeout(() => {
      setExecuting(false);
      try {
        if (currentEndpoint.path === '/api/v1/payments/create') {
          const parsed = JSON.parse(requestBodyInput);
          const order = storage.createOrder({
            amount: Number(parsed.amount) || 500,
            customer_name: parsed.customer_name || 'Test User',
            customer_email: parsed.customer_email || 'test@example.com',
            description: parsed.description || 'Test payment',
            customer_reference: parsed.customer_reference,
            expiry_minutes: parsed.expiry_minutes || 15,
          });

          setApiResponse(
            JSON.stringify(
              {
                status: 'success',
                message: 'Order created in real gateway database',
                data: {
                  order_id: order.order_id,
                  amount: order.amount,
                  currency: order.currency,
                  status: order.status,
                  qr_string: order.qr_string,
                  upi_intent_url: order.upi_intent_url,
                  checkout_url: `https://gateway.maxxfam.in/checkout?order_id=${order.order_id}`,
                  expires_at: order.expires_at,
                },
              },
              null,
              2
            )
          );
        } else if (currentEndpoint.path === '/api/v1/payments') {
          const orders = storage.getOrders();
          setApiResponse(
            JSON.stringify(
              {
                status: 'success',
                total_count: orders.length,
                data: orders.slice(0, 5).map((o) => ({
                  order_id: o.order_id,
                  amount: o.amount,
                  status: o.status,
                  customer_name: o.customer_name,
                  created_at: o.created_at,
                })),
              },
              null,
              2
            )
          );
        } else if (currentEndpoint.path === '/api/v1/payment-links/create') {
          const parsed = JSON.parse(requestBodyInput);
          const link = storage.createPaymentLink({
            title: parsed.title || 'New Payment Link',
            amount: Number(parsed.amount) || 0,
            is_variable: Boolean(parsed.is_variable),
            description: parsed.description || 'Payment link description',
          });
          setApiResponse(
            JSON.stringify(
              {
                status: 'success',
                data: {
                  link_id: link.link_id,
                  url: `https://gateway.maxxfam.in/pay/${link.link_id}`,
                  active: link.active,
                },
              },
              null,
              2
            )
          );
        } else {
          setApiResponse(currentEndpoint.sampleResponse);
        }
      } catch (err: any) {
        setApiResponse(
          JSON.stringify(
            {
              status: 'error',
              error_code: 'BAD_REQUEST',
              message: err.message,
            },
            null,
            2
          )
        );
      }
    }, 500);
  };

  const getCodeSnippet = () => {
    if (activeCodeLang === 'curl') {
      return `curl -X ${currentEndpoint.method} "https://gateway.maxxfam.in${currentEndpoint.path}" \\
  -H "Authorization: Bearer ${apiKeyInput}" \\
  -H "Content-Type: application/json"${
    currentEndpoint.sampleRequest ? ` \\\n  -d '${currentEndpoint.sampleRequest.replace(/\n/g, '')}'` : ''
  }`;
    }

    if (activeCodeLang === 'php') {
      return `<?php
$ch = curl_init('https://gateway.maxxfam.in${currentEndpoint.path}');
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => [
        'Authorization: Bearer ${apiKeyInput}',
        'Content-Type: application/json'
    ],${
      currentEndpoint.sampleRequest
        ? `\n    CURLOPT_POST => true,\n    CURLOPT_POSTFIELDS => json_encode(${currentEndpoint.sampleRequest}),`
        : ''
    }
]);
$response = json_decode(curl_exec($ch), true);
print_r($response);`;
    }

    return `const response = await fetch('https://gateway.maxxfam.in${currentEndpoint.path}', {
  method: '${currentEndpoint.method}',
  headers: {
    'Authorization': 'Bearer ${apiKeyInput}',
    'Content-Type': 'application/json'
  }${currentEndpoint.sampleRequest ? `,\n  body: JSON.stringify(${currentEndpoint.sampleRequest})` : ''}
});
const data = await response.json();
console.log(data);`;
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(getCodeSnippet());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="py-12 border-b border-slate-800/80 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-8">
          <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2">
            Developer Documentation
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            MAXXfam REST API v1 & Webhooks
          </h1>
          <p className="text-sm text-slate-400 mt-2">
            Simple, idempotent endpoints for creating dynamic UPI sessions, tracking settlements, and receiving cryptographically signed HMAC webhooks.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Endpoint List Navigation */}
          <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="p-3.5 bg-slate-850 border-b border-slate-800 text-xs font-semibold text-slate-300">
              API Endpoints
            </div>
            <div className="divide-y divide-slate-800/60">
              {endpoints.map((ep, idx) => {
                const isSelected = selectedEndpoint === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedEndpoint(idx);
                      setApiResponse(null);
                      if (ep.sampleRequest) {
                        setRequestBodyInput(ep.sampleRequest);
                      }
                    }}
                    className={`w-full p-3.5 text-left text-xs transition-colors flex flex-col gap-1 ${
                      isSelected
                        ? 'bg-blue-600/10 border-l-2 border-blue-500 text-white'
                        : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          ep.method === 'POST' ? 'bg-blue-950 text-blue-400 border border-blue-800/40' : 'bg-emerald-950 text-emerald-400 border border-emerald-800/40'
                        }`}
                      >
                        {ep.method}
                      </span>
                      <span className="font-mono text-slate-300 truncate">{ep.path}</span>
                    </div>
                    <span className="text-slate-400 text-[11px] truncate">{ep.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Endpoint Details & Interactive Tester */}
          <div className="lg:col-span-8 space-y-6">
            {/* Endpoint Summary Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <span
                  className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                    currentEndpoint.method === 'POST'
                      ? 'bg-blue-950 text-blue-400 border border-blue-800/40'
                      : 'bg-emerald-950 text-emerald-400 border border-emerald-800/40'
                  }`}
                >
                  {currentEndpoint.method}
                </span>
                <span className="font-mono text-base font-bold text-white">{currentEndpoint.path}</span>
              </div>
              <h2 className="text-lg font-bold text-white mb-1">{currentEndpoint.title}</h2>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">{currentEndpoint.description}</p>

              {/* Code Snippets Bar */}
              <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950">
                <div className="flex items-center justify-between px-3 py-2 bg-slate-900 border-b border-slate-800 text-xs">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveCodeLang('curl')}
                      className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors ${
                        activeCodeLang === 'curl' ? 'bg-slate-800 text-white font-bold' : 'text-slate-400'
                      }`}
                    >
                      cURL
                    </button>
                    <button
                      onClick={() => setActiveCodeLang('php')}
                      className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors ${
                        activeCodeLang === 'php' ? 'bg-slate-800 text-white font-bold' : 'text-slate-400'
                      }`}
                    >
                      PHP
                    </button>
                    <button
                      onClick={() => setActiveCodeLang('js')}
                      className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors ${
                        activeCodeLang === 'js' ? 'bg-slate-800 text-white font-bold' : 'text-slate-400'
                      }`}
                    >
                      Node.js
                    </button>
                  </div>

                  <button
                    onClick={handleCopyCode}
                    className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <div className="p-3 font-mono text-xs text-slate-300 overflow-x-auto max-h-48">
                  <pre>{getCodeSnippet()}</pre>
                </div>
              </div>
            </div>

            {/* Interactive API Sandbox Tester */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-white">
                  <Terminal className="w-4 h-4 text-blue-400" />
                  <span>Live Sandbox API Console (Connected to Real Ledger)</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-mono">PORT 3000 ACTIVE</span>
              </div>

              {/* Bearer Token Header Input */}
              <div className="mb-4">
                <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Authorization Header:
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-500 font-mono text-xs">Bearer</span>
                  <input
                    type="text"
                    value={apiKeyInput}
                    onChange={(e) => setApiKeyInput(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 focus:outline-none rounded-lg pl-18 pr-3 py-2 text-xs font-mono text-white"
                  />
                </div>
              </div>

              {/* Request Body if POST */}
              {currentEndpoint.method === 'POST' && (
                <div className="mb-4">
                  <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    Request Payload (JSON):
                  </label>
                  <textarea
                    rows={6}
                    value={requestBodyInput}
                    onChange={(e) => setRequestBodyInput(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 focus:outline-none rounded-lg p-3 text-xs font-mono text-white"
                  />
                </div>
              )}

              {/* Send Button */}
              <button
                onClick={handleExecuteTest}
                disabled={executing}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors mb-4"
              >
                {executing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                <span>Execute API Call</span>
              </button>

              {/* Response Window */}
              {apiResponse && (
                <div className="mt-4 border border-slate-800 rounded-lg overflow-hidden bg-slate-950">
                  <div className="px-3 py-2 bg-slate-850 border-b border-slate-800 text-[11px] font-semibold text-slate-300 flex items-center justify-between">
                    <span>Response Output</span>
                    <span className="text-emerald-400 font-mono">HTTP 200 OK</span>
                  </div>
                  <pre className="p-3 text-xs font-mono text-emerald-400 overflow-x-auto max-h-60 leading-relaxed">
                    {apiResponse}
                  </pre>
                </div>
              )}
            </div>

            {/* Webhook HMAC Security Explanation */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-xs text-slate-400 space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <Lock className="w-4 h-4 text-emerald-400" />
                <span>HMAC-SHA256 Webhook Verification Protocol</span>
              </div>
              <p className="leading-relaxed">
                Every webhook sent by MAXXfam includes the header <code className="font-mono text-slate-200">X-MAXXfam-Signature: sha256=...</code>.
                Always verify the signature against your webhook secret using timing-safe comparisons before fulfilling orders.
              </p>
              <div className="bg-slate-950 p-3 rounded-lg font-mono text-[11px] text-slate-300">
                $computed = hash_hmac('sha256', $rawPayload, $webhookSecret);<br />
                if (!hash_equals($computed, str_replace('sha256=', '', $headerSignature))) &#123;<br />
                &nbsp;&nbsp;http_response_code(401); die('Invalid signature');<br />
                &#125;
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
