// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const education = sequelizeClient.define('education', {
    fromDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    toDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    degree: {
      type: DataTypes.STRING,
      allowNull: false
    },
    institution: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  education.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return education;
};
