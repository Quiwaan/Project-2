'use strict';
module.exports = (sequelize, DataTypes) => {
  const userArtist = sequelize.define('userArtist', {
    userId: DataTypes.INTEGER,
    artistId: DataTypes.INTEGER
  }, {});
  userArtist.associate = function(models) {
    // associations can be defined here
  };
  return userArtist;
};