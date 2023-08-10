const { Sequelize, Model, DataTypes } = require("sequelize")

class User extends Model {}

User.init({
    firstname: {
        type: DataTypes.STRING,
        allowNull: false
    },

    lastname: {
        
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false
    },

    refresh_token: {
        type: DataTypes.STRING,
        allowNull: false
    }

})
