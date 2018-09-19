# MyPersonalWebAPI

[![Greenkeeper badge](https://badges.greenkeeper.io/bervProject/MyPersonalWebAPI.svg)](https://greenkeeper.io/)

![Build Status](https://travis-ci.org/bervProject/MyPersonalWebAPI.svg?branch=master)

> Web API for Bervianto&#39;s Web

## Notes

- Using Dockerfile or Docker Compose
```
Please rename .env.example into .env and update secret keys
```

- Using Heroku

```
Update environment or config, using `secret` and `production` as keys and insert your value.
```

## About

This project uses [Feathers](http://feathersjs.com). An open source web framework for building modern real-time applications.

## Getting Started

Getting up and running is as easy as 1, 2, 3.

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
2. Install your dependencies

    ```
    cd path/to/MyPersonalWebAPI; npm install
    ```

3. Start your app

    ```
    npm start
    ```

## Testing

Simply run `npm test` and all your tests in the `test/` directory will be run.

## Scaffolding

Feathers has a powerful command line interface. Here are a few things it can do:

```
$ npm install -g @feathersjs/cli          # Install Feathers CLI

$ feathers generate service               # Generate a new Service
$ feathers generate hook                  # Generate a new Hook
$ feathers generate model                 # Generate a new Model
$ feathers help                           # Show all commands
```

## Help

For more information on all the things you can do with Feathers visit [docs.feathersjs.com](http://docs.feathersjs.com).

## Changelog

__0.1.0__

- Initial release

## License

Copyright (c) 2018

Licensed under the [MIT license](LICENSE).
