import React, { Component } from 'react';

import './App.scss';

import Layout from '../components/Layout';
import Card from '../components/Card';

import Avatar from '../components/Avatar';
import Bio from '../components/Bio';
import Blog from '../components/Blog';
import Github from '../components/Github';
import Twitter from '../components/Twitter';
import Spotify from '../components/Spotify';
import Steam from '../components/Steam';
import Goodreads from '../components/Goodreads';
import Pocket from '../components/Pocket';

import bioSrc from '../components/Bio/index.md';

const themes = [
  'default',
  'primary',
  'secondary-1',
  'secondary-2',
  'complement'
];
let themeIdx = -1;
const theme = () => {
  themeIdx = (themeIdx + 1) % themes.length;
  return themes[themeIdx];
};

export default class App extends Component {
  render() {
    themeIdx = -1;
    return [
      <Layout>
        <Avatar theme={theme()} title="Les Orchard <me@lmorchard.com>" />
        <Bio theme={theme()} title="About Me" src={bioSrc} />
        <Blog theme={theme()} {...this.props.Blog} />
        <Twitter theme={theme()} {...this.props.Twitter} />
        <Github theme={theme()} {...this.props.Github} />
        <Pocket theme={theme()} {...this.props.Pocket} />
        <Spotify theme={theme()} {...this.props.Spotify} />
        <Steam theme={theme()} {...this.props.Steam} />
        <Goodreads theme={theme()} {...this.props.Goodreads} />
      </Layout>
    ];
  }
}
