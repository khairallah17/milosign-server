const { Sequelize, DataTypes, Model } = require("sequelize")

class Campaign extends Model {}

// ADD RELATION WITH COMPANY GROUP

Campaign.init({

    Campaign_id: {
        type: DataTypes.UUIDV4,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },

    campaign_start_data: {
        type: DataTypes.DATE,
        allowNull: false
    },

    campaign_end_date: {
        type: DataTypes.DATE,
        allowNull: false
    },

    campaign_banner: {
        type: DataTypes.STRING,
        allowNull: false
    },

    campaign_banner_styles: {
        type: DataTypes.JSON,
        allowNull: false
    },

    campaign_banner_link: {
        type: DataTypes.STRING,
        allowNull: false
    }

},{
    Sequelize,
    modelName: "Campaign"
})

module.exports = Campaign