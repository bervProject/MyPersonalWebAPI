import * as feathersAuthentication from '@feathersjs/authentication';
import { iff } from 'feathers-hooks-common';
import * as local from '@feathersjs/authentication-local';
import { setField } from 'feathers-authentication-hooks';
import checkPermissions from 'feathers-permissions';

const { authenticate } = feathersAuthentication.hooks;
const { hashPassword, protect } = local.hooks;

const restrict = [
  authenticate('jwt'),
  checkPermissions({
    roles: ['admin'],
    field: 'role',
    error: false,
  }),
  iff(
    (context) => !context.params.permitted,
    setField({
      from: 'params.user.id',
      as: 'params.query.id',
    }),
  ),
];

export default {
  before: {
    all: [],
    find: [...restrict],
    get: [...restrict],
    create: [
      authenticate('jwt'),
      checkPermissions({
        roles: ['admin'],
        field: 'role',
      }),
      hashPassword('password'),
    ],
    update: [...restrict, hashPassword('password')],
    patch: [...restrict, hashPassword('password')],
    remove: [...restrict],
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password'),
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
