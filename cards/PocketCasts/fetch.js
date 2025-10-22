const PocketCasts = require('pocketcasts');

module.exports = async function fetchData(config) {
  const { email, password, excludeUrlPatterns = [] } = config;

  if (!email || !password) {
    console.error('PocketCasts: email and password are required');
    return { email, episodes: [] };
  }

  // Helper function to check if URL should be excluded
  const shouldExcludeUrl = (url) => {
    if (!url) return false;
    return excludeUrlPatterns.some(pattern => url.includes(pattern));
  };

  try {
    const pocketcasts = new PocketCasts(email, password);

    // Login to Pocket Casts
    await pocketcasts.login();

    // Get listening history
    const history = await pocketcasts.getHistory();

    // Extract episodes array from the response
    let episodesArray = [];
    if (Array.isArray(history)) {
      episodesArray = history;
    } else if (history && Array.isArray(history.episodes)) {
      episodesArray = history.episodes;
    } else if (history && Array.isArray(history.items)) {
      episodesArray = history.items;
    }

    // Transform the data to a format we can use
    const episodes = episodesArray.map(item => {
      const episodeUrl = item.url || null;
      const filteredUrl = shouldExcludeUrl(episodeUrl) ? null : episodeUrl;

      return {
        podcast: {
          title: item.podcastTitle || 'Unknown Podcast',
          url: `https://pocketcasts.com/podcast/${item.podcastUuid}`,
          // Construct thumbnail URL using podcastUuid (common pattern for Pocket Casts)
          thumbnail: item.podcastUuid
            ? `https://static.pocketcasts.com/discover/images/400/${item.podcastUuid}.jpg`
            : null,
        },
        episode: {
          title: item.title || 'Unknown Episode',
          url: filteredUrl,
        },
        // Use published date as the timestamp
        lastPlayedAt: item.published || null,
        playedUpTo: item.playedUpTo || 0,
      };
    });

    return {
      email,
      episodes,
    };
  } catch (error) {
    console.error('PocketCasts fetch failed:', error.message);
    return {
      email,
      episodes: [],
      error: error.message,
    };
  }
};
