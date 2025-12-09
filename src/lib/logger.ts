/**
 * @file logger.ts
 * @description Structured logging utility for frontend application.
 * Provides consistent log format with levels, context, and timestamps.
 * 
 * @usage
 * import { logger } from '@/lib/logger';
 * logger.info('User action', { userId: '123', action: 'click' });
 * 
 * @levels debug | info | warn | error | critical
 */

export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'critical';

export interface LogEntry {
  level: LogLevel;
  message: string;
  context?: Record<string, unknown>;
  timestamp: string;
  sessionId?: string;
}

// Session ID for tracing (generated once per page load)
const sessionId = crypto.randomUUID?.() || `session-${Date.now()}`;

// Log level priority for filtering
const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
  critical: 4,
};

// Minimum log level (can be configured via env or localStorage)
const getMinLevel = (): LogLevel => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('LOG_LEVEL');
    if (stored && stored in LOG_LEVELS) return stored as LogLevel;
  }
  return import.meta.env.DEV ? 'debug' : 'info';
};

/**
 * Creates a structured log entry
 */
const createLogEntry = (
  level: LogLevel,
  message: string,
  context?: Record<string, unknown>
): LogEntry => ({
  level,
  message,
  context,
  timestamp: new Date().toISOString(),
  sessionId,
});

/**
 * Outputs log to console with appropriate styling
 */
const outputLog = (entry: LogEntry): void => {
  const minLevel = getMinLevel();
  if (LOG_LEVELS[entry.level] < LOG_LEVELS[minLevel]) return;

  const styles: Record<LogLevel, string> = {
    debug: 'color: #888',
    info: 'color: #3b82f6',
    warn: 'color: #f59e0b',
    error: 'color: #ef4444',
    critical: 'color: #dc2626; font-weight: bold',
  };

  const prefix = `[${entry.level.toUpperCase()}] ${entry.timestamp}`;
  
  if (entry.context) {
    console.groupCollapsed(`%c${prefix} ${entry.message}`, styles[entry.level]);
    console.log('Context:', entry.context);
    console.log('Session:', entry.sessionId);
    console.groupEnd();
  } else {
    console.log(`%c${prefix} ${entry.message}`, styles[entry.level]);
  }
};

/**
 * Main logger object with methods for each log level
 */
export const logger = {
  /**
   * Debug level - development information
   */
  debug: (message: string, context?: Record<string, unknown>): void => {
    outputLog(createLogEntry('debug', message, context));
  },

  /**
   * Info level - general information
   */
  info: (message: string, context?: Record<string, unknown>): void => {
    outputLog(createLogEntry('info', message, context));
  },

  /**
   * Warn level - potential issues
   */
  warn: (message: string, context?: Record<string, unknown>): void => {
    outputLog(createLogEntry('warn', message, context));
  },

  /**
   * Error level - errors that don't crash the app
   */
  error: (message: string, context?: Record<string, unknown>): void => {
    outputLog(createLogEntry('error', message, context));
  },

  /**
   * Critical level - severe errors
   */
  critical: (message: string, context?: Record<string, unknown>): void => {
    outputLog(createLogEntry('critical', message, context));
  },

  /**
   * Get current session ID for tracing
   */
  getSessionId: (): string => sessionId,

  /**
   * Set minimum log level at runtime
   */
  setLevel: (level: LogLevel): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('LOG_LEVEL', level);
    }
  },
};

export default logger;
