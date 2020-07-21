const connection = require("./database");
const sequelize = require("sequelize");

const answer = connection.define('answer', {
    body: {
        type: sequelize.STRING,
        allowNull: false
    },

    questionId: {
        type: sequelize.INTEGER,
        allowNull: false
    }

}); 

answer.sync({force: false})

module.exports = answer; 