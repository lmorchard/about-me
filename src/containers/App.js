import React, { Component } from 'react';

import './App.scss';

import Layout from '../components/Layout';
import Card from '../components/Card';

export default class App extends Component {
  render() {
    return (
      <Layout>
        <Card key="1" width="2">One</Card>
        <Card key="2">Two</Card>
        <Card key="3">Three</Card>
        <Card key="4">Four</Card>
        <Card key="5">Five</Card>
        <Card key="6">Six</Card>
      </Layout>
    );
  }
}
