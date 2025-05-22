import * as feathersAuthentication from '@feathersjs/authentication';
import { iff } from 'feathers-hooks-common';
import { passwordHash } from '@feathersjs/authentication-local';
import { resolve, hooks as schemaHooks } from '@feathersjs/schema';
import { setField } from 'feathers-authentication-hooks';
import checkPermissions from 'feathers-permissions';
import { Application, HookContext } from '../../declarations';
import User from '../../models/users.model';
import { HookOptions } from '@feathersjs/feathers';
import { Users } from './users.class';

const { authenticate } = feathersAuthentication.hooks;

export const userExternalResolver = resolve<typeof User, HookContext>({
  properties: {
    // The password should never be visible externally
    password: async () => undefined,
  },
});

export const userDataResolver = resolve<typeof User, HookContext>({
  properties: {
    password: passwordHash({ strategy: 'local' }),
  },
});

const restrict = [
  authenticate('jwt'),
  checkPermissions({
    roles: ['admin'],
    field: 'role',
    error: false,
  }),
  iff(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (context) => !(context.param as any)?.permitted,
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
      schemaHooks.resolveData(userDataResolver),
    ],
    update: [...restrict, schemaHooks.resolveData(userDataResolver)],
    patch: [...restrict, schemaHooks.resolveData(userDataResolver)],
    remove: [...restrict],
  },

  after: {
    all: [schemaHooks.resolveExternal(userExternalResolver)],
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
} as HookOptions<Application, Users>;
