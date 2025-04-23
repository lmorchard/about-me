require('dotenv').config();

const {
  YOUTUBE_USER_ID,
  YOUTUBE_CHANNEL_ID,
  YOUTUBE_KEY,

  ACTIVITYPUB_USERNAME,
  ACTIVITYPUB_BASE_URL,
  ACTIVITYPUB_PROFILE_URL,
  ACTIVITYPUB_OUTBOX_URL,

  SPOTIFY_USERNAME,
  SPOTIFY_CLIENTID,
  SPOTIFY_CLIENTSECRET,
  SPOTIFY_ACCESS_TOKEN,
  SPOTIFY_REFRESH_TOKEN,
} = process.env;

module.exports = {
  siteTitle: "lmorchard.com - about me",
  buildPath: "./build",
  fetch: {
    Colophon: {},
    Blog: {
      siteTitle: "blog.lmorchard.com",
      baseURL: "https://blog.lmorchard.com",
      indexURL: "https://blog.lmorchard.com/index.json",
    },
    Github: {
      username: "lmorchard",
      ignoreRepos: [
        "lmorchard/notes",
        "mozilla/FirefoxColor",
      ]
    },
    YouTube: {
      username: YOUTUBE_USER_ID,
      channelId: YOUTUBE_CHANNEL_ID,
      key: YOUTUBE_KEY,
    },
    /*
    ActivityPub: {
      username: ACTIVITYPUB_USERNAME,
      baseUrl: ACTIVITYPUB_BASE_URL,
      profileUrl: ACTIVITYPUB_PROFILE_URL,
      outboxUrl: ACTIVITYPUB_OUTBOX_URL,
    },
    */
    Spotify: {
      username: SPOTIFY_USERNAME,
      clientId: SPOTIFY_CLIENTID,
      clientSecret: SPOTIFY_CLIENTSECRET,
      access_token: SPOTIFY_ACCESS_TOKEN,
      refresh_token: SPOTIFY_REFRESH_TOKEN,
      token_type: "Bearer",
      expires_in: 3600,
      scope: "user-read-currently-playing user-read-recently-played",
    },
    /*
    Pebbling: {
      component: "Feed",
      title: "Pebbling Club (u/lmorchard)",
      link: "https://pebbl.ing/u/lmorchard/",
      feedUrls: ["https://pebbl.ing/u/lmorchard/feed.atom"],
    },
    */
    Pinboard: {
      component: "Feed",
      title: "Pinboard (u:deusx)",
      link: "https://pinboard.in/u:deusx",
      feedUrls: ["https://feeds.pinboard.in/rss/u:deusx/"],
    },
  },
};
