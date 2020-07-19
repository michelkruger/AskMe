const sequelize = require('sequelize')

const connection = new sequelize('askme','root','81216329',{
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection;