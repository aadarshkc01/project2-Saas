import {Sequelize} from 'sequelize-typescript'

const sequelize = new Sequelize({
    database : process.env.DB_NAME, //database name
    username : process.env.DB_USERNAME, //database ko username default
    password : process.env.DB_PASSWORD, //database ko default password empty
    host : process.env.DB_HOST, //database ko location
    dialect : "mysql", //k database use garna khojeko mysql
    port: Number(process.env.DB_PORT), //deafult port number 3306
    models : [__dirname + '/models'] // __dirname vaneko current location + '/models'
})

sequelize.authenticate()
.then(()=>{
    console.log("Authenticated vayo, connected")
})
.catch((error)=>{
    console.log(error)
})

//migrate
sequelize.sync({alter: false})
.then(()=>{
    console.log("Migrated successfully new changes")
})

export default sequelize