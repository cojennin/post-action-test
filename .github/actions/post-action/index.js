const core = require('@actions/core');
const github = require('@actions/github');

const parsePullRequestId = githubRef => {
  const result = /refs\/pull\/(\d+)\/merge/g.exec(githubRef);
  if (!result) throw new Error("Reference not found.");
  const [, pullRequestId] = result;
  return pullRequestId;
};

try {
  // Get the JSON webhook payload for the event that triggered the workflow
  try {
    const pullRequestId = parsePullRequestId(process.env.GITHUB_REF);
    console.log(`The PR: ${pullRequestId}`)
  } catch (e) {
    console.log('No PR!');
  }
  // const payload = JSON.stringify(github.context.payload, undefined, 2)
  // console.log(`The event payload: ${payload}`);

} catch (error) {
  core.setFailed(error.message);
}
