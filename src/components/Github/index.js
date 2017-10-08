import React from 'react';
import classnames from 'classnames';
import timeago from 'timeago.js';

import Card from '../Card';
import './index.scss';

const BASE_URL = 'https://github.com';

export class Github extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { username, events, theme } = this.props;
    const maxItems = this.props.maxItems || 15;
    return (
      <Card className="github" theme={theme}>
        <h3>
          Github (<a href={`${BASE_URL}/${username}`}>@{username}</a>)
        </h3>
        <section>
          <ul>
            {events
              .slice(0, maxItems)
              .map((event, idx) => this.renderEvent(event, idx))}
          </ul>
        </section>
      </Card>
    );
  }

  renderEvent(event, idx) {
    const { type, created_at } = event;
    const method = `render${event.type}`;
    const children = method in this ? this[method](event) : null;
    if (!children) {
      return null;
    }
    return (
      <li key={idx} className={classnames('event', event.type)}>
        {this.renderCreatedAt(event)}
        {children}
      </li>
    );
  }

  renderWatchEvent(event) {
    return (
      <span>
        {this.renderActor(event)} watched {this.renderRepo(event)}
      </span>
    );
  }

  renderPushEvent(event) {
    return (
      <span>
        {this.renderActor(event)} pushed {this.renderCommit(event)} to{' '}
        {this.renderRepo(event)} ({this.renderBranch(event)}):{' '}
        {this.renderCommitMessage(event)}
      </span>
    );
  }

  renderCreateEvent(event) {
    const { ref_type } = event.payload;
    switch (ref_type) {
      case 'repository':
        return (
          <span>
            {this.renderActor(event)} created repository{' '}
            {this.renderRepo(event)}
          </span>
        );
      case 'branch':
        return (
          <span>
            {this.renderActor(event)} created branch {this.renderBranch(event)}{' '}
            on {this.renderRepo(event)}
          </span>
        );
      case 'tag':
        return (
          <span>
            {this.renderActor(event)} created tag {this.renderTag(event)} on{' '}
            {this.renderRepo(event)}
          </span>
        );
      default:
        return null;
    }
  }

  renderIssuesEvent(event) {}

  renderPullRequestEvent(event) {
    return (
      <span>
        {this.renderActor(event)} submitted {this.renderPullRequest(event)} to{' '}
        {this.renderRepo(event)}: {this.renderPullRequestTitle(event)}
      </span>
    );
  }

  renderIssueCommentEvent(event) {
    return (
      <span>
        {this.renderActor(event)} commented on {this.renderIssue(event)} in{' '}
        {this.renderRepo(event)}: {this.renderIssueTitle(event)}
      </span>
    );
  }

  renderIssuesEvent(event) {
    return (
      <span>
        {this.renderActor(event)} submitted {this.renderIssue(event)} to{' '}
        {this.renderRepo(event)}: {this.renderIssueTitle(event)}
      </span>
    );
  }

  renderCreatedAt(event) {
    const { created_at } = event;
    return (
      <span className="createdAt" title={created_at} dateTime={created_at}>
        {timeago().format(created_at)}
      </span>
    );
  }

  renderActor(event) {
    const login = event.actor.login;
    if (login === this.props.username) {
      return null;
    }

    const display_login = event.actor.display_login;
    return (
      <a className="actor" href={`${BASE_URL}/${login}`}>
        {display_login}
      </a>
    );
  }

  renderRepo(event) {
    const repo = event.repo.name;
    return (
      <a className="repo" href={`${BASE_URL}/${repo}`}>
        {repo}
      </a>
    );
  }

  renderIssue(event) {
    const { html_url, number, title } = event.payload.issue;
    return (
      <a className="issue" href={html_url}>
        Issue #{number}
      </a>
    );
  }

  renderIssueTitle(event) {
    const { title } = event.payload.issue;
    return <span className="issueTitle">{title}</span>;
  }

  renderPullRequest(event) {
    const { number, html_url } = event.payload.pull_request;
    return (
      <a className="pullRequest" href={html_url}>
        Pull Request #{number}
      </a>
    );
  }

  renderPullRequestTitle(event) {
    const { title } = event.payload.pull_request;
    return <span className="pullRequestTitle">{title}</span>;
  }

  renderCommit(event) {
    const repo = event.repo.name;
    const { sha } = event.payload.commits[0];
    return (
      <a className="commitHash" href={`${BASE_URL}/${repo}/commit/${sha}`}>
        {sha.substring(0, 7)}
      </a>
    );
  }

  renderCommitMessage(event) {
    const { message } = event.payload.commits[0];
    const summary = message.split(/\n/)[0];
    return <span className="commitMessage">{summary}</span>;
  }

  renderBranch(event) {
    const repo = event.repo.name;
    const branch = event.payload.ref.replace('refs/heads/', '');
    return (
      <a className="commitBranch" href={`${BASE_URL}/${repo}/tree/${branch}`}>
        {branch}
      </a>
    );
  }

  renderTag(event) {
    const repo = event.repo.name;
    const tag = event.payload.ref.replace('refs/heads/', '');
    return (
      <a className="committag" href={`${BASE_URL}/${repo}/tree/${tag}`}>
        {tag}
      </a>
    );
  }

  /* TODO - https://developer.github.com/v3/activity/events/types/
  renderForkEvent
  renderDeleteEvent
  renderFollowEvent
  renderGistEvent
  renderPageBuildEvent
  renderPullRequestReviewEvent
  renderPullRequestReviewCommentEvent
  renderCommitCommentEvent
  renderReleaseEvent
  renderRepositoryEvent
  renderStatusEvent
  renderDeploymentEvent
  renderDeploymentStatusEvent
  renderDownloadEvent
  renderForkApplyEvent
  renderGollumEvent
  renderInstallationEvent
  renderInstallationRepositoriesEvent
  renderLabelEvent
  renderMarketplacePurchaseEvent
  renderMemberEvent
  renderMembershipEvent
  renderMilestoneEvent
  renderOrganizationEvent
  renderOrgBlockEvent
  renderProjectCardEvent
  renderProjectColumnEvent
  renderProjectEvent
  renderPublicEvent
  renderTeamEvent
  renderTeamAddEvent
  */
}

export default Github;
