import { z } from 'zod';

// Environment variable schema
const envSchema = z.object({
  // YouTube configuration
  YOUTUBE_USER_ID: z.string().optional(),
  YOUTUBE_CHANNEL_ID: z.string().optional(),
  YOUTUBE_KEY: z.string().optional(),

  // ActivityPub configuration (not currently used but defined in config)
  ACTIVITYPUB_USERNAME: z.string().optional(),
  ACTIVITYPUB_BASE_URL: z.string().url().optional().or(z.literal('')),
  ACTIVITYPUB_PROFILE_URL: z.string().url().optional().or(z.literal('')),
  ACTIVITYPUB_OUTBOX_URL: z.string().url().optional().or(z.literal('')),

  // GitHub configuration
  GH_API_TOKEN: z.string().optional(),

  // PocketCasts configuration
  POCKETCASTS_EMAIL: z.string().email().optional().or(z.literal('')),
  POCKETCASTS_PASSWORD: z.string().optional(),

  // Spotify configuration
  SPOTIFY_USERNAME: z.string().optional(),
  SPOTIFY_CLIENTID: z.string().optional(),
  SPOTIFY_CLIENTSECRET: z.string().optional(),
  SPOTIFY_ACCESS_TOKEN: z.string().optional(),
  SPOTIFY_REFRESH_TOKEN: z.string().optional(),
});

/**
 * Validate environment variables
 * @param {object} env - Environment variables object (defaults to process.env)
 * @returns {object} Validated environment variables
 * @throws {Error} If validation fails with helpful error messages
 */
function validateEnv(env = process.env) {
  const result = envSchema.safeParse(env);

  if (!result.success) {
    const errors = result.error?.errors || [];
    const messages = errors.map((err) => {
      const path = err.path ? err.path.join('.') : 'unknown';
      return `  - ${path}: ${err.message}`;
    });

    throw new Error(
      `Environment variable validation failed:\n${messages.join('\n')}`
    );
  }

  return result.data;
}

/**
 * Validate and report env var issues without throwing
 * Useful for optional features
 */
function checkEnv(env = process.env) {
  const result = envSchema.safeParse(env);

  if (!result.success) {
    const errors = result.error?.errors || [];
    if (errors.length > 0) {
      console.warn('⚠️  Environment variable validation warnings:');
      errors.forEach((err) => {
        const path = err.path ? err.path.join('.') : 'unknown';
        console.warn(`  - ${path}: ${err.message}`);
      });
    }
  }

  return result.success;
}

export { validateEnv, checkEnv, envSchema };
