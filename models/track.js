'use strict';
module.exports = (sequelize, DataTypes) => {
  const track = sequelize.define('track', {
    name: DataTypes.STRING,
    image: DataTypes.TEXT,
    track: DataTypes.STRING,
    popnum: DataTypes.INTEGER
  }, {});
  track.associate = function(models) {
    models.track.belongsToMany(models.artist, { through: "userTrack" })
    models.artist.hasMany(models.track);
  };
  return track;
};