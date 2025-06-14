import {Request,Response} from "express"
import User from "../../../database/models/userModel"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

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
        //insert into user table username, password and email
        await User.create({
            username : username,
            password : password,
            email : email,
        })
        res.status(200).json({
            message: "User registered successfully"
        })
    
}


class AuthController{
   static async registerUser(req:Request,res:Response){
    if(req.body === undefined){
        res.status(400).json({
            message :"No data was sent"
        })
    }
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
            password : bcrypt.hashSync(password,12),
            email : email
        })
        res.status(201).json({
            message: "User registered successfully"
        })
    }


    //login flow
    //email/username, password (basic)
    //email, password ---> data accept --> validation -->
    //first check email exist or not verify garni --> if yes now check for password,
    // Token generation(jwt web token)/your identity on digital platform 
    //not-->  not registered
    //bcrypt
    
        async loginUser (req:Request, res:Response){
        const {email,password} = req.body
        if(!email || !password){
            res.status(400).json({
                message: "Please provide email,password"
            })
            return
        }
        const data = await User.findAll({ //return array
            where:{
                email
            }
        })

        if (data.length==0) {
            res.status(404).json({
                message: "Not registered"
            })
        }else{
            //check password nepal2222 ---> hash conversion -->#bhsgjhjgxjgw
            //compare (plain password user dekhi aayeko, rw hashed passowrd register huda table ma baseko)

            const isPasswordMatch = bcrypt.compareSync(password,data[0].password)
            if (isPasswordMatch){
                //login vayo, token generation
                const token = jwt.sign({id : data[0].id},"thisissecretehai",{
                    expiresIn : "2min"
                })
                res.json({
                    token : token
                })

            }else{
                res.status(404).json({
                    message: "Invalid email or password"
                })
            }
        }
    
    }
   
}
    




export default AuthController  //if method lai static garyo vane onject banauna pardaina direct export default ani class name garna milyo

// export default registerUser