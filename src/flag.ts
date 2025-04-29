/**
 * PostHog API configuration
 */
export const POSTHOG_API_KEY = "phc_YourPostHogAPIKeyHere"; // Replace with your actual PostHog API key
export const POSTHOG_HOST = "https://us.i.posthog.com"; // Or your PostHog instance URL

// Initialize PostHog client
import posthog from 'posthog-js';

// Export PostHog instance (only used in-file, not meant to be imported elsewhere)
const posthogInstance = posthog.init('',
    {
        api_host: 'https://us.i.posthog.com',
        person_profiles: 'identified_only' // or 'always' to create profiles for anonymous users as well
    }
);
