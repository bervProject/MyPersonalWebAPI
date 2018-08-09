const authentication = require('@feathersjs/authentication');
const jwt = require('@feathersjs/authentication-jwt');
const local = require('@feathersjs/authentication-local');


module.exports = function (app) {
  const config = {
    secret: process.env.secret,
    strategies: [
      'jwt',
      'local'
    ],
    path: '/authentication',
    service: 'users',
    jwt: {
      header: {
        typ: 'access'
      },
      audience: 'http://berviantoleo.herokuapp.com',
      subject: 'anonymous',
      issuer: 'bervLeo',
      algorithm: 'HS256',
      expiresIn: '1d'
    },
    local: {
      entity: 'user',
      usernameField: 'email',
      passwordField: 'password'
    }
  };

  // Set up authentication with the secret
  app.configure(authentication(config));
  app.configure(jwt());
  app.configure(local());

  // The `authentication` service is used to create a JWT.
  // The before `create` hook registers strategies that can be used
  // to create a new valid JWT (e.g. local or oauth2)
  app.service('authentication').hooks({
    before: {
      create: [
        authentication.hooks.authenticate(config.strategies)
      ],
      remove: [
        authentication.hooks.authenticate('jwt')
      ]
    }
  });
};
