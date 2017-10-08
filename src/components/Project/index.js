import React from 'react';
import classnames from 'classnames';
import commonmark from 'commonmark';

import Card from '../Card';
import './index.scss';

export class Project extends React.Component {
  render() {
    const { title, link, src, thumbnail } = this.props;

    const reader = new commonmark.Parser();
    const writer = new commonmark.HtmlRenderer();
    const parsed = reader.parse(src);
    const content = writer.render(parsed);

    const createMarkup = () => ({ __html: content });
    return (
      <Card {...this.props} className={classnames('project', this.props.className)}>
        <h3>Featured Project: <a href={link}>{title}</a></h3>
        <section>
          <a className="thumbnail" href={link}><img src={thumbnail} /></a>
          <div className="text" dangerouslySetInnerHTML={createMarkup()} />
        </section>
      </Card>
    );
  }
}

export default Project;
