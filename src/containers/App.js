import React, { Component } from 'react';

import './App.scss';

import Layout from '../components/Layout';
import Card from '../components/Card';
import Header from '../components/Header';
import Avatar from '../components/Avatar';
import Bio from '../components/Bio';
import Blog from '../components/Blog';
import Github from '../components/Github';
import Glitch from '../components/Glitch';
import Twitter from '../components/Twitter';
import Spotify from '../components/Spotify';
import Steam from '../components/Steam';
import Goodreads from '../components/Goodreads';
import Project from '../components/Project';
import ActivityPub from '../components/ActivityPub';
import Feed from '../components/Feed';
import YouTube from '../components/YouTube';

const themes = [
  'default',
  'primary',
  'secondary-1',
  'secondary-2',
  'complement',
];
let themeIdx = -1;
const theme = () => {
  themeIdx = (themeIdx + 1) % themes.length;
  return themes[themeIdx];
};

export default class App extends Component {
  render() {
    themeIdx = -1;
    return (
      <article>
        <Header title="Les Orchard <me@lmorchard.com>" />
        <Layout>
          <Avatar theme={theme()} title="That's me!" />
          <Bio
            theme={theme()}
            title="About Me"
            src={require('../content/bio.md')}
          />
          <YouTube
            {...this.props.YouTube}
            maxItems={12}
            theme={theme()}
          />
          <Project
            title="Twitch Streaming"
            link="https://twitch.tv/lmorchard"
            iframe="https://player.twitch.tv/?channel=lmorchard&muted=true&autoplay=true"
            src={require('../content/twitch.md')}
            theme={theme()}
          />
          <Feed
            {...this.props.Typing}
            link="https://typing.lmorchard.com"
            maxItems={12}
            theme={theme()}
          />
          <Glitch {...this.props.Glitch} theme={theme()} />
          <Project
            title="Firefox Test Pilot"
            link="https://testpilot.firefox.com/"
            thumbnail={require('../content/testpilot.png')}
            src={require('../content/testpilot.md')}
            theme={theme()}
          />
          <Project
            title="Firefox Color"
            link="https://testpilot.firefox.com/experiments/color"
            thumbnail={require('../content/fx-color.jpg')}
            src={require('../content/fx-color.md')}
            theme={theme()}
          />
          <Blog {...this.props.Blog} theme={theme()} />
          <Github {...this.props.Github} maxItems={7} theme={theme()} />
          <ActivityPub {...this.props.Toots} name="Toots" maxItems={7} theme={theme()} />
          <Twitter {...this.props.Twitter} maxItems={7} theme={theme()} />
          <Feed {...this.props.Pinboard} maxItems={12} theme={theme()} />
          <Spotify {...this.props.Spotify} maxItems={7} theme={theme()} />
          <Steam {...this.props.Steam} maxItems={10} theme={theme()} />
          <Goodreads {...this.props.Goodreads} maxItems={10} theme={theme()} />
        </Layout>
      </article>
    );
  }
}
