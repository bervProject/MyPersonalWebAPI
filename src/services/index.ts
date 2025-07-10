import { Application } from '../declarations';
import experience from './experience/experience.service';
import education from './education/education.service';
import portofolio from './portofolio/portofolio.service';
import users from './users/users.service';
import blog from './blog/blog.service';

export default function (app: Application): void {
  app.configure(experience);
  app.configure(education);
  app.configure(portofolio);
  app.configure(users);
  app.configure(blog);
}
