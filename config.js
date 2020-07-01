require('dotenv').config();

const {
  YOUTUBE_USER_ID,
  YOUTUBE_CHANNEL_ID,
  YOUTUBE_KEY,

  TWITCH_USERNAME,
  TWITCH_USERID,
  TWITCH_CLIENTID,
  TWITCH_ACCESSTOKEN,

  TWITTER_USERNAME,
  TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET,
  TWITTER_ACCESS_TOKEN_KEY,
  TWITTER_ACCESS_TOKEN_SECRET,

  SPOTIFY_USERNAME,
  SPOTIFY_CLIENTID,
  SPOTIFY_CLIENTSECRET,
  SPOTIFY_ACCESS_TOKEN,
  SPOTIFY_REFRESH_TOKEN,

  GOODREADS_USER_ID,
  GOODREADS_USER_NAME,
  GOODREADS_KEY,
  GOODREADS_SECRET,
} = process.env;

module.exports = {
  siteTitle: "lmorchard.com - about me",
  buildPath: "./build",
  fetch: {
    Colophon: {},
    RecentNotes: {
      component: "Note",
      baseUrl: "https://notes.lmorchard.com/",
      url: "https://notes.lmorchard.com/RecentChanges.html",
    },
    TodaysNote: {
      component: "Note",
      baseUrl: "https://notes.lmorchard.com/",
      url: "https://notes.lmorchard.com/today.html",
    },
    Blog: {
      siteTitle: "blog.lmorchard.com",
      baseURL: "https://blog.lmorchard.com",
      indexURL: "https://blog.lmorchard.com/index.json",
    },
    Glitch: {
      login: "lmorchard",
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
    Twitch: {
      username: TWITCH_USERNAME,
      userId: TWITCH_USERID,
      clientId: TWITCH_CLIENTID,
      accessToken: TWITCH_ACCESSTOKEN,
    },
    Twitter: {
      username: TWITTER_USERNAME,
      consumer_key: TWITTER_CONSUMER_KEY,
      consumer_secret: TWITTER_CONSUMER_SECRET,
      access_token_key: TWITTER_ACCESS_TOKEN_KEY,
      access_token_secret: TWITTER_ACCESS_TOKEN_SECRET,
    },
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
    Goodreads: {
      user_id: GOODREADS_USER_ID,
      user_name: GOODREADS_USER_NAME,
      key: GOODREADS_KEY,
      secret: GOODREADS_SECRET,
    },
    */
    Toots: {
      component: "ActivityPub",
      username: "lmorchard",
      baseUrl: "https://toot.cafe",
      profileUrl: "https://toot.cafe/@lmorchard",
      outboxUrl: "https://toot.cafe/users/lmorchard/outbox?page=true",
    },
    Typing: {
      component: "Feed",
      title: "Typing (typing.lmorchard.com)",
      feedUrls: ["https://typing.lmorchard.com/feed/index.xml"],
    },
    Pinboard: {
      component: "Feed",
      title: "Pinboard (u:deusx)",
      link: "https://pinboard.in/u:deusx",
      feedUrls: ["https://feeds.pinboard.in/rss/u:deusx/"],
    },
  },
};
