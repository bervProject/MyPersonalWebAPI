// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import { Sequelize, DataTypes, ModelCtor, Model } from 'sequelize';
import { Application } from '../declarations';

export interface ExperienceModel {
  fromDate: Date;
  toDate: Date;
  jobName: string;
  institution: string;
  description: string;
}

export default function (app: Application): ModelCtor<Model<ExperienceModel>> {
  const sequelizeClient: Sequelize = app.get('sequelizeClient');
  const experience = sequelizeClient.define(
    'experience',
    {
      fromDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      toDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      jobName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      institution: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      hooks: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        beforeCount(options: any) {
          options.raw = true;
        },
      },
    },
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unused-vars
  (experience as any).associate = function (models: any) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return experience;
}
