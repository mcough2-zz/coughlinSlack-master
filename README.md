# coughlinSlack

Sample app to ask for demotron data in NR slack. It uses with [slack-terminalize](https://www.npmjs.com/package/slack-terminalize "slack terminalize at npm") with a basic serverStatus command and a basic insights query command

# Setup

- Run `npm install` to install the dependencies
- Paste the `xoxb-token` of your bot integration in `init` function inside `index.js` file. 
- Run `node .` to start the app. Now the bot should be listening to the slack team you integrated it with
- Invite the bot to desired channels with `/invite @<your-bot-name>` and try the sample commands
