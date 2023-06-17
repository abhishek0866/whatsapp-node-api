const { DataTypes } = require("sequelize");
const { dbConn  } = require("../../libraries/databases/mysql/connection");


const User = dbConn.sequelize.define('users', { // Change the table name to 'User' (singular form)
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING
    },
    phone_number: {
        type: DataTypes.STRING
    },
    address: {
        type: DataTypes.STRING
    },
    food_item: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'users', // Change the table name to 'users' (plural form)
    timestamps: false
});

module.exports = {
    User
};


