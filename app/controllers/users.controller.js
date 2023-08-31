const { ValidationError } = require("sequelize")
const User = require("../models/user.models")
const { createUserUseCase } = require("../use-cases/User.interface")

const createUserController = async (req, res) => {

    const { firstname, lastname, email, password } = res.body

    const userData = { firstname, lastname, email, password }

    if (!firstname || !lastname || !email || !password)
        throw new ValidationError("Empty fields required")

    try {
        await createUserUseCase(userData)
        res.status(200).json({message: "user created sucessfully"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }

}

const updateUserController = async (req, res) => {}

const deleteUserController = async (userId) => {}

const getUserByIdController = async (userId) => {}

module.exports = {
    createUserController,
    updateUserController,
    deleteUserController,
    getUserByIdController
}