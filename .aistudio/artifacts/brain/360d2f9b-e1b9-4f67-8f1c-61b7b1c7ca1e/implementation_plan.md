# MAXXfam Payment Gateway Platform

> Smart Payments. Real Verification. Complete Control.

MAXXfam is a production-oriented, enterprise-grade payment gateway platform designed for modern Indian and international digital commerce with dynamic UPI automation, inspired by the architecture of FamGateway. It provides a complete public marketing and documentation portal, an all-inclusive merchant operations dashboard, a dedicated administrative control center, a mobile-first hosted checkout engine with live QR and intent integration, authoritative payment verification with idempotency protection and duplicate UTR defense, and complete exportable PHP 8.2+ / MySQL 8 production source code for shared hosting and cPanel deployments.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> **Key Architecture Decisions for Review:**
> - **Live Interactive Platform + Downloadable PHP/MySQL Package**: The web app runs as a fully reactive, high-performance TypeScript/Node/React gateway engine with real in-browser & backend state persistence, dynamic QR rendering, and webhook delivery. Additionally, a dedicated **Codebase & Deployment Exporter** provides the complete production PHP 8.2+ MVC source files, database migrations (`schema.sql`), Apache `.htaccess`, Nginx configurations, and cPanel setup instructions.
> - **Authoritative Verification Engine**: Following strict fintech principles, QR generation alone never marks an order as paid. Payment confirmation occurs strictly through verified provider status polling, timing-safe HMAC-SHA256 webhooks, and duplicate UTR prevention locks.
> - **FamGateway Adapter & Sandbox Simulator**: Provides a live FamGateway API integration adapter (with encrypted server-side credential management) alongside an interactive Sandbox & Webhook Simulator so merchants can test end-to-end checkout, payment confirmation, and webhook callbacks before connecting live bank or provider credentials.

- **Confirmed Decision 1**: Dual-role operational dashboard with instantaneous seamless switching between Merchant, Admin, and Hosted Checkout viewports.
- **Confirmed Decision 2**: Zero-pill typographic discipline, dark navy/slate fintech aesthetic, and WCAG AA contrast compliance.
- **Confirmed Decision 3**: Complete REST API test console with real Bearer token verification and HMAC signature calculation.

---

## 1. Overview & Core Concept

- **What It Does**: MAXXfam enables merchants to generate instant UPI dynamic payment QRs, create customizable payment links, accept payments through automated checkout sessions, verify UTR/transaction references authoritatively, and receive signed webhook alerts.
- **Target Audience / Persona**: E-commerce stores, SaaS platforms, freelance merchants, and enterprise developers requiring zero-brokerage, instant UPI payment automation with real-time settlement tracking.
- **Key Value**: Eliminates manual UTR checking, provides cryptographic fraud protection against duplicate transactions or replay attacks, and delivers an intuitive self-service portal for both technical and non-technical merchants.

---

## 2. User Experience & Visual Design

### Key User Flows
1. **Public Discovery & Onboarding**:
   - Visitors land on the public homepage featuring dynamic UPI payment demonstrations, interactive API previews, feature comparisons, developer documentation, and pricing tiers.
   - Self-service registration creates a merchant profile with unique API credentials and instant access to the merchant console.
2. **Payment Creation & Checkout Flow**:
   - Merchant creates a payment order via dashboard or REST API (`POST /api/v1/payments/create`).
   - Customer accesses the hosted checkout URL (`/checkout?order_id=...`).
   - Customer sees the exact payable amount, merchant business name, dynamic QR, expiry countdown (5-15 mins), and a 1-tap "Pay with UPI" intent button.
   - Customer completes payment in their UPI app (PhonePe, Google Pay, Paytm, BHIM, etc.).
   - The verification engine authoritative prober or signed webhook validates the transaction reference (UTR) against the provider.
   - Status transitions atomically to `SUCCESS`, triggering the digital receipt, PDF/print invoice download, and merchant webhook.
3. **Developer Integration & Webhook Monitoring**:
   - Merchants generate and rotate Bearer API keys (`mx_live_...`, `mx_test_...`).
   - Merchants configure webhook endpoints, select subscribed events (`payment.success`, `payment.failed`, etc.), test endpoints with live payload dispatches, and inspect HMAC-SHA256 signatures and HTTP delivery logs.
4. **Administrative Governance**:
   - Platform administrators inspect cross-merchant transaction volumes, configure payment provider credentials (FamGateway, UPI Direct), toggle maintenance mode, review audit and security logs, and handle support tickets.

### Visual Identity & Theme
- **Aesthetic Direction**: Ultra-crisp, high-density fintech design inspired by Stripe, Ramp, and Modern Treasury. Clean typography, deep navy slate (`#0B132B`, `#0F172A`) backgrounds for developer and checkout surfaces, crisp off-white canvas with subtle hairline borders (`border-slate-200 dark:border-slate-800`) for data tables.
- **Color Palette & Distribution**:
  - *60% Neutral Canvas*: Slate 50 / Slate 950 base surfaces.
  - *30% Structural Surfaces*: Pure white / Slate 900 cards with 1px hairline borders (`border-slate-200/80 dark:border-slate-800/80`).
  - *10% High-Intent Accent*: Royal Blue (`#2563EB`) & Indigo (`#4F46E5`) for primary actions; Emerald (`#059669`) for verified settlements; Amber (`#D97706`) for awaiting payments; Crimson (`#DC2626`) for failed/expired sessions.
- **Typography & Tabular Discipline**:
  - Display & Headlines: `Plus Jakarta Sans` with balanced line wraps (`text-wrap: balance`).
  - Body Prose: `Plus Jakarta Sans` / `DM Sans`.
  - Financial Data, UTRs, Order IDs, and Timestamps: Strict monospace tabular numerals (`font-mono tabular-nums`).
- **Interactive Feedback**:
  - Real-time countdown timer with radial progress.
  - Skeleton loaders during API calls.
  - Slide-in drawers for transaction detail inspections.
  - Copy-to-clipboard micro-feedback with visual confirmation.

---

## 3. System Architecture & Technical Strategy

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                               MAXXfam PLATFORM                                   │
└──────────────────────────────────────────────────────────────────────────────────┘
                                         │
         ┌───────────────────────────────┼───────────────────────────────┐
         ▼                               ▼                               ▼
┌──────────────────┐           ┌──────────────────┐           ┌──────────────────┐
│  PUBLIC PORTAL   │           │ MERCHANT CONSOLE │           │  ADMIN CONSOLE   │
│ - Landing Page   │           │ - Overview & KPIs│           │ - System Health  │
│ - Live Demo QR   │           │ - Payment Orders │           │ - Provider Setup │
│ - API Reference  │           │ - Payment Links  │           │ - Merchant Audit │
│ - Documentation  │           │ - API Keys & Logs│           │ - Security Logs  │
│ - Pricing & FAQ  │           │ - Webhooks Engine│           │ - SMTP & Config  │
│ - Status Page    │           │ - Invoices & PDF │           │ - Maintenance    │
└──────────────────┘           └──────────────────┘           └──────────────────┘
         │                               │                               │
         └───────────────────────────────┼───────────────────────────────┘
                                         ▼
                 ┌───────────────────────────────────────────────┐
                 │          MOBILE-FIRST HOSTED CHECKOUT         │
                 │ - Dynamic QR Generation (UPI spec compliant)  │
                 │ - Intent Link Generation (PhonePe, GPay, etc.)│
                 │ - Real-Time Status Prober & Expiry Engine     │
                 │ - Authoritative Receipt & Invoice Dispatcher  │
                 └───────────────────────────────────────────────┘
                                         │
                                         ▼
                 ┌───────────────────────────────────────────────┐
                 │       AUTHORITATIVE VERIFICATION ENGINE       │
                 │ - FamGateway Provider Adapter & API Client    │
                 │ - Test Sandbox Simulator (Real Ledger State)  │
                 │ - Atomic UTR Uniqueness & Idempotency Lock   │
                 │ - HMAC-SHA256 Webhook Dispatcher with Retries │
                 └───────────────────────────────────────────────┘
                                         │
         ┌───────────────────────────────┴───────────────────────────────┐
         ▼                                                               ▼
┌──────────────────────────────────┐            ┌──────────────────────────────────┐
│  IN-APP REACT/EXPRESS DATABASE   │            │   EXPORTABLE PHP 8.2+ / MYSQL 8  │
│ - LocalStorage / Memory Store    │            │ - Complete MVC Architecture      │
│ - REST API endpoints (/api/v1/*) │            │ - PDO Prepared SQL Migrations    │
│ - Real-time Ledger & Webhooks    │            │ - cPanel & Apache/Nginx Configs  │
└──────────────────────────────────┘            └──────────────────────────────────┘
```

---

## 4. Key Product Decisions & Trade-Offs

- **Decision 1: Modular Payment Provider Architecture (FamGateway + Sandbox)**:
  - *Chosen Approach*: Implement a provider adapter pattern with a FamGateway production client and an interactive Sandbox simulator.
  - *Why*: Allows developers and merchants without active FamGateway merchant credentials to experience end-to-end checkout, automated status polling, UTR validation, and signed webhooks, while allowing live production keys (`FAM_API_KEY`, `FAM_SECRET`) to be input in Admin settings for live transactions.
  - *Alternatives Considered*: Hardcoding a fake status switch was rejected because it violates the master prompt instruction against mock transactions.

- **Decision 2: In-App Complete Storage & REST API Execution + Full PHP Codebase Exporter**:
  - *Chosen Approach*: Implement a full in-browser/backend REST API engine that responds to `/api/v1/payments/create`, `/api/v1/payments/:id`, and `/api/v1/webhooks/test`, alongside a dedicated **PHP/MySQL Source Inspector & Downloader** where users can inspect and download the raw `.php`, `.sql`, and `.env` files for production cPanel deployment.
  - *Why*: Solves both requirements: immediate live interactive execution in AI Studio preview on Port 3000, and complete production PHP 8.2 + MySQL 8 files ready for deployment.

- **Decision 3: Atomic UTR Uniqueness and Idempotency Defense**:
  - *Chosen Approach*: Every payment verification checks whether the submitted or provider-returned UTR has already been applied to any prior transaction. If a UTR is repeated, the verification engine rejects it with `DUPLICATE_UTR_DETECTED`.
  - *Why*: Critical fintech security requirement that protects merchants against replay fraud and fake screenshot submissions.

---

## 5. Implementation Roadmap & Verification

1. **Brand & Foundation**:
   - Update `index.html` and `metadata.json` with MAXXfam branding and OpenGraph tags.
   - Configure Tailwind v4 styling with `@custom-variant dark` support and Plus Jakarta Sans typography.
2. **Core Domain Stores & Verification Engine**:
   - Implement data models (users, merchants, orders, transactions, payment links, API keys, webhooks, provider credentials, audit logs).
   - Implement the FamGateway Adapter and Authoritative Payment Verification Engine with UTR uniqueness checking, HMAC-SHA256 signing, and expiry logic.
3. **Public Portal Pages**:
   - Homepage with animated hero, interactive UPI payment demo, API code walkthrough, features, pricing, documentation, system status, terms, and privacy policy.
   - Authentication system with role-based switching (Merchant, Administrator, Customer Checkout).
4. **Merchant Dashboard**:
   - KPI metrics (total volume, successful, pending, failed, today's transactions).
   - Create Payment modal with dynamic order ID and expiry setting.
   - Payment Links generator with shareable links and QR generator.
   - Transactions ledger with search, filtering, and export (CSV/JSON/Invoice print).
   - API Management console (key generation, secret rotation, endpoint testing console).
   - Webhooks configuration with test dispatcher and delivery history.
   - Integration settings with provider status prober.
   - Invoices, support tickets, and profile settings.
5. **Administrator Dashboard**:
   - Platform metrics, merchant management, payment provider configuration with credential vault, system configuration, maintenance mode toggle, audit logs, and security logs.
6. **Mobile-First Hosted Checkout**:
   - Responsive checkout view with dynamic QR code (standard UPI format), countdown timer, live status polling, UPI intent link, and verified payment confirmation screen.
7. **PHP 8.2+ & MySQL 8 Production Package**:
   - Provide complete downloadable and browsable files for production server deployment: `schema.sql`, `config/database.php`, `app/Providers/FamGatewayAdapter.php`, `app/Controllers/PaymentController.php`, `.htaccess`, and `README.md`.
8. **Verification**:
   - Compile applet with `compile_applet` and verify no syntax or runtime errors.
