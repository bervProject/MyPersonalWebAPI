// Initializes the `education` service on path `/education`
import { Application } from '../../declarations';
import { Education } from './education.class';
import createModel from '../../models/education.model';
import hooks from './education.hooks';

declare module '../../declarations' {
  interface ServiceTypes {
    education: Education;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('education', new Education(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('education');

  service.hooks(hooks);
}
