'use strict';
module.exports = (sequelize, DataTypes) => {
  const artist = sequelize.define('artist', {
    name: DataTypes.STRING,
    image: DataTypes.TEXT,
    uri: DataTypes.STRING
  }, {});
  artist.associate = function(models) {
   models.artist.belongsToMany(models.user, { through: "userArtist" });
   models.artist.belongsToMany(models.track, { through: "userTrack" }),
   models.artist.hasMany(models.track);
  };
  return artist;
};