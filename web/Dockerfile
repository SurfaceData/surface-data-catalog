FROM node:14-alpine as builder

WORKDIR /app

COPY web web
COPY .env .
COPY .nvmrc .
COPY graphql.config.js .
COPY package.json .
COPY redwood.toml .
COPY yarn.lock .

RUN yarn install
RUN yarn rw build web
RUN rm -rf ./web/src

WORKDIR /app/web

EXPOSE 8910

ENTRYPOINT [ "yarn", "rw", "serve", "web", "--port", "8910"]
