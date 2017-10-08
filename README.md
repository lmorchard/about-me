# About Me

This is an experiment at building an About Me page for lmorchard.com as an
old-school Web 2.0 mashup using my own personal data exhaust.

## Highlights:

* Local dev server with hot module reloading for both components and initial
  state data

* Production static site build with only selective live components on the
  client to minimize bundle size

* Simple modular data fetching tool

* Publish to S3 or somewhere similar

## TODO

- [ ] RSS / Atom component

- [ ] Flickr photos component

- [ ] Scheduled Amazon Lambda updates, publish to S3 bucket

- [ ] Script / document how to fill out `config.js` and get all the auth tokens & such

- [ ] Make more generic, i.e. so components can be pulled from a customizable
  directory of Jekyll-style front-matter-and-markdown

- [ ] Further simplify & normalize data fetched from APIs to minimize `data.json` size

- [ ] Include `data.json` in published site

- [ ] Client-side updates from a few services? Poll a server-side JSON?

- [ ] Toots & tweets could look better, include media embeds

- [ ] itch.io profile? (would help if I made some more games)
