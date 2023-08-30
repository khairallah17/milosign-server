const { Sequelize, DataTypes, Model } = require("sequelize")

class SignatureTemplate extends Model {}

SignatureTemplate.init({

    template_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },

    template_name: {
        type: DataTypes.STRING,
        allowNull: false
    }

},{
    Sequelize,
    modelName: "SignatureTemplates"
})

module.exports = SignatureTemplate
