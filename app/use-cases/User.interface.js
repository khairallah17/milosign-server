const { Sequelize } = require("sequelize")
const User = require("../models/user.models")

const createUserUseCase = async (userData) => {

    const [newUser, created] = User.create({
        user_company: userData.company,
        user_name: userData.name,
        user_email: userData.email,
        user_password: userData.password,
    })
    if (created)
        return (newUser)
    else
        throw new Error("User Not Created")    
}

module.exports = {
    createUserUseCase
}