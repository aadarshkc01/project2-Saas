import {Request,Response} from "express"
import User from "../../../database/models/userModel"
//json data --> req.body// username, password, email
//file--> req.files photo video sabai 

//Register/signup
//incoming data --? username, email, password
//processing/checking --> email validation, compulsory data
//db-->table query --> table ma innsert/read/delete/update

//Login/SIgnup
//logout
//forget password
//reset password/otp

const registerUser = async (req:Request,res:Response)=>{
    const {username,password,email} =req.body
    if(!username || !password || !email){
        res.status(400).json({
            message : "Please provide username, password, email"
        })
        return
    }
        //insert into user table
        await User.create({
            username : username,
            password : password,
            email : email
        })
        res.status(200).json({
            message: "User registered successfully"
        })
    
}


class AuthController{
   static async registerUser(req:Request,res:Response){
     const {username,password,email} =req.body
    if(!username || !password || !email){
        res.status(400).json({
            message : "Please provide username, password, email"
        })
        return
    }
        //insert into user table
        await User.create({
            username : username,
            password : password,
            email : email
        })
        res.status(200).json({
            message: "User registered successfully"
        })
    }
}

export default AuthController  //if method lai static garyo vane onject banauna pardaina direct export default ani class name garna milyo

// export default registerUser