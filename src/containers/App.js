import React, { Component } from 'react';

import './App.scss';
import Avatar from '../images/me.jpg';

import Layout from '../components/Layout';
import Card from '../components/Card';

import Bio from '../components/Bio';
import Github from '../components/Github';
import Twitter from '../components/Twitter';
import Spotify from '../components/Spotify';
import Steam from '../components/Steam';

export default class App extends Component {
  render() {
    return ([
      <Layout>

        <Card key="avatar" className="avatar" theme="default">
          <h3>Les Orchard &lt;me@lmorchard.com&gt;</h3>
          <div className="img"><img src={Avatar} /></div>
          <h4>This is me!</h4>
        </Card>

        <Bio theme="secondary-1" {...this.props.Bio} />
        <Steam theme="default" {...this.props.Steam} />
        <Spotify theme="complement" {...this.props.Spotify} />
        <Github theme="primary" {...this.props.Github} />
        <Twitter theme="secondary-2" {...this.props.Twitter} />

        {/*
        <Card key="4" theme="secondary-1">
          <p>Brunch food truck chartreuse hot chicken actually health goth hexagon
          YOLO marfa wubba lubba dub dub.
          Four
          <button>Push me</button></p>
        </Card>
        <Card key="6" theme="complement">
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
        */}
      </Layout>
    ]);
  }
}
