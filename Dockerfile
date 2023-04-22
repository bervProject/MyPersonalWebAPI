FROM node:20-alpine as build
# Create app directory
WORKDIR /app
COPY package.json yarn.lock ./
RUN apk add --no-cache git && yarn --frozen-lockfile
COPY . .
RUN yarn compile

FROM node:20-alpine as runner
# Bundle app source
WORKDIR /app
COPY --from=build /app/lib /app/lib
COPY package.json yarn.lock  ./
COPY config/ /app/config
COPY public/ /app/public
RUN yarn --frozen-lockfile --production && yarn cache clean
RUN adduser -D mpwa
USER mpwa
CMD [ "yarn", "start:prod" ]
