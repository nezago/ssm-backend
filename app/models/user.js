import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
/**
 * @class
 */
  class User extends Model {
    /**
     * @param {object} models
     * @returns {void}
     * @description we define associations here
     */
    static associate(models) {
      // define association here
      User.hasMany(models.UserRole, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isConfirmed: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    paranoid: true,
    timestamps: true,
  });
  return User;
};
