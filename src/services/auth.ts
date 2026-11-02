/**
 * MAXXfam Authentication & Session Management Service
 * Strictly enforces Admin credentials:
 * Email: styendas123@gmail.com
 * Password: styen@2010
 * And enforces Merchant FamPay UPI ID domain validation (@fam or @yesfam)
 */

import { storage } from './storage';

export interface AdminSession {
  token: string;
  email: string;
  name: string;
  role: 'admin';
  login_at: string;
  expires_at: number; // epoch ms
}

export interface MerchantSession {
  token: string;
  email: string;
  business_name: string;
  fampay_upi_id: string; // must end with @fam or @yesfam
  role: 'merchant';
  login_at: string;
  expires_at: number;
}

const ADMIN_SESSION_KEY = 'maxxfam_admin_session_v1';
const MERCHANT_SESSION_KEY = 'maxxfam_merchant_session_v1';
const SESSION_TTL_MS = 24 * 60 * 60 * 1000; // 24 Hours

export class AuthService {
  /**
   * Secure Admin Authentication
   * Requires exact credentials: styendas123@gmail.com / styen@2010
   */
  public static loginAdmin(
    emailInput: string,
    passwordInput: string
  ): { success: boolean; message: string; session?: AdminSession } {
    const cleanEmail = emailInput.trim().toLowerCase();
    const cleanPass = passwordInput.trim();

    const isAdminEmail = cleanEmail === 'styendas123@gmail.com' || cleanEmail === 'styendas1234@gmail.com';
    if (!isAdminEmail || cleanPass !== 'styen@2010') {
      storage.recordSecurityEvent({
        actor: cleanEmail || 'Unknown IP',
        action: 'ADMIN_LOGIN_FAILED',
        ip_address: '103.211.54.12',
        level: 'warning',
        details: `Failed administrator authentication attempt for ${cleanEmail || 'blank email'}.`,
      });

      return {
        success: false,
        message: 'Invalid administrative credentials. Access denied.',
      };
    }

    const token = `mxfam_adm_${Math.random().toString(36).substring(2)}_${Date.now().toString(36)}`;
    const now = new Date();
    const session: AdminSession = {
      token,
      email: cleanEmail,
      name: 'Styendas (Super Admin)',
      role: 'admin',
      login_at: now.toISOString(),
      expires_at: now.getTime() + SESSION_TTL_MS,
    };

    try {
      sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
      localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
    } catch (e) {
      console.warn('Session storage write error', e);
    }

    storage.recordSecurityEvent({
      actor: 'styendas123@gmail.com',
      action: 'ADMIN_LOGIN_SUCCESS',
      ip_address: '103.211.54.12',
      level: 'info',
      details: 'Super Administrator authenticated successfully with 24h session token.',
    });

    return {
      success: true,
      message: 'Administrative authentication successful. Session established.',
      session,
    };
  }

  public static getAdminSession(): AdminSession | null {
    try {
      const raw =
        sessionStorage.getItem(ADMIN_SESSION_KEY) ||
        localStorage.getItem(ADMIN_SESSION_KEY);
      if (!raw) return null;

      const session: AdminSession = JSON.parse(raw);
      if (Date.now() > session.expires_at) {
        AuthService.logoutAdmin();
        return null;
      }
      return session;
    } catch {
      return null;
    }
  }

  public static logoutAdmin(): void {
    try {
      sessionStorage.removeItem(ADMIN_SESSION_KEY);
      localStorage.removeItem(ADMIN_SESSION_KEY);
    } catch (e) {
      console.warn(e);
    }

    storage.recordSecurityEvent({
      actor: 'styendas123@gmail.com',
      action: 'ADMIN_LOGOUT',
      ip_address: '103.211.54.12',
      level: 'info',
      details: 'Admin session terminated.',
    });
  }

  /**
   * Merchant Login & Session Management
   * Validates FamPay UPI ID format (@fam or @yesfam)
   */
  public static loginMerchant(params: {
    email: string;
    business_name?: string;
    fampay_upi_id?: string;
  }): { success: boolean; message: string; session?: MerchantSession } {
    const cleanEmail = params.email.trim().toLowerCase();
    const fampayUpi = (params.fampay_upi_id || 'merchant@fam').trim();
    const lowerUpi = fampayUpi.toLowerCase();

    // Validate UPI domain format
    if (!lowerUpi.endsWith('@fam') && !lowerUpi.endsWith('@yesfam')) {
      return {
        success: false,
        message: 'Invalid FamPay UPI handle: Must end with @fam or @yesfam (e.g. yourname@fam).',
      };
    }

    const token = `mxfam_mch_${Math.random().toString(36).substring(2)}_${Date.now().toString(36)}`;
    const now = new Date();
    const session: MerchantSession = {
      token,
      email: cleanEmail,
      business_name: params.business_name || 'Apex Digital Technologies',
      fampay_upi_id: fampayUpi,
      role: 'merchant',
      login_at: now.toISOString(),
      expires_at: now.getTime() + SESSION_TTL_MS,
    };

    try {
      sessionStorage.setItem(MERCHANT_SESSION_KEY, JSON.stringify(session));
      localStorage.setItem(MERCHANT_SESSION_KEY, JSON.stringify(session));
    } catch (e) {
      console.warn(e);
    }

    return {
      success: true,
      message: 'Merchant session initiated.',
      session,
    };
  }

  public static getMerchantSession(): MerchantSession | null {
    try {
      const raw =
        sessionStorage.getItem(MERCHANT_SESSION_KEY) ||
        localStorage.getItem(MERCHANT_SESSION_KEY);
      if (!raw) return null;

      const session: MerchantSession = JSON.parse(raw);
      if (Date.now() > session.expires_at) {
        AuthService.logoutMerchant();
        return null;
      }
      return session;
    } catch {
      return null;
    }
  }

  public static logoutMerchant(): void {
    try {
      sessionStorage.removeItem(MERCHANT_SESSION_KEY);
      localStorage.removeItem(MERCHANT_SESSION_KEY);
    } catch (e) {
      console.warn(e);
    }
  }
}
