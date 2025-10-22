const { html, unescaped } = require("../../lib/html");
const classnames = require("classnames");
const timeago = require("timeago.js");
const Card = require("../../templates/Card");

const BASE_URL = "https://github.com";

module.exports = (props) => {
  const { username, events, theme } = props;
  const maxItems = props.maxItems || 15;

  return Card(
    { ...props, className: `github` },
    html`
      <h3>
        Github (<a rel="me" href="${BASE_URL}/${username}" }>@${username}</a>)
      </h3>
      <section>
        <ul>
          ${events
            .sort((a, b) => b.created_at.localeCompare(a.created_at))
            .slice(0, maxItems)
            .map((event, idx) => renderEvent({ props, ...event }, idx))}
        </ul>
      </section>
    `
  );
};

function renderEvent(event, idx) {
  const { type, created_at } = event;
  const children = type in eventTemplates ? eventTemplates[type](event) : null;
  if (!children) {
    return null;
  }
  return html`
    <li key="${idx}" class="${classnames("event", event.type)}">
      ${renderCreatedAt(event)} ${children}
    </li>
  `;
}

const eventTemplates = {
  WatchEvent: (event) => html`
    <span>
      ${renderActor(event)} watched ${renderRepo(event)}
    </span>
  `,

  PushEvent: (event) => {
    // Skip if no commits in payload
    if (!event.payload.commits || event.payload.commits.length === 0) {
      return null;
    }
    return html`
      <span>
        ${renderActor(event)} pushed ${renderCommit(event)} to
        ${renderRepo(event)} (${renderBranch(event)}):
        ${renderCommitMessage(event)}
      </span>
    `;
  },

  CreateEvent: function renderCreateEvent(event) {
    const { ref_type } = event.payload;
    switch (ref_type) {
      case "repository":
        return html`
          <span>
            ${renderActor(event)} created repository ${renderRepo(event)}
          </span>
        `;
      case "branch":
        return html`
          <span>
            ${renderActor(event)} created branch ${renderBranch(event)} on
            ${renderRepo(event)}
          </span>
        `;
      case "tag":
        return html`
          <span>
            ${renderActor(event)} created tag ${renderTag(event)} on
            ${renderRepo(event)}
          </span>
        `;
      default:
        return null;
    }
  },

  IssuesEvent: (event) => "",

  PullRequestEvent: (event) => html`
    <span>
      ${renderActor(event)} submitted ${renderPullRequest(event)} to
      ${renderRepo(event)}: ${renderPullRequestTitle(event)}
    </span>
  `,

  IssueCommentEvent: (event) => html`
    <span>
      ${renderActor(event)} commented on ${renderIssue(event)} in
      ${renderRepo(event)}: ${renderIssueTitle(event)}
    </span>
  `,

  IssuesEvent: (event) => html`
    <span>
      ${renderActor(event)} submitted ${renderIssue(event)} to
      ${renderRepo(event)}: ${renderIssueTitle(event)}
    </span>
  `,
};

function renderCreatedAt(event) {
  const { created_at } = event;
  return html`
    <span class="createdAt" title="${created_at}" dateTime="${created_at}">
      ${timeago.format(created_at)}
    </span>
  `;
}

function renderActor(event) {
  const login = event.actor.login;
  if (login === event.props.username) {
    return null;
  }
  const display_login = event.actor.display_login;
  return html`
    <a class="actor" href="${BASE_URL}/${login}">
      ${display_login}
    </a>
  `;
}

function renderRepo(event) {
  const repo = event.repo.name;
  return html`
    <a class="repo" href="${BASE_URL}/${repo}">
      ${repo}
    </a>
  `;
}

function renderIssue(event) {
  const { html_url, number, title } = event.payload.issue;
  return html`
    <a class="issue" href="${html_url}">
      Issue #${number}
    </a>
  `;
}

function renderIssueTitle(event) {
  const { title } = event.payload.issue;
  return html`<span class="issueTitle">${title}</span>`;
}

function renderPullRequest(event) {
  const { number, html_url } = event.payload.pull_request;
  return html`
    <a class="pullRequest" href="${html_url}">
      Pull Request #${number}
    </a>
  `;
}

function renderPullRequestTitle(event) {
  const { title } = event.payload.pull_request;
  return html`<span class="pullRequestTitle">${title}</span>`;
}

function renderCommit(event) {
  const repo = event.repo.name;
  const { sha } = event.payload.commits[0];
  return html`
    <a class="commitHash" href="${BASE_URL}/${repo}/commit/${sha}">
      ${sha.substring(0, 7)}
    </a>
  `;
}

function renderCommitMessage(event) {
  // Handle both old API format (commits[0].message) and new format (commits[0].commit.message)
  const commit = event.payload.commits[0];
  const message = commit.message || commit.commit?.message || '';
  const summary = message.split(/\n/)[0];
  return html`<span class="commitMessage">${summary}</span>`;
}

function renderBranch(event) {
  const repo = event.repo.name;
  const branch = event.payload.ref.replace("refs/heads/", "");
  return html`
    <a class="commitBranch" href="${BASE_URL}/${repo}/tree/${branch}">
      ${branch}
    </a>
  `;
}

function renderTag(event) {
  const repo = event.repo.name;
  const tag = event.payload.ref.replace("refs/heads/", "");
  return html`
    <a class="committag" href="${BASE_URL}/${repo}/tree/${tag}">
      ${tag}
    </a>
  `;
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
