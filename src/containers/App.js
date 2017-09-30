import React, { Component } from 'react';

import './App.scss';
import Avatar from '../images/me.jpg';

import Layout from '../components/Layout';
import Card from '../components/Card';

export default class App extends Component {
  render() {
    return (
      <Layout>
        <Card key="1">
          <div style={{ width: '100%', overflow: 'hidden', textAlign: 'center' }}>
            <img src={Avatar} style={{ height: '100%' }} />
          </div>
        </Card>
        <Card key="5" span="wide">
          <h3>About Me</h3>
          <p>Brunch food truck chartreuse hot chicken actually health goth hexagon
          YOLO marfa wubba lubba dub dub.
          <button>Push me</button>
          Five</p>
        </Card>
        <Card key="2" theme="">
          <h3>About Me</h3>
          <p>Brunch food truck chartreuse hot chicken actually health goth hexagon
          YOLO marfa wubba lubba dub dub.
          <button>Push me</button></p>
        </Card>
        <Card key="3" theme="secondary-2">
          <h3>About Me</h3>
          <p>Brunch food truck chartreuse hot chicken actually health goth hexagon
          YOLO marfa wubba lubba dub dub.
          Three
          <button>Push me</button></p>
        </Card>
        <Card key="4" theme="complement">
          <p>Brunch food truck chartreuse hot chicken actually health goth hexagon
          YOLO marfa wubba lubba dub dub.
          Four
          <button>Push me</button></p>
        </Card>
        <Card key="6" theme="secondary-1">
          <p>Brunch food truck chartreuse hot chicken actually health goth hexagon
          YOLO marfa wubba lubba dub dub.
          <button>Push me</button>
          Six</p>
        </Card>
        <Card key="1a" theme="primary">
          <p>Brunch food truck chartreuse hot chicken actually health goth hexagon
          YOLO marfa wubba lubba dub dub.
          <button>Push me</button></p>
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
    );
  }
}
