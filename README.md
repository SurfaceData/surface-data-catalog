# README

Welcome to the Surface Data Collective template for setting up
[RedwoodJS](https://redwoodjs.com) websites.

> **Prerequisites**
>
> - Redwood requires [Node.js](https://nodejs.org/en/) (>=14.19.x <=16.x) and
>   [Yarn](https://yarnpkg.com/) (>=1.15)
> - We use [Supabase](https://supabase.com/) for authentication.  Make sure you
>   have an account and a project with User Authentication.
> - Deployment uses [Docker Compose](https://docs.docker.com/compose/).


## Getting Started

Copy this template project into a new project and copy it to your local computer.

Then, to start the project:

1.  Run `yarn install` to download all dependencies
1.  Create a `.env` file with three Supabase keys for user authentication:
  1.  `SUPABASE_URL`
  1.  `SUPABASE_KEY`
  1.  `SUPABASE_JWT_SECRET`
1.  Run `yarn rw dev` to run the dev server.

## Deploying with Docker

Provided in this package is a simple docker compose setup with the API and Web
nodes in separate containers.

You can deploy the template by running:

```
docker compose build
docker compose up -d
```

## What's Included

In this template project we include several common structures needed by most of
our projects:

*  Authentication flows and Supbase integration
*  Two common layouts for standard pages and authentication flows
*  A couple common pages and components
*  Internationalization setup

### Internationalization

We use [React i18next](https://react.i18next.com/) to extract messages and
inject them into the build site.  To do the extraction, run 

```
yarn extract-translations
```

and any new strings will be extracted.

By default we use three namespaces:

1.  `translation`: The default namespace for all messages.
1.  `auth`: Messages related to user authentication.
1.  `layouts`: Messages for layout templates

If you add more namespaces you have to update `web/src/i18n.js` to include
those namespaces.

If you add more languages, you also have to update `web/src/i18n.js` with those
locales.

## Quick Links

-  [Redwood Docs](https://redwoodjs.com/docs/introduction) provide details on
   how to build with Redwood.
-  [Prisma](https://www.prisma.io/) provides details on how to manage the
   database.
-  [Supabase](https://supabase.com/) provides details on storage and
   authentication.
-  [Tailwind](https://tailwindcss.com/) provides instructions for some of our
   styling.
-  [Styled Components](https://styled-components.com/) documents the other
   structure we use for styling.
-  [Rsuite](https://rsuitejs.com/) documents some common components we use.
