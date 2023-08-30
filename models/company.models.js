const { Sequelize, Datatypes, Model } = require("sequelize")

class Company extends Model {}

Company.init({

    company_id: {
        type: Datatypes.UUID,
        defaultValue: Datatypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },

    company_domain: {
        type: Datatypes.STRING,
        primaryKey: true,
        allowNull: false,
    }, 

    company_name: {
        type: Datatypes.STRING,
        allowNull: false,
    },

    company_logo: {
        type: Datatypes.STRING
    },

    company_contact: {
        type: Datatypes.JSON
    },

    company_social: {
        type: Datatypes.JSON
    }

},{
    Sequelize,
    modelName: "Companies" 
})

module.exports = Company