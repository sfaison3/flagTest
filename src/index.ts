import { POSTHOG_API_KEY, POSTHOG_HOST } from "./flag";
import PostHogClientService from "./posthogClientService";
import PostHogService from "./posthogService";
import type { EventData, PostHogConfig, UserProperties } from "./types";

// Export server-side instance (singleton)
export const posthogServer = new PostHogService(POSTHOG_API_KEY);

// Export client-side instance (singleton)
export const posthogClient = new PostHogClientService();

// Export classes for custom instances
export { PostHogClientService, PostHogService };

// Export types and constants
export {
  EventData,
  POSTHOG_API_KEY,
  POSTHOG_HOST,
  PostHogConfig,
  UserProperties,
};

// Default export for convenience
export default {
  server: posthogServer,
  client: posthogClient,
};
