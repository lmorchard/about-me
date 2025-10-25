/**
 * Custom Pocket Casts API client using native fetch
 * Replaces the deprecated pocketcasts npm package
 *
 * Based on analysis of pocketcasts@1.0.1 package source
 */

const API_URL = 'https://api.pocketcasts.com';

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
    const response = await fetch(`${API_URL}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.email,
        password: this.password,
        scope: 'webplayer',
      }),
    });

    if (!response.ok) {
      throw new Error(
        `Login failed: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    this.token = data.token;
    return data;
  }

  /**
   * Make an authenticated POST request to the Pocket Casts API
   */
  async post(path, json = {}) {
    if (!this.token) {
      throw new Error('Not authenticated. Call login() first.');
    }

    const response = await fetch(`${API_URL}/${path}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(json),
    });

    if (!response.ok) {
      throw new Error(
        `API request failed: ${response.status} ${response.statusText}`
      );
    }

    return response.json();
  }

  /**
   * Get user's listening history
   */
  async getHistory() {
    return this.post('user/history');
  }
}

export default PocketCastsClient;
