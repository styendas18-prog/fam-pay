/**
 * MAXXfam Payment Gateway - Core TypeScript Type Definitions
 * "Smart Payments. Real Verification. Complete Control."
 */

export type OrderStatus = 'PENDING' | 'SUCCESS' | 'FAILED' | 'EXPIRED' | 'CANCELLED';

export type PaymentMethod = 'UPI_QR' | 'UPI_INTENT' | 'NET_BANKING' | 'CARDS';

export type UserRole = 'merchant' | 'admin' | 'customer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  business_name: string;
  fampay_upi_id?: string;
  is_active: boolean;
  two_factor_enabled: boolean;
  created_at: string;
}

export interface PaymentOrder {
  id: string;
  order_id: string; // e.g. ORD_20261031_9842
  merchant_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  customer_reference?: string;
  amount: number; // In INR
  currency: 'INR';
  description: string;
  status: OrderStatus;
  qr_string: string;
  upi_intent_url: string;
  provider: 'famgateway' | 'sandbox';
  provider_order_id?: string;
  utr_number?: string;
  verified_at?: string;
  expires_at: string;
  created_at: string;
  redirect_url?: string;
  webhook_url?: string;
  receipt_number?: string;
}

export interface Transaction {
  id: string;
  order_id: string;
  merchant_id: string;
  utr: string;
  amount: number;
  fee: number;
  net_amount: number;
  currency: 'INR';
  status: 'SETTLED' | 'PENDING' | 'REJECTED';
  payment_method: PaymentMethod;
  payer_vpa?: string;
  provider_ref: string;
  verified_by: string;
  timestamp: string;
}

export interface PaymentLink {
  id: string;
  link_id: string; // e.g. pl_mxfam_921
  merchant_id: string;
  title: string;
  amount: number;
  is_variable: boolean;
  description: string;
  customer_reference?: string;
  active: boolean;
  created_at: string;
  expires_at?: string;
  total_paid_count: number;
  total_amount_collected: number;
}

export interface ApiKey {
  id: string;
  merchant_id: string;
  name: string;
  key_prefix: string; // e.g. mx_live_ or mx_test_
  token: string;
  environment: 'live' | 'test';
  created_at: string;
  last_used_at?: string;
  status: 'active' | 'revoked';
}

export interface WebhookConfig {
  id: string;
  merchant_id: string;
  url: string;
  secret: string;
  events: string[];
  status: 'active' | 'inactive';
  created_at: string;
}

export interface WebhookDelivery {
  id: string;
  webhook_id: string;
  order_id: string;
  event: 'payment.created' | 'payment.pending' | 'payment.success' | 'payment.failed' | 'payment.expired';
  url: string;
  payload: Record<string, any>;
  signature: string;
  response_code: number;
  response_body: string;
  duration_ms: number;
  attempts: number;
  status: 'delivered' | 'failed' | 'retrying';
  created_at: string;
}

export interface ApiLog {
  id: string;
  merchant_id: string;
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  status_code: number;
  ip_address: string;
  duration_ms: number;
  request_body_redacted: string;
  response_body_redacted: string;
  timestamp: string;
}

export interface ProviderCredential {
  id: string;
  provider_id: 'famgateway' | 'sandbox';
  name: string;
  api_key_masked: string;
  api_secret_masked: string;
  base_url: string;
  status: 'connected' | 'not_configured' | 'testing' | 'connection_failed' | 'disabled';
  last_tested_at?: string;
  last_success_at?: string;
  error_message?: string;
  is_active: boolean;
}

export interface SupportTicket {
  id: string;
  ticket_no: string;
  merchant_id: string;
  subject: string;
  category: 'api' | 'settlement' | 'verification' | 'billing' | 'general';
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  created_at: string;
  messages: {
    sender: 'merchant' | 'support' | 'system';
    text: string;
    timestamp: string;
  }[];
}

export interface SecurityLog {
  id: string;
  actor: string;
  action: string;
  ip_address: string;
  level: 'info' | 'warning' | 'critical';
  details: string;
  timestamp: string;
}

export interface SystemSettings {
  brand_name: string;
  tagline: string;
  maintenance_mode: boolean;
  default_expiry_minutes: number;
  platform_fee_percent: number;
  support_email: string;
  smtp_host: string;
  smtp_port: number;
  smtp_user: string;
  smtp_configured: boolean;
  enforce_utr_validation: boolean;
  webhook_retry_limit: number;
}

export interface GmailImapConfig {
  merchant_id: string;
  fampay_upi_id: string; // MUST end with @fam or @yesfam
  gmail_address: string;
  app_password_masked: string; // 16-character Google App Password
  imap_host: string;
  imap_port: number;
  ssl: boolean;
  status: 'connected' | 'not_configured' | 'testing' | 'auth_failed' | 'listening';
  last_sync_at?: string;
  last_email_detected?: string;
  auto_poll_interval_sec: number;
  total_emails_parsed: number;
  is_active: boolean;
}

export interface FamPayAlertEmail {
  id: string;
  order_id?: string;
  utr: string;
  amount: number;
  payer_name: string;
  payer_vpa: string;
  subject: string;
  sender: string;
  received_at: string;
  status: 'matched' | 'unmatched' | 'duplicate_rejected';
  raw_body_snippet: string;
}
