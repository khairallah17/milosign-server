const { Sequelize, DataTypes, Model } = require("sequelize")

class CompanyGroups extends Model {}

// ADD RELATION WITH COMPANY TABLE

CompanyGroups.init({

    group_id: {
        type: DataTypes.UUIDV4,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },

    group_name: {
        type: DataTypes.STRING,
        allowNull: false
    }

},{
    Sequelize, 
    modelName: "CompanyGroups"
})

module.exports = CompanyGroups