import React from 'react';
import classnames from 'classnames';

import Card from '../Card';
import './index.scss';

export class Steam extends React.Component {
  render() {
    const { username, steamid, user, recent, owned } = this.props;
    const maxItems = this.props.maxItems || 16;

    // Ignore some games I just don't play anymore
    const ignoreAppids = [
      208030, // moon breakers
      224600, // defiance
      204300, // awesomenauts
    ];

    const seenAppIds = {};

    const filterSort = list =>
      list
        .filter(game => game.playtime_forever > 30)
        .filter(game => !ignoreAppids.includes(game.appid))
        .filter(game => {
          const seen = game.appid in seenAppIds;
          seenAppIds[game.appid] = true;
          return !seen;
        })
        .sort((a, b) => b.playtime_forever - a.playtime_forever);

    const games = []
      .concat(filterSort(recent), filterSort(owned))
      .slice(0, maxItems);

    return (
      <Card className="steam" {...this.props}>
        <h3>
          Steam (<a href={user.profileurl}>{user.personaname}</a>)
        </h3>
        <section>
          <ul>{games.map((game, idx) => this.renderGame(game, idx))}</ul>
        </section>
      </Card>
    );
  }

  renderGame(game, idx) {
    const { name, appid, img_icon_url, img_logo_url, playtime_forever } = game;
    const hoursPlayed = Math.floor(playtime_forever / 60.0 * 100) / 100;
    return (
      <li key={idx} className="game">
        <a href={`http://store.steampowered.com/app/${appid}/`}>
          <img
            title={name}
            src={`http://media.steampowered.com/steamcommunity/public/images/apps/${appid}/${img_logo_url}.jpg`}
          />
        </a>
        <span className="hoursPlayed">{hoursPlayed} hours played</span>
      </li>
    );
  }
}

export default Steam;
