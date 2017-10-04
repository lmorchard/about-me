import React from 'react';
import classnames from 'classnames';

import Card from '../Card';
import './index.scss';

export class Bio extends React.Component {
  render() {
    const { content } = this.props;
    const createMarkup = () => ({ __html: content });
    return (
      <Card className="bio" {...this.props}>
        <h3>About Me</h3>
        <section dangerouslySetInnerHTML={createMarkup()} />
      </Card>
    );
  }
}

export default Bio;
