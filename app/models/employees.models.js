const { Sequelize, DataTypes, Model } = require("sequelize")

class Employees extends Model {}

// NEED TO ADD RELATION WITH EMPLOYEE GROUP AND EMPLOYEE SIGNATURE

Employees.init({
    employee_id :{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },

    employee_name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    employee_email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
    employee_title: {
        type: DataTypes.STRING,
        allowNull: false
    },

    employee_social: {
        type: DataTypes.JSON,
        allowNull: false
    },

    employee_contact: {
        type: DataTypes.JSON,
        allowNull: false
    }

},{
    Sequelize,
    modelName: "Employees"
})

module.exports = Employees