import { Service, SequelizeServiceOptions } from "feathers-sequelize";
import { Application } from "../../declarations";

export class Experience extends Service {
  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options);
  }
}
