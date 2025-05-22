// Initializes the `portofolio` service on path `/portofolio`
import { Application } from '../../declarations';
import { Portofolio } from './portofolio.class';
import createModel from '../../models/portofolio.model';
import hooks from './portofolio.hooks';

declare module '../../declarations' {
  interface ServiceTypes {
    portofolio: Portofolio;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('portofolio', new Portofolio(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('portofolio');

  service.hooks(hooks);
}
