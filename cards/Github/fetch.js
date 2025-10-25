export default async function fetchData(config) {
  const {
    username,
    token,
    ignoreRepos = [],
    numPages = 3,
    perPage = 100,
  } = config;

  // Set up headers for authentication if token is available
  const headers = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const events = [];
  for (let idx = 1; idx <= numPages; idx++) {
    const apiUrl = `https://api.github.com/users/${username}/events/public?page=${idx}&per_page=${perPage}`;
    const resp = await fetch(apiUrl, { headers });

    if (!resp.ok) {
      console.error(`GitHub API error: ${resp.status} ${resp.statusText}`);
      // Check rate limit headers
      const rateLimitRemaining = resp.headers.get('x-ratelimit-remaining');
      const rateLimitReset = resp.headers.get('x-ratelimit-reset');
      if (rateLimitRemaining !== null) {
        console.error(`Rate limit remaining: ${rateLimitRemaining}`);
        if (rateLimitReset) {
          const resetDate = new Date(parseInt(rateLimitReset) * 1000);
          console.error(`Rate limit resets at: ${resetDate.toLocaleString()}`);
        }
      }
      break;
    }

    const data = await resp.json();
    if (Array.isArray(data)) {
      events.push(...data);
    } else {
      console.error(`GitHub API returned non-array data:`, data);
      break;
    }
  }

  // Filter events by ignored repos
  const filteredEvents = events.filter(
    (event) => !ignoreRepos.includes(event.repo.name)
  );

  // Fetch commit details for PushEvents
  for (const event of filteredEvents) {
    if (
      event.type === 'PushEvent' &&
      event.payload.before &&
      event.payload.head
    ) {
      try {
        const compareUrl = `https://api.github.com/repos/${event.repo.name}/compare/${event.payload.before}...${event.payload.head}`;
        const compareResp = await fetch(compareUrl, { headers });

        if (!compareResp.ok) {
          console.error(
            `Failed to fetch commits for event ${event.id}: ${compareResp.status} ${compareResp.statusText}`
          );
          continue;
        }

        const compareData = await compareResp.json();

        // Add commits array to the payload (limit to first 20 to match old API behavior)
        if (compareData.commits && Array.isArray(compareData.commits)) {
          event.payload.commits = compareData.commits.slice(0, 20);
        }
      } catch (error) {
        console.error(
          `Failed to fetch commits for event ${event.id}:`,
          error.message
        );
        // Continue without commits data
      }
    }
  }

  return {
    username,
    events: filteredEvents,
  };
};
