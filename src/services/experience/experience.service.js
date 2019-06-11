// Initializes the `experience` service on path `/experience`
const createService = require('feathers-sequelize');
const createModel = require('../../models/experience.model');
const hooks = require('./experience.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/experience', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('experience');

  service.hooks(hooks);
};
