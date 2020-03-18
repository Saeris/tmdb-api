# The Mini Movie DB API

## Wait, isn't there already an API for the Mini Movie DB? What is this?

This project started out as an experiment using Apollo Server 2 and their new DataSources pattern. Along the way I decided it would be a good idea to flesh it out a bit more than my previous API and add some missing features such as caching. Because I haven't seen another project that's as complete of an example as this one yet, I decided it would be good to release independently of the front-end I built around the original. The code from here may be merged into the other repo at some point, but for the remainder of 2018 all development on the API will be carried out here. Hopefully you can use it as a starting point for your own awesome projects!

## Okay, so how do I use this?

Setup for this project is a little more difficult than your average GraphQL server. For now, be warned that setup documentation is incomplete and I don't yet know the proper steps for every environment! You will need a local instance of Redis running on your machine in order for caching to work. That will probably be the most difficult part, as it was for me on Windows. I don not yet have a good set of installation notes for you, but I would encourage you to read [this post](https://www.laurivan.com/redis-on-windows-save-rdb-but-not-able-to-persist/) if you run into persistence problems. You may also need to explicitly name your Redis service when you install it on Windows. I followed the instructions found [here](https://raw.githubusercontent.com/MSOpenTech/redis/3.0/Windows%20Service%20Documentation.md) from [this version](https://github.com/MicrosoftArchive/redis) to get it running. I used [chocolatey](https://chocolatey.org/) to install it, and you can find details about that [package here](https://chocolatey.org/packages/redis-64). If you're on OS X or Linux I'm afraid I can't help you, because I have neither OS on hand to experiment with at this time. I trust you can figure it out!

You'll also need to acquire and set some API keys in a `serverless.env.yml` file at the root of the project. Here's an example of all the keys you'll need to set:

```yml
MOVIE_DB_API_KEY: <insert your movie database api key here>
ENGINE_API_KEY: <insert your apollo engine api key here>
```

To deploy your project to AWS you'll need an API key for that too. Follow the [Serverless setup guide](https://serverless.com/framework/docs/providers/aws/guide/quick-start/) to set up all of that.

Once those pre-requisites are out of the way, you should be able to do:

Install dependencies via:
```bash
yarn
```

And then run the server with:
```bash
yarn start
```

And assuming nothing explodes, your server should be listening and you can access a GraphQL Playground by navigating to http://localhost:1337/api

That should be enough to get it running locally. If you run into trouble getting error reporting to Sentry or getting tracing to work with Engine, that shouldn't prevent you from using the API, but it could be difficult to troubleshoot. I had quite a bit of trouble getting Sentry to work myself, which may have more to do with the plugins and reporters I'm trying to use it with. You're on your own if you have issues with those, sorry.

## Anything else I should know?

> Note: This section will be updated later. It's still here because it's a useful list of resources. Some of this hasn't been added to this specific project yet.

Yeah! If you're running this locally, you'll need to get a few things for different parts to work:

- Your own api key from The Movie DB, here's the [instructions](https://developers.themoviedb.org/3/getting-started/introduction). Once you have that, you'll need to create a new file at the root of the project named `serverless.env.yml` with the following key: `movieDBApiKey: "<YOUR_API_KEY_HERE>"`
- If you want to deploy your server, you'll need to first set up [Serverless](https://serverless.com/framework/docs/providers/aws/guide/installation/). Once your credentials are configured and you've created an IAM profile, you should be able to run the deployment commands. You'll also need to set your `apikey` environment variable inside your Lambda settings, here's a [guide](https://docs.aws.amazon.com/lambda/latest/dg/env_variables.html).
- The project is set up to use [Travis](https://travis-ci.org/) for continuous integration and deployment, [Codecov](https://codecov.io/) for code coverage reporting, [Greenkeeper](https://greenkeeper.io/) to track dependency versions, and [Snyk](https://snyk.io/org/saeris/) to protect against security vulnerabilities. Assuming you forked this repo and you want to get all of that working, you'll need to sign up for each and follow their setup instructions. I'll leave that one for you to figure out!
- Lastly if you want to use [Wallaby](https://wallabyjs.com/) to continually run tests as you code, you'll need to get a license and configure your editor, after that the included config should help you use that tool.
- There's some other goodies you can take advantage of in your local environment, such as [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/), which may require extra plugins for your editor of choice before you can use them.

And here's some other commands you can run:

- `yarn start`: Starts the server and the client without opening a playground
- `yarn deploy:dev`: Deploys the api server to AWS to the development stage
- `yarn deploy:prod`: Deploys the api server to AWS to the production stage
- `yarn test`: Runs unit tests for both the server and the client

## Thanks for stopping by!

Everything here is released as-is, without support. PRs for bug fixes are appreciated, but there are no plans to maintain this project long-term. If you were inspired by the code you found here, I would really appreciate being attributed! Hope you find it useful!
