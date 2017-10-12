import React, { Component } from 'react';

import './App.scss';

import Layout from '../components/Layout';
import Card from '../components/Card';
import Header from '../components/Header';
import Avatar from '../components/Avatar';
import Bio from '../components/Bio';
import Blog from '../components/Blog';
import Github from '../components/Github';
import Twitter from '../components/Twitter';
import Spotify from '../components/Spotify';
import Steam from '../components/Steam';
import Goodreads from '../components/Goodreads';
import Pocket from '../components/Pocket';
import Project from '../components/Project';
import ActivityPub from '../components/ActivityPub';
import Feed from '../components/Feed';

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
          <Project
            title="Firefox Test Pilot"
            link="https://testpilot.firefox.com/"
            thumbnail={require('../content/testpilot.png')}
            src={require('../content/testpilot.md')}
            theme={theme()}
          />
          <Project
            title="Snooze Tabs"
            link="https://testpilot.firefox.com/experiments/snooze-tabs"
            thumbnail={require('../content/snoozetabs.png')}
            src={require('../content/snoozetabs.md')}
            theme={theme()}
          />
          <Project
            title="Panic Ranger"
            link="https://github.com/lmorchard/panic-ranger"
            video={require('../content/panic-ranger.mp4')}
            src={require('../content/panic-ranger.md')}
            theme={theme()}
          />
          <Project
            title="Poke the Mongo"
            link="https://lmorchard.itch.io/poke-the-mongo"
            thumbnail={require('../content/poke-the-mongo.gif')}
            src={require('../content/poke-the-mongo.md')}
            theme={theme()}
          />
          <Project
            title="lmorchard.com"
            link="https://github.com/lmorchard/about-me"
            thumbnail={require('../content/aboutme.png')}
            src={require('../content/aboutme.md')}
            theme={theme()}
          />
          <Blog {...this.props.Blog} theme={theme()} />
          <ActivityPub {...this.props.Toots} name="Toots" maxItems={7} theme={theme()} />
          <Feed {...this.props.TTRSS} maxItems={12} theme={theme()} />
          <Twitter {...this.props.Twitter} maxItems={7} theme={theme()} />
          <Github {...this.props.Github} maxItems={7} theme={theme()} />
          <Pocket {...this.props.Pocket} maxItems={7} theme={theme()} />
          <Spotify {...this.props.Spotify} maxItems={7} theme={theme()} />
          <Steam {...this.props.Steam} maxItems={10} theme={theme()} />
          <Goodreads {...this.props.Goodreads} maxItems={10} theme={theme()} />
        </Layout>
      </article>
    );
  }
}
