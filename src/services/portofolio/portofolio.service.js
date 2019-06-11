// Initializes the `portofolio` service on path `/portofolio`
const createService = require('feathers-sequelize');
const createModel = require('../../models/portofolio.model');
const hooks = require('./portofolio.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/portofolio', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('portofolio');

  service.hooks(hooks);
};
