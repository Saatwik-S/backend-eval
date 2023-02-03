'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class CompanySectors extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      this.belongsTo(models.company_details, { foreignKey: 'company_id', targetKey: 'company_id' })
    }
  }
  CompanySectors.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    company_id: {
      type: DataTypes.STRING,
      unique: true,
      references: {
        model: 'company_details', key: 'company_id'
      }
    },
    company_sector: {
      type: DataTypes.STRING
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'company_sectors'
  })
  return CompanySectors
}
