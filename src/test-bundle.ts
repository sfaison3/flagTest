import { POSTHOG_API_KEY, POSTHOG_HOST } from "./flag";
import PostHogClientService from "./posthogClientService";

// Create and initialize a client instance for testing
const posthogTest = new PostHogClientService();
posthogTest.init(POSTHOG_API_KEY, {
  apiHost: POSTHOG_HOST,
});

// Expose the instance to the window for testing
declare global {
  interface Window {
    posthogTest: PostHogClientService;
  }
}

window.posthogTest = posthogTest;

// Log that the test bundle was loaded
console.log("PostHog test bundle initialized");