import { Application } from "../declarations";
import experience from "./experience/experience.service";
import education from "./education/education.service";
import portofolio from "./portofolio/portofolio.service";
import users from "./users/users.service";

// eslint-disable-next-line no-unused-vars
export default function (app: Application) {
  app.configure(experience);
  app.configure(education);
  app.configure(portofolio);
  app.configure(users);
}
