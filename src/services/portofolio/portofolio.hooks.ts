import * as feathersAuthentication from '@feathersjs/authentication';
import { userAuditHook } from '@bervproject/feathers-advance-hook';
const { authenticate } = feathersAuthentication.hooks;
export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [authenticate('jwt'), userAuditHook()],
    update: [authenticate('jwt'), userAuditHook()],
    patch: [authenticate('jwt'), userAuditHook()],
    remove: [authenticate('jwt')],
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
};
