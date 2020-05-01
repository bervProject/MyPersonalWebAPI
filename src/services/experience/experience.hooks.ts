import * as feathersAuthentication from "@feathersjs/authentication";
import hook from "feathers-advance-hook";
const { authenticate } = feathersAuthentication.hooks;
const { userAuditHook } = hook;
export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [authenticate("jwt"), userAuditHook()],
    update: [authenticate("jwt"), userAuditHook()],
    patch: [authenticate("jwt"), userAuditHook()],
    remove: [authenticate("jwt")],
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
