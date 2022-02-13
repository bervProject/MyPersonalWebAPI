// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import { Sequelize, DataTypes, Model, ModelCtor } from 'sequelize';
import { Application } from '../declarations';

export interface BlogModel {
  content: string;
  createdBy: string;
  updatedBy: string;
  draft: boolean;
}

export default function (app: Application): ModelCtor<Model<BlogModel>> {
  const sequelizeClient: Sequelize = app.get('sequelizeClient');
  const blog = sequelizeClient.define(
    'blog',
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      draft: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      createdBy: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      updatedBy: {
        type: DataTypes.STRING,
        allowNull: true,
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
  (blog as any).associate = function (models: any): void {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return blog;
}
