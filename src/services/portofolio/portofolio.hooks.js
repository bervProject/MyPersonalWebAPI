const { authenticate } = require('@feathersjs/authentication').hooks;
const userAuditHook = require('feathers-advance-hook').default.userAuditHook;

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      authenticate('jwt'),
      userAuditHook()
    ],
    update: [
      authenticate('jwt'),
      userAuditHook()
    ],
    patch: [
      authenticate('jwt'),
      userAuditHook()
    ],
    remove: [
      authenticate('jwt'),
      userAuditHook()
    ]
  },
  after: {
    all: [],
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
