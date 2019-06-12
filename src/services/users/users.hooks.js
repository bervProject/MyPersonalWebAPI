const { authenticate } = require('@feathersjs/authentication').hooks;
const {
  iff
} = require('feathers-hooks-common');
const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;
const { restrictToOwner } = require('feathers-authentication-hooks');
const checkPermissions = require('feathers-permissions');

const restrict = [
  authenticate('jwt'),
  checkPermissions({
    roles: ['admin'],
    field: 'role',
    error: false
  }),
  iff(context => !context.params.permitted,
    restrictToOwner({
      idField: 'id',
      ownerField: 'id'
    })
  )
];

module.exports = {
  before: {
    all: [],
    find: [
      ...restrict
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
      ...restrict
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
