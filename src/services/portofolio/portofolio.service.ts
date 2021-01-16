// Initializes the `portofolio` service on path `/portofolio`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Portofolio } from './portofolio.class';
import createModel from '../../models/portofolio.model';
import hooks from './portofolio.hooks';

declare module '../../declarations' {
  interface ServiceTypes {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    portofolio: Portofolio & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('/portofolio', new Portofolio(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('portofolio');

  service.hooks(hooks);
}
