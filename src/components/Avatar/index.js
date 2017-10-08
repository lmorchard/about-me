import React from 'react';
import classnames from 'classnames';
import Card from '../Card';
import './index.scss';

import AvatarImage from './me.jpg';

export class Avatar extends React.Component {
  render() {
    const { title, subtitle } = this.props;

    return (
      <Card {...this.props} className={classnames('avatar', this.props.className)}>
        {title && <h3>{title}</h3>}
        <section>
          <img className="avatar" src={AvatarImage} />
        </section>
        {subtitle && <h4>{subtitle}</h4>}
      </Card>
    );
  }
}

export default Avatar;
