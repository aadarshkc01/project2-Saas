import { Request, Response } from "express";
import sequelize from "../../database/connection";
import generateRandomInstituteNumber from "../../services/generateRandomInstituteNumber";
import { IExtendedRequest } from "../../middleware/type";



class InstituteController{
    static async createInstitute(req:IExtendedRequest,res:Response){
        const{instituteName, instituteEmail,institutePhoneNumber,instituteAddress} = req.body
        const instituteVatNo = req.body.instituteVatNo || null
        const institutePanNO = req.body.institutePanNo || null

        if(!instituteName || !instituteEmail || !institutePhoneNumber || !instituteAddress){
            res.status(400).json({
                message: "Please provide instituteName, instituteEmail, institutePhoneNumber, instituteAddress"
            })
            return
        }

        const instituteNumber = generateRandomInstituteNumber()

        //aayo vane = institute create garna paryo --> instituute_72735278, course_862896 sth like this
        await   sequelize.query(`CREATE TABLE IF NOT EXISTS institute_${institutePanNO || instituteVatNo} (
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

        await sequelize.query(`INSERT INTO institute_${instituteNumber} (instituteName, instituteEmail,institutePhoneNumber,instituteAddress,institutePanNo,instituteVatNo) VALUES (?,?,?,?,?,?)`, {
            replacements: [instituteName, instituteEmail,institutePhoneNumber,instituteAddress,institutePanNO,instituteVatNo]
        })

        await sequelize.query(`CREATE TABLE teacher_${instituteNumber} (
            id  INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
            techerName VARCHAR(255) NOT NULL,
            techerEmail VARCHAR(255) NOT NULL UNIQUE,
            techerPhoneNumber VARCHAR(255) NOT NULL UNIQUE
            )`)

        res.status(200).json({
            message : "Institute created!"
        })

    }
}

export default InstituteController