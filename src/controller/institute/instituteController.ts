import { Request, Response } from "express";
import sequelize from "../../database/connection";


class InstituteController{
    static async createInstitute(req:Request,res:Response){
        const{instituteName, instituteEmail,institutePhoneNumber,instituteAddress} = req.body
        const instituteVatNo = req.body.instituteVatNo || null
        const institutePanNO = req.body.institutePanNo || null

        if(!instituteName || !instituteEmail || !institutePhoneNumber || !instituteAddress){
            res.status(400).json({
                message: "Please provide instituteName, instituteEmail, institutePhoneNumber, instituteAddress"
            })
            return
        }

        //aayo vane = institute create garna paryo --> instituute_72735278, course_862896 sth like this
        await   sequelize.query(`CREATE TABLE institute (
            id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
            instituteName VARCHAR(255) NOT NULL,
            instituteEmail VARCHAR(255) NOT NULL UNIQUE,
            institutePhoneNumber VARCHAR(255) NOT NULL UNIQUE,
            instituteAddress VARCHAR(255) NOT NULL,
            institutePanNo VARCHAR(255),
            instituteVatNo VARCHAR(255),
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )`)

        res.status(200).json({
            message : "Institute created!"
        })

    }
}

export default InstituteController