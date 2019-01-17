'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    image: DataTypes.TEXT,
    password: DataTypes.STRING,
    Id: DataTypes.INTEGER
  }, {});
  user.associate = function(models) {
    models.user.belongsToMany(models.artist, {through: "userArtist" })
  };
  return user;
};