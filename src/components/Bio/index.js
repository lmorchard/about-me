import React from 'react';
import classnames from 'classnames';
import commonmark from 'commonmark';

import Card from '../Card';
import './index.scss';

export class Bio extends React.Component {
  render() {
    const { avatarTitle, title, src } = this.props;

    const reader = new commonmark.Parser();
    const writer = new commonmark.HtmlRenderer();
    const parsed = reader.parse(src);
    const content = writer.render(parsed);

    const createMarkup = () => ({ __html: content });
    return (
      <Card {...this.props} className={classnames('bio', this.props.className)}>
        <h3>{title}</h3>
        <section>
          <div className="text" dangerouslySetInnerHTML={createMarkup()} />
        </section>
      </Card>
    );
  }
}

export default Bio;
