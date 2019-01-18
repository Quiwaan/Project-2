'use strict';
var bcrypt = require('bcrypt')
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Not correct Email Address'
        }
      }
    },
    username: DataTypes.STRING,
    image: DataTypes.TEXT,
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [8, 16],
          msg: 'Password must be 8-16 characters'
        }
      }
    },
  }, {
    hooks: {
      beforeCreate: function(pendingUser){
        if(pendingUser && pendingUser.password){
          var hash = bcrypt.hashSync(pendingUser.password, 12);
          pendingUser.password = hash;
        }
      }
    }
  });
  user.associate = function(models) {
    models.user.belongsToMany(models.artist, {through: "userArtist" })
  };
  user.prototype.validPassword = function(typedPassword){
    return bcrypt.compareSync(typedPassword, this.password);
  }
  return user;
};