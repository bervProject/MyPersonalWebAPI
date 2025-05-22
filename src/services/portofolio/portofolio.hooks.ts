import * as feathersAuthentication from '@feathersjs/authentication';
import { userAuditHook } from '@bervproject/feathers-advance-hook';
const { authenticate } = feathersAuthentication.hooks;
import checkPermissions from 'feathers-permissions';
import { Portofolio } from './portofolio.class';
import { HookOptions } from '@feathersjs/feathers';
import { Application } from '../../declarations';

export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      authenticate('jwt'),
      checkPermissions({
        roles: ['admin'],
        field: 'role',
      }),
      userAuditHook(),
    ],
    update: [
      authenticate('jwt'),
      checkPermissions({
        roles: ['admin'],
        field: 'role',
      }),
      userAuditHook(),
    ],
    patch: [
      authenticate('jwt'),
      checkPermissions({
        roles: ['admin'],
        field: 'role',
      }),
      userAuditHook(),
    ],
    remove: [
      authenticate('jwt'),
      checkPermissions({
        roles: ['admin'],
        field: 'role',
      }),
      userAuditHook(),
    ],
  },
  after: {
    all: [],
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
} as HookOptions<Application, Portofolio>;
