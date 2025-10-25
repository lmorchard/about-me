import dotenv from 'dotenv';
dotenv.config({ quiet: true });

// Validate environment variables on load
import { checkEnv } from './lib/env.js';
checkEnv();

const {
  YOUTUBE_USER_ID,
  YOUTUBE_CHANNEL_ID,
  YOUTUBE_KEY,

  ACTIVITYPUB_USERNAME,
  ACTIVITYPUB_BASE_URL,
  ACTIVITYPUB_PROFILE_URL,
  ACTIVITYPUB_OUTBOX_URL,

  GH_API_TOKEN,

  POCKETCASTS_EMAIL,
  POCKETCASTS_PASSWORD,

  SPOTIFY_USERNAME,
  SPOTIFY_CLIENTID,
  SPOTIFY_CLIENTSECRET,
  SPOTIFY_ACCESS_TOKEN,
  SPOTIFY_REFRESH_TOKEN,
} = process.env;

export default {
  siteTitle: 'lmorchard.com - about me',
  buildPath: './build',
  fetch: {
    Colophon: {},
    Blog: {
      siteTitle: 'blog.lmorchard.com',
      baseURL: 'https://blog.lmorchard.com',
      indexURL: 'https://blog.lmorchard.com/index.json',
    },
    Links: {
      component: 'Feed',
      title: 'Links',
      link: 'https://links.lmorchard.com/bookmarks/shared',
      feedUrls: ['https://links.lmorchard.com/feeds/shared'],
    },
    Fediverse: {
      component: 'Feed',
      title: '@lmorchard@masto.hackers.town',
      link: 'https://masto.hackers.town/@lmorchard',
      feedUrls: ['https://masto.hackers.town/@lmorchard.rss'],
    },
    Github: {
      username: 'lmorchard',
      token: GH_API_TOKEN,
      ignoreRepos: [
        'lmorchard/notes',
        'mozilla/FirefoxColor',
        'lmorchard/blog.lmorchard.com',
      ],
    },
    PocketCasts: {
      email: POCKETCASTS_EMAIL,
      password: POCKETCASTS_PASSWORD,
      // URL patterns for private/paid podcasts - remove URLs but keep episodes
      excludeUrlPatterns: [
        'supportingcast.fm',
        'patreon.com',
        'patreonusercontent.com',
      ],
    },
    YouTube: {
      username: YOUTUBE_USER_ID,
      channelId: YOUTUBE_CHANNEL_ID,
      key: YOUTUBE_KEY,
    },
    Spotify: {
      username: SPOTIFY_USERNAME,
      clientId: SPOTIFY_CLIENTID,
      clientSecret: SPOTIFY_CLIENTSECRET,
      access_token: SPOTIFY_ACCESS_TOKEN,
      refresh_token: SPOTIFY_REFRESH_TOKEN,
      token_type: 'Bearer',
      expires_in: 3600,
      scope: 'user-read-currently-playing user-read-recently-played',
    },
  },
};
