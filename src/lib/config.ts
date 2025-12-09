/**
 * @file config.ts
 * @description Centralized configuration for the application.
 * All environment-aware settings should be accessed through this file.
 * 
 * @usage
 * import { config } from '@/lib/config';
 * console.log(config.app.name);
 */

export const config = {
  /**
   * Application metadata
   */
  app: {
    name: 'The Builder Economy',
    tagline: 'Conversations to inspire a new era where everyone builds with AI.',
    url: 'https://thebuildereconomy.com',
    adminEmail: 'krish@themindmaker.ai',
  },

  /**
   * External links
   */
  links: {
    mindmaker: 'https://www.themindmaker.ai',
    spotify: null, // Coming soon
    twitter: null,
    linkedin: null,
  },

  /**
   * Feature flags
   */
  features: {
    spotifyEnabled: false,
    guestApplicationsEnabled: true,
    newsletterEnabled: true,
  },

  /**
   * API configuration
   */
  api: {
    supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
    supabaseKey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
  },

  /**
   * UI configuration
   */
  ui: {
    headerScrollThreshold: 50,
    animationDurations: {
      fast: 0.15,
      normal: 0.3,
      slow: 0.8,
    },
    toastDuration: 5000,
  },

  /**
   * Email configuration
   */
  email: {
    fromAddress: 'The Builder Economy <onboarding@resend.dev>',
    senderName: 'Krish Raja',
  },
} as const;

export type Config = typeof config;

export default config;
