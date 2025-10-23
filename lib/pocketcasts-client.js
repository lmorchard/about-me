/**
 * Custom Pocket Casts API client using native fetch
 * Replaces the deprecated pocketcasts npm package
 */

const BASE_URL = 'https://api.pocketcasts.com';
const WEB_PLAYER_URL = 'https://play.pocketcasts.com';

class PocketCastsClient {
  constructor(email, password) {
    this.email = email;
    this.password = password;
    this.token = null;
  }

  /**
   * Login to Pocket Casts and get authentication token
   */
  async login() {
    const response = await fetch(`${WEB_PLAYER_URL}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.email,
        password: this.password,
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Login failed: ${response.status} ${response.statusText}\nResponse: ${text.substring(0, 200)}`);
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      throw new Error(`Expected JSON response but got ${contentType}. Response: ${text.substring(0, 200)}`);
    }

    const data = await response.json();
    this.token = data.token;
    return data;
  }

  /**
   * Make an authenticated request to the Pocket Casts API
   */
  async makeRequest(endpoint, options = {}) {
    if (!this.token) {
      throw new Error('Not authenticated. Call login() first.');
    }

    const response = await fetch(`${WEB_PLAYER_URL}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get user's listening history
   */
  async getHistory() {
    return this.makeRequest('/user/history');
  }

  /**
   * Get user's podcast subscriptions
   */
  async getList() {
    return this.makeRequest('/user/podcast/list');
  }

  /**
   * Get new releases for subscribed podcasts
   */
  async getNewReleases() {
    return this.makeRequest('/user/new_releases');
  }

  /**
   * Get in-progress episodes
   */
  async getInProgress() {
    return this.makeRequest('/up_next/list');
  }

  /**
   * Get starred episodes
   */
  async getStarred() {
    return this.makeRequest('/user/starred');
  }

  /**
   * Get user stats
   */
  async getStats() {
    return this.makeRequest('/user/stats/summary');
  }
}

module.exports = PocketCastsClient;
