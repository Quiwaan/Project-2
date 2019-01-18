'use strict';
module.exports = (sequelize, DataTypes) => {
  const track = sequelize.define('track', {
    name: DataTypes.STRING,
    image: DataTypes.TEXT,
    track: DataTypes.STRING,
    popnum: DataTypes.INTEGER
  }, {});
  track.associate = function(models) {
    models.track.belongsToMany(models.user, { through: "userTrack" })
    models.track.belongsTo(models.artist);
  };
  return track;
};