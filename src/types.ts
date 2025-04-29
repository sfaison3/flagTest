/**
 * Configuration options for PostHog client
 */
export interface PostHogConfig {
  /** PostHog API host URL */
  apiHost?: string;

  /** Project API key from PostHog */
  apiKey?: string;

  /** Whether to flush events immediately */
  flushAt?: number;

  /** Maximum queue size */
  flushInterval?: number;

  /** Personal API key for non-public projects */
  personalApiKey?: string;
}

/**
 * User properties for identification and tracking
 */
export interface UserProperties {
  /** Unique identifier for the user */
  distinctId: string;

  /** Optional user information */
  email?: string;
  name?: string;

  /** Any additional custom properties */
  [key: string]: any;
}

/**
 * Event data structure
 */
export interface EventData {
  /** Name of the event */
  name: string;

  /** Properties associated with the event */
  properties?: Record<string, any>;
}
