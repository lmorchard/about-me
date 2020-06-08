const Twitter = require('twitter');

module.exports = function fetchData(config) {
  const { username } = config;
  const client = new Twitter(config);
  return new Promise((resolve, reject) => {
    client.get(
      'statuses/user_timeline',
      { screen_name: username },
      (error, statuses, response) =>
        error ? reject(error) : resolve({ username, statuses })
    );
  });
}
