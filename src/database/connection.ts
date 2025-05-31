import {Sequelize} from 'sequelize'

const sequelize = new Sequelize({
    database : process.env.DB_NAME, //database name
    username : process.env.DB_USERNAME, //database ko username default
    password : process.env.DB_PASSWORD, //database ko default password empty
    host : process.env.DB_HOST, //database ko location
    dialect : process.env.DB_DIALECT, //k database use garna khojeko mysql
    port: Number(process.env.DB_PORT) //deafult port number 3306
})

sequelize.authenticate()
.then(()=>{
    console.log("Authenticated vayo, connected")
})
.catch((error)=>{
    console.log(error)
})

export default sequelize