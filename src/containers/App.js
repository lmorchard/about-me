import React, { Component } from 'react';

import './App.scss';

import Layout from '../components/Layout';
import Card from '../components/Card';

export default class App extends Component {
  render() {
    return (
      <Layout>
        <Card key="1" width="2"><p>One</p></Card>
        <Card key="2"><p>Two</p></Card>
        <Card key="3"><p>Three</p></Card>
        <Card key="4"><p>Four</p></Card>
        <Card key="5"><p>Five</p></Card>
        <Card key="6"><p>Six</p></Card>
      </Layout>
    );
  }
}
