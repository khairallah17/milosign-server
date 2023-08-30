const { Sequelize } = require("sequelize")

const sequelize = new Sequelize()

const User = require("./user.models")
const Company = require("./company.models")
const SignatureTemplate = require("./signatureTemplates.models")
const Signature = require("./signature.models")
const Employees = require("./employees.models")
const CompanyGroups = require("./companyGroups.models")
const Campaign = require("./campaign.models")

// USER RELATIONS 
User.hasOne(Company, {
    foreignKey: {
        name: "user_company"
    }
})

// EMPLOYEES RELATIONS
Employees.hasOne(Company, {
    foreignKey: {
        name: "employee_company"
    }
})

Employees.hasOne(CompanyGroups, {
    foreignKey: {
        name: "employee_company_group"
    }
})

Employees.hasOne(Signature, {
    foreignKey: {
        name: "employee_signature"
    }
})

// COMPANY GROUPS
Company.hasMany(CompanyGroups, {
    foreignKey: {
        name: "company"
    }
})

// SIGNATURE TEMPLATE RELATIONS
SignatureTemplate.hasMany(Signature, {
    foreignKey: {
        name: "signature_template_id"
    }
})

module.export =  sequelize