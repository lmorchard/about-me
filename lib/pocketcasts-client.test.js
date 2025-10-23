import { describe, it, expect, beforeEach } from 'vitest';
import PocketCastsClient from './pocketcasts-client.js';

describe('PocketCastsClient', () => {
  let client;

  beforeEach(() => {
    client = new PocketCastsClient('test@example.com', 'password123');
  });

  describe('constructor', () => {
    it('should initialize with email and password', () => {
      expect(client.email).toBe('test@example.com');
      expect(client.password).toBe('password123');
      expect(client.token).toBeNull();
    });
  });

  describe('post method', () => {
    it('should throw error if not authenticated', async () => {
      await expect(client.post('user/history')).rejects.toThrow(
        'Not authenticated'
      );
    });

    it('should require login before making requests', async () => {
      expect(client.token).toBeNull();
      await expect(client.getHistory()).rejects.toThrow('Not authenticated');
    });
  });

  describe('API structure', () => {
    it('should have getHistory method', () => {
      expect(typeof client.getHistory).toBe('function');
    });

    it('should have login method', () => {
      expect(typeof client.login).toBe('function');
    });

    it('should have post method', () => {
      expect(typeof client.post).toBe('function');
    });
  });
});
