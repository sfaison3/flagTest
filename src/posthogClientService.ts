import posthog from "posthog-js";
import { POSTHOG_API_KEY, POSTHOG_HOST } from "./flag";
import { EventData, PostHogConfig, UserProperties } from "./types";

/**
 * PostHog service for client-side (browser) analytics and feature flag management
 */
class PostHogClientService {
  /**
   * Initialize the PostHog client
   */
  public init(
    apiKey: string = POSTHOG_API_KEY,
    options: PostHogConfig = {},
  ): void {
    posthog.init(apiKey, {
      api_host: options.apiHost || POSTHOG_HOST,
      loaded: (posthog) => {
        if (process.env.NODE_ENV === "development") {
          // Log when PostHog is loaded in development
          console.log("PostHog loaded:", posthog);
        }
      },
    });
  }

  /**
   * Identify a user
   */
  public identify(
    distinctId: string,
    userProperties?: Omit<UserProperties, "distinctId">,
  ): void {
    posthog.identify(distinctId, userProperties);
  }

  /**
   * Reset current user - useful for logout
   */
  public reset(): void {
    posthog.reset();
  }

  /**
   * Capture an event
   */
  public capture(eventData: EventData): void {
    posthog.capture(eventData.name, eventData.properties);
  }

  /**
   * Track page view
   */
  public pageView(url?: string): void {
    const pageUrl = url || window.location.href;
    this.capture({
      name: "$pageview",
      properties: {
        $current_url: pageUrl,
      },
    });
  }

  /**
   * Check if a feature flag is enabled
   */
  public isFeatureEnabled(key: string, defaultValue: boolean = false): boolean {
    try {
      return posthog.isFeatureEnabled(key) ?? defaultValue;
    } catch (error) {
      console.error(`Error checking feature flag ${key}:`, error);
      return defaultValue;
    }
  }

  /**
   * Get the value of a feature flag
   */
  public getFeatureFlag(key: string, defaultValue?: any): any {
    try {
      return posthog.getFeatureFlag(key, defaultValue);
    } catch (error) {
      console.error(`Error getting feature flag ${key}:`, error);
      return defaultValue;
    }
  }

  /**
   * Get all enabled feature flags
   */
  public getEnabledFeatureFlags(): string[] {
    try {
      return posthog.getActiveFlags();
    } catch (error) {
      console.error("Error getting enabled feature flags:", error);
      return [];
    }
  }

  /**
   * Register feature flag callback for when flags are loaded
   */
  public onFeatureFlags(callback: (flags: string[]) => void): void {
    posthog.onFeatureFlags(callback);
  }

  /**
   * Associate current user with a group
   */
  public group(
    groupType: string,
    groupKey: string,
    groupProperties?: Record<string, any>,
  ): void {
    posthog.group(groupType, groupKey, groupProperties);
  }
}

export default PostHogClientService;
