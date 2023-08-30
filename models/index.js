const { Sequelize } = require("sequelize")

const sequelize = new Sequelize()

const User = require("./user.models")
const Company = require("./company.models")
const SignatureTemplate = require("./signatureTemplates.models")
const Signature = require("./signature.models")

SignatureTemplate.hasMany(Signature, {
    foreignKey: {
        name: "signature_template_id"
    }
})

module.export =  sequelize