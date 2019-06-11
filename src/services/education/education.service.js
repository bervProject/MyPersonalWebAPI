// Initializes the `education` service on path `/education`
const createService = require('feathers-sequelize');
const createModel = require('../../models/education.model');
const hooks = require('./education.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/education', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('education');

  service.hooks(hooks);
};
