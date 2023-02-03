
'use strict'

const { DataTypes } = require('sequelize')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  /**
   *
   * @param {*} queryInterface
   * @param {DataTypes} Sequelize
   */
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('company_details', {
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
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('company_details')
  }
}
