const { Sequelize, Model, DataTypes } = require("sequelize")

class User extends Model {}

User.init({
    user_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true, 
        allowNull: false
    },

    user_firstname: {
        type: DataTypes.STRING,
        allowNull: false
    },

    user_lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },

    user_email: {
        type: DataTypes.STRING,
        allowNull: false
    },

    refresh_token: {
        type: DataTypes.STRING,
        allowNull: false
    }

},{
    Sequelize,
    modelName: "Users",
})

module.exports = User