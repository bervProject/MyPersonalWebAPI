const experience = require('./experience/experience.service.js');
const education = require('./education/education.service.js');
const portofolio = require('./portofolio/portofolio.service.js');
const users = require('./users/users.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(experience);
  app.configure(education);
  app.configure(portofolio);
  app.configure(users);
};
