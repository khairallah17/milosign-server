const User = require("../models/user.models")

const createUserController = async (userData) => {

    const { firstname, lastname, email, password } = userData

    if (!firstname || !)

}

const updateUserController = async (datetoUpdate) => {}

const deleteUserController = async (userId) => {}

const getUserByIdController = async (userId) => {}

module.exports = {
    createUserController,
    updateUserController,
    deleteUserController,
    getUserByIdController
}