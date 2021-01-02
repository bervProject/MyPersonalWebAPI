// Initializes the `experience` service on path `/experience`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Experience } from './experience.class';
import createModel from '../../models/experience.model';
import hooks from './experience.hooks';

declare module '../../declarations' {
  interface ServiceTypes {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    experience: Experience & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('/experience', new Experience(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('experience');

  service.hooks(hooks);
}
