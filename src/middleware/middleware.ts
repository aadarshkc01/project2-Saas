import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import User from "../database/models/userModel";
import { IExtendedRequest } from "./type";


class Middleware {
    static isLoggedIn(req:IExtendedRequest,res:Response,next:NextFunction){
        //check if login or not (token accept then verify token)
        const token = req.headers.authorization //jwt
        if(!token){
            res.status(404).json({
                message : "Please provide token"
            })
            return
        }

        //verify garne 
        jwt.verify(token, 'thisissecretehai', async(erroraayo,resultaayo:any)=>{
            if (erroraayo) {
                res.status(403).json({
                    message: "Token invalid vayo"
                })
            } else {
                //verified vayo
                // console.log(resultaayo, "Result aayo")
                // const userData = await User.findAll({
                //     where:{
                //         id : resultaayo.id
                //     }
                // })

                const userData = await User.findByPk(resultaayo.id)
                if(!userData){
                    res.status(403).json({
                        message : "No user with that id, invalid token"
                    })
                }else{
                    req.user = userData
                }
                next()
            
            }
        })
    }
}
//                 if (userData.length === 0){
//                     res.status(404).json({
//                         message : "No user with that id, invalid token"
//                     })
//                 }else{
//                     console.log("Successfully verified")
//                 }
//             }
//         } )
//         next()
//     }
// }

export default Middleware