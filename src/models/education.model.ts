// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import { Sequelize, DataTypes, Model, ModelCtor } from 'sequelize';
import { Application } from '../declarations';

export interface EducationModel {
  fromDate: Date;
  toDate: Date;
  degree: string;
  institution: string;
  city: string;
  country: string;
  description: string;
}

export default function (app: Application): ModelCtor<Model<EducationModel>> {
  const sequelizeClient: Sequelize = app.get('sequelizeClient');
  const education = sequelizeClient.define(
    'education',
    {
      fromDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      toDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      degree: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      institution: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country: {
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
        beforeCount(options: any): void {
          options.raw = true;
        },
      },
    },
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unused-vars
  (education as any).associate = function (models: any) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return education;
}
