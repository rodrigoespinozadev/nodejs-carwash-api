module.exports = (sequelize, DataTypes) => {

  const File = sequelize.define('File', {
		filepath: DataTypes.STRING,
		mimetype: DataTypes.STRING
  }, {
		paranoid: true
	});

  File.associate = function(models) {
		//File.hasOne(models.ClientCar)
  };

  return File;
};