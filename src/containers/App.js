import React, { Component } from 'react';

import './App.scss';
import Avatar from '../images/me.jpg';

import Layout from '../components/Layout';
import Card from '../components/Card';

import Bio from '../components/Bio';
import Blog from '../components/Blog';
import Github from '../components/Github';
import Twitter from '../components/Twitter';
import Spotify from '../components/Spotify';
import Steam from '../components/Steam';

import Counter from '../components/Counter';

export default class App extends Component {
  render() {
    return ([
      <Layout>

        <Card key="avatar" className="avatar" theme="default">
          <h3>Les Orchard &lt;me@lmorchard.com&gt;</h3>
          <div className="img"><img src={Avatar} /></div>
          <h4>This is me!</h4>
        </Card>

        <Card>
          <h3>Counter</h3>
          <section>
            <div id="counter1"><Counter /></div>
            <div id="counter2"><Counter /></div>
            <div id="counter3"><Counter /></div>
            <div id="counter4"><Counter /></div>
          </section>
        </Card>

        <Bio theme="secondary-1" {...this.props.Bio} />
        <Blog theme="default" {...this.props.Blog} />
        <Twitter theme="secondary-2" {...this.props.Twitter} />
        <Spotify theme="complement" {...this.props.Spotify} />
        <Github theme="primary" {...this.props.Github} />
        <Steam theme="default" {...this.props.Steam} />

      </Layout>
    ]);
  }
}
