// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import { Sequelize, DataTypes, Model, ModelCtor } from 'sequelize';
import { Application } from '../declarations';

export interface UserModel {
  email: string;
  password: string;
  role: string;
}

export default function (app: Application): ModelCtor<Model<UserModel>> {
  const sequelizeClient: Sequelize = app.get('sequelizeClient');
  const users = sequelizeClient.define(
    'users',
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      googleId: {
        type: DataTypes.STRING,
        allowNull: true
      },
      profilePicture: {
        type: DataTypes.STRING,
        allowNull: true
      }      
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
  (users as any).associate = function (models: any) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return users;
}
