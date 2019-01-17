'use strict';
module.exports = (sequelize, DataTypes) => {
  const userTrack = sequelize.define('userTrack', {
    userId: DataTypes.INTEGER,
    trackId: DataTypes.INTEGER
  }, {});
  userTrack.associate = function(models) {
    // associations can be defined here
  };
  return userTrack;
};