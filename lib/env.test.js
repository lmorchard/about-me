import { describe, it, expect } from 'vitest';
import { validateEnv, checkEnv, envSchema } from './env.js';

describe('env validation', () => {
  describe('envSchema', () => {
    it('should accept valid environment variables', () => {
      const validEnv = {
        YOUTUBE_KEY: 'abc123',
        GH_API_TOKEN: 'ghp_token',
        POCKETCASTS_EMAIL: 'user@example.com',
        SPOTIFY_USERNAME: 'testuser',
      };

      const result = envSchema.safeParse(validEnv);
      expect(result.success).toBe(true);
    });

    it('should reject invalid email for POCKETCASTS_EMAIL', () => {
      const invalidEnv = {
        POCKETCASTS_EMAIL: 'not-an-email',
      };

      const result = envSchema.safeParse(invalidEnv);
      expect(result.success).toBe(false);
    });

    it('should reject invalid URL for ACTIVITYPUB_BASE_URL', () => {
      const invalidEnv = {
        ACTIVITYPUB_BASE_URL: 'not-a-url',
      };

      const result = envSchema.safeParse(invalidEnv);
      expect(result.success).toBe(false);
    });

    it('should accept empty strings for optional fields', () => {
      const envWithEmpty = {
        POCKETCASTS_EMAIL: '',
        ACTIVITYPUB_BASE_URL: '',
      };

      const result = envSchema.safeParse(envWithEmpty);
      expect(result.success).toBe(true);
    });

    it('should accept missing optional fields', () => {
      const minimalEnv = {};

      const result = envSchema.safeParse(minimalEnv);
      expect(result.success).toBe(true);
    });
  });

  describe('validateEnv', () => {
    it('should return validated env for valid input', () => {
      const validEnv = {
        YOUTUBE_KEY: 'abc123',
        POCKETCASTS_EMAIL: 'user@example.com',
      };

      const result = validateEnv(validEnv);
      expect(result).toEqual(validEnv);
    });

    it('should throw error for invalid input', () => {
      const invalidEnv = {
        POCKETCASTS_EMAIL: 'not-an-email',
      };

      expect(() => validateEnv(invalidEnv)).toThrow(
        'Environment variable validation failed'
      );
    });
  });

  describe('checkEnv', () => {
    it('should return true for valid env', () => {
      const validEnv = {
        YOUTUBE_KEY: 'abc123',
      };

      const result = checkEnv(validEnv);
      expect(result).toBe(true);
    });

    it('should return false for invalid env', () => {
      const invalidEnv = {
        POCKETCASTS_EMAIL: 'not-an-email',
      };

      const result = checkEnv(invalidEnv);
      expect(result).toBe(false);
    });
  });
});
