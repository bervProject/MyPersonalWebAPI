// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import { Sequelize, DataTypes, ModelCtor, Model } from 'sequelize';
import { Application } from '../declarations';

export interface PortofolioModel {
  title: string;
  description: string;
  image: string;
  icon: string;
  repository: string;
}

export default function (app: Application): ModelCtor<Model<PortofolioModel>> {
  const sequelizeClient: Sequelize = app.get('sequelizeClient');
  const portofolio = sequelizeClient.define(
    'portofolio',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      icon: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      repository: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      hooks: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        beforeCount(options: any): void {
          options.raw = true;
        },
      },
    },
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unused-vars
  (portofolio as any).associate = function (models: any) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return portofolio;
}
