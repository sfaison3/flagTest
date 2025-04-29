import PostHog from "posthog-node";
import { POSTHOG_API_KEY, POSTHOG_HOST } from "./flag";
import { PostHogConfig } from "./types";

/**
 * PostHog service for server-side analytics and feature flag management
 */
class PostHogService {
  private client: PostHog;

  constructor(apiKey: string = POSTHOG_API_KEY, options: PostHogConfig = {}) {
    this.client = new PostHog(apiKey, {
      host: options.apiHost || POSTHOG_HOST,
      ...options,
    });
  }

  /**
   * Capture an event for a user
   */
  public captureEvent(
    distinctId: string,
    eventName: string,
    properties?: Record<string, any>,
  ): void {
    this.client.capture({
      distinctId,
      event: eventName,
      properties,
    });
  }

  /**
   * Identify a user with properties
   */
  public identifyUser(
    distinctId: string,
    properties?: Record<string, any>,
  ): void {
    this.client.identify({
      distinctId,
      properties,
    });
  }

  /**
   * Check if a feature flag is enabled for a user
   */
  public async isFeatureEnabled(
    key: string,
    distinctId: string,
    defaultValue: boolean = false,
  ): Promise<boolean> {
    try {
      return await this.client.isFeatureEnabled(key, distinctId, {
        sendEvent: true,
      });
    } catch (error) {
      console.error(`Error checking feature flag ${key}:`, error);
      return defaultValue;
    }
  }

  /**
   * Get all feature flags for a user
   */
  public async getAllFeatureFlags(
    distinctId: string,
  ): Promise<Record<string, boolean>> {
    try {
      return await this.client.getAllFlags(distinctId);
    } catch (error) {
      console.error("Error getting all feature flags:", error);
      return {};
    }
  }

  /**
   * Get feature flag value with payload
   */
  public async getFeatureFlagPayload(
    key: string,
    distinctId: string,
  ): Promise<any | null> {
    try {
      return await this.client.getFeatureFlagPayload(key, distinctId);
    } catch (error) {
      console.error(`Error getting feature flag payload for ${key}:`, error);
      return null;
    }
  }

  /**
   * Track a page view
   */
  public pageView(
    distinctId: string,
    url: string,
    properties?: Record<string, any>,
  ): void {
    this.captureEvent(distinctId, "$pageview", {
      $current_url: url,
      ...properties,
    });
  }

  /**
   * Group users
   */
  public groupIdentify(
    groupType: string,
    groupKey: string,
    properties?: Record<string, any>,
  ): void {
    this.client.groupIdentify({
      groupType,
      groupKey,
      properties,
    });
  }

  /**
   * Shut down the client (important for cleanup)
   */
  public shutdown(): Promise<void> {
    return this.client.shutdown();
  }
}

export default PostHogService;
