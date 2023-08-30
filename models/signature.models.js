const { Sequelize, DataTypes, Model } = require("sequelize")

class Signature extends Model {}

Signature.init({

    signature_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },

    signature_name: {
        type: DataTypes.STRING,
        allowNull: false
    }

},{
    Sequelize,
    modelName: "Signatures"
})
