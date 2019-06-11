const { authenticate } = require('@feathersjs/authentication').hooks;

const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;
const { restrictToOwner } = require('feathers-authentication-hooks');
const checkPermissions = require('feathers-permissions');
const restrict = [
  authenticate('jwt'),
  restrictToOwner({
    idField: 'id',
    ownerField: 'id'
  })
];

module.exports = {
  before: {
    all: [],
    find: [
      authenticate('jwt'),
      checkPermissions({
        roles: ['admin'],
        field: 'role'
      })
    ],
    get: [
      ...restrict
    ],
    create: [
      authenticate('jwt'),
      checkPermissions({
        roles: ['admin'],
        field: 'role'
      }),
      hashPassword()
    ],
    update: [
      ...restrict,
      hashPassword()
    ],
    patch: [
      ...restrict,
      hashPassword()
    ],
    remove: [
      authenticate('jwt'),
      checkPermissions({
        roles: ['admin']
      })
    ]
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
