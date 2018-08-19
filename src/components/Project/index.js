import React from "react";
import classnames from "classnames";
import commonmark from "commonmark";

import Card from "../Card";
import "./index.scss";

export class Project extends React.Component {
  render() {
    const {
      title,
      link,
      src = "",
      thumbnail,
      video,
      iframe,
      children
    } = this.props;

    const reader = new commonmark.Parser();
    const writer = new commonmark.HtmlRenderer();
    const parsed = reader.parse(src);
    const content = writer.render(parsed);

    const createMarkup = () => ({ __html: content });
    return (
      <Card
        {...this.props}
        className={classnames("project", this.props.className)}
      >
        <h3>
          Project: <a href={link}>{title}</a>
        </h3>
        <section>
          {thumbnail && (
            <a className="thumbnail" href={link}>
              <img src={thumbnail} />
            </a>
          )}
          {video && (
            <div className="video">
              <video
                controls="true"
                loop="true"
                preload="metadata"
                src={video}
              />
            </div>
          )}
          {iframe && (
            <div className="iframe">
              <iframe
                frameBorder="0"
                scrolling="no"
                src={iframe}
              />
            </div>
          )}
          {children}
          <div className="text" dangerouslySetInnerHTML={createMarkup()} />
        </section>
      </Card>
    );
  }
}

export default Project;
