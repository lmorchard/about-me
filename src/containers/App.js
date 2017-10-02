import React, { Component } from 'react';

import Markdown from 'react-remarkable';
import ReactMarkdown from 'react-markdown';

import './App.scss';
import Avatar from '../images/me.jpg';

import Layout from '../components/Layout';
import Card from '../components/Card';
import Counter from '../components/Counter';
import Github from '../components/Github';

export default class App extends Component {
  render() {
    const { github } = this.props;

    return ([
      <Layout>

        <Card key="avatar" className="avatar">
          <h3>Hi there! This is me.</h3>
          <h4>Les Orchard &lt;me@lmorchard.com&gt;</h4>
          <div className="img"><img src={Avatar} /></div>
        </Card>

        <Github key="3" theme="secondary-2" {...github} />

        <Card key="1a" theme="primary">
          <h3>About Me</h3>
          <section>
            <p>Brunch food truck chartreuse hot chicken actually health goth hexagon
            YOLO marfa wubba lubba dub dub.
            <button>Push me</button></p>
          </section>
        </Card>

        <Card key="5" theme="complement">
          <h3>About Me</h3>
          <Counter />
          <ReactMarkdown source={`
This is a test. Will this update? Suck it.

* One
* Two
* Three
          `} />
        </Card>

        <Card key="2" theme="secondary-1">
          <a className="twitter-timeline" data-width="100%" data-height="100%" data-dnt="true" data-theme="dark" href="https://twitter.com/lmorchard?ref_src=twsrc%5Etfw">Tweets by lmorchard</a>
        </Card>
        <Card key="4" theme="primary">
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
