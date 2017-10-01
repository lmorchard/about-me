import React, { Component } from 'react';

import './App.scss';
import Avatar from '../images/me.jpg';

import Layout from '../components/Layout';
import Card from '../components/Card';
import Counter from '../components/Counter';

export default class App extends Component {
  render() {
    return ([
      <h2>Les Orchard &lt;me@lmorchard.com&gt;</h2>,
      <Layout>
        <Card key="1">
          <h3>This is me. Hello there!</h3>
          <div style={{ width: '100%', overflow: 'hidden', textAlign: 'center' }}>
            <img src={Avatar} style={{ height: 'calc(100% - 3.5em)' }} />
          </div>
        </Card>
        <Card key="5" theme="primary" span="wide">
          <h3>About Me</h3>
          <Counter />
          <p>Brunch food truck chartreuse hot chicken actually health goth hexagon
          YOLO marfa wubba lubba dub dub.
          <button>Push me</button>
          Five</p>
        </Card>
        <Card key="3" theme="secondary-2">
          <h3>GitHub</h3>
          <div class="github-widget" data-username="lmorchard" style={{ background: '#fff' }}></div>
        </Card>
        <Card key="2" theme="secondary-1">
          <a class="twitter-timeline" data-width="100%" data-height="100%" data-dnt="true" data-theme="dark" href="https://twitter.com/lmorchard?ref_src=twsrc%5Etfw">Tweets by lmorchard</a>
        </Card>
        <Card key="1a" theme="primary">
          <h3>About Me</h3>
          <p>Brunch food truck chartreuse hot chicken actually health goth hexagon
          YOLO marfa wubba lubba dub dub.
          <button>Push me</button></p>
        </Card>
        <Card key="4" theme="complement">
          <p>Brunch food truck chartreuse hot chicken actually health goth hexagon
          YOLO marfa wubba lubba dub dub.
          Four
          <button>Push me</button></p>
        </Card>
        <Card key="6" theme="">
          <p>Brunch food truck chartreuse hot chicken actually health goth hexagon
          YOLO marfa wubba lubba dub dub.
          <button>Push me</button>
          Six</p>
        </Card>
        <Card key="2a" theme="secondary-1">
          <p>Brunch food truck chartreuse hot chicken actually health goth hexagon
          YOLO marfa wubba lubba dub dub.
          <button>Push me</button></p>
        </Card>
        <Card key="3a" theme="secondary-2">
          <p>Brunch food truck chartreuse hot chicken actually health goth hexagon
          YOLO marfa wubba lubba dub dub.
          Three
          <button>Push me</button></p>
        </Card>
        <Card key="4a" theme="complement">
          <p>Brunch food truck chartreuse hot chicken actually health goth hexagon
          YOLO marfa wubba lubba dub dub.
          Four
          <button>Push me</button></p>
        </Card>
        <Card key="5a">
          <p>Brunch food truck chartreuse hot chicken actually health goth hexagon
          YOLO marfa wubba lubba dub dub.
          <button>Push me</button>
          Five</p>
        </Card>
        <Card key="6a">
          <p>Brunch food truck chartreuse hot chicken actually health goth hexagon
          YOLO marfa wubba lubba dub dub.
          <button>Push me</button>
          Six</p>
        </Card>
      </Layout>
    ]);
  }
}
