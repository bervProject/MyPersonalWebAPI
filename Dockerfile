FROM node:10-alpine as build
# Create app directory
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN apk add --no-cache git
RUN yarn

FROM node:10-alpine as runner
# Bundle app source
COPY --from=build /usr/src/app /usr/src/app
WORKDIR /usr/src/app
EXPOSE 14444
CMD [ "yarn", "start" ]
