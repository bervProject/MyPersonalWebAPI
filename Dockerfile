FROM node:10-alpine
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN yarn
# Bundle app source
COPY . .
EXPOSE 14444
CMD [ "yarn", "start" ]
