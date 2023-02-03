'use strict'
const {
  Model
} = require('sequelize')
/**
 *
 * @param {*} sequelize
 * @param {DataType} Sequelize
 * @returns
 */
module.exports = (sequelize, Sequelize) => {
  class CompanyDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      this.hasOne(models.company_sectors, { foreignKey: 'company_id', sourceKey: 'company_id' })
      // define association here
    }
  }
  CompanyDetails.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },

    company_id: {
      type: Sequelize.STRING,
      unique: true
    },
    company_name: {
      type: Sequelize.STRING
    },
    company_description: {
      type: Sequelize.TEXT
    },

    company_tags: {
      type: Sequelize.ARRAY(Sequelize.STRING)
    },
    company_ceo: {
      type: Sequelize.STRING
    },
    company_employee_count: {
      type: Sequelize.INTEGER
    },
    company_performance: {
      type: Sequelize.FLOAT
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }
  , {
    sequelize,
    modelName: 'company_details'
  })
  return CompanyDetails
}
