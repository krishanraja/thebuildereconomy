/**
 * @file types/index.ts
 * @description Centralized type definitions for the application.
 * Import types from this file rather than defining inline.
 * 
 * @usage
 * import type { Subscriber, GuestApplication } from '@/types';
 */

// ============================================
// Database Types (mirrors Supabase schema)
// ============================================

/**
 * Newsletter subscriber
 */
export interface Subscriber {
  id: string;
  email: string;
  created_at: string | null;
}

/**
 * Guest application form data
 */
export interface GuestApplication {
  id?: string;
  full_name: string;
  email: string;
  title_company?: string | null;
  topic_pitch?: string | null;
  social_link?: string | null;
  approved?: boolean | null;
  created_at?: string | null;
}

/**
 * Podcast episode
 */
export interface Episode {
  id: string;
  title: string;
  subtitle?: string | null;
  description?: string | null;
  episode_url: string;
  cover_image_url?: string | null;
  guest_name?: string | null;
  guest_title?: string | null;
  is_published?: boolean | null;
  published_at?: string | null;
}

/**
 * Featured guest profile
 */
export interface Guest {
  id: string;
  name: string;
  title?: string | null;
  photo_url?: string | null;
  quote?: string | null;
  episode_id?: string | null;
  approved?: boolean | null;
}

/**
 * User testimonial
 */
export interface Testimonial {
  id: string;
  author: string;
  role?: string | null;
  quote: string;
  featured?: boolean | null;
  created_at?: string | null;
}

// ============================================
// API Response Types
// ============================================

/**
 * Standard API response shape
 * All async operations should return this shape
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  fallbackUsed?: boolean;
}

/**
 * Email send response from edge functions
 */
export interface EmailResponse {
  id?: string;
  from?: string;
  to?: string[];
  created_at?: string;
}

/**
 * Guest application notification response
 */
export interface NotifyGuestApplicationResponse {
  success: boolean;
  adminEmail?: EmailResponse;
  autoReply?: EmailResponse;
  error?: string;
}

/**
 * Welcome email response
 */
export interface SendWelcomeEmailResponse {
  success: boolean;
  emailResponse?: EmailResponse;
  error?: string;
}

// ============================================
// Component Props Types
// ============================================

/**
 * Modal component props
 */
export interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * Hero component props
 */
export interface HeroProps {
  onApplyClick: () => void;
}

// ============================================
// Form Types
// ============================================

/**
 * Guest application form state
 */
export interface GuestApplicationFormData {
  full_name: string;
  email: string;
  title_company: string;
  topic_pitch: string;
  social_link: string;
}

/**
 * Subscribe form state
 */
export interface SubscribeFormData {
  email: string;
}

// ============================================
// Utility Types
// ============================================

/**
 * Make all properties of T optional except for keys in K
 */
export type PartialExcept<T, K extends keyof T> = Partial<Omit<T, K>> & Pick<T, K>;

/**
 * Extract non-nullable version of T
 */
export type NonNullable<T> = T extends null | undefined ? never : T;
