import React from 'react';
import classnames from 'classnames';
import commonmark from 'commonmark';

import Card from '../Card';
import './index.scss';

export class Bio extends React.Component {
  render() {
    const { src } = this.props;

    const reader = new commonmark.Parser();
    const writer = new commonmark.HtmlRenderer();
    const parsed = reader.parse(src);
    const content = writer.render(parsed);

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
