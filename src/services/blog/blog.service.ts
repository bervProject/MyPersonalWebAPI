// Initializes the `blog` service on path `/blog`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Blog } from './blog.class';
import createModel from '../../models/blog.model';
import hooks from './blog.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    blog: Blog & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('/blog', new Blog(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('blog');

  service.hooks(hooks);
}
