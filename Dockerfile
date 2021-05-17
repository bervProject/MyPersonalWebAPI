FROM node:14-alpine as build
# Create app directory
ARG NODE_AUTH_TOKEN
WORKDIR /app
COPY package.json yarn.lock .npmrc ./
RUN apk add --no-cache git && yarn --frozen-lockfile
COPY . .
RUN rm -f .npmrc
RUN yarn compile

FROM node:14-alpine as runner
# Bundle app source
WORKDIR /app
COPY --from=build /app/lib /app/lib
COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile --production
RUN adduser -D mpwa
USER mpwa
CMD [ "yarn", "start:prod" ]
