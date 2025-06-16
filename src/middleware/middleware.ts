import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"

class Middleware {
    static isLoggedIn(req:Request,res:Response,next:NextFunction){
        //check if login or not (token accept then verify token)
        const token = req.headers.authorization //jwt
        if(!token){
            res.status(404).json({
                message : "Please provide token"
            })
            return
        }

        //verify garne
        jwt.verify(token, 'thisissecretehai', (erroraayo,resultaayo)=>{
            if (erroraayo) {
                res.status(403).json({
                    message: "Token invalid vayo"
                })
            } else {
                //verified vayo
                console.log(resultaayo, "Result aayo")
            }
        } )

    }
}

export default Middleware