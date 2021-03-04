// External libraries
import { Request, Response } from "express"

// Business layer classes and services
import { UserBusiness } from "../business/UserBusiness"



// Model and Entities
import { UserInput } from "../business/entities/userInterfaces"
import { UserModel } from "../model/UserModel"
import { Verify } from "../business/services/verify"


export class UserController {
    constructor(
        private userBusiness: UserBusiness
    ) { }


    public readonly signup = async (req: Request, res: Response): Promise<void> => {
        try {
            const input: UserInput = UserModel.anyToUserInput(req.body, new Verify())

            const accessData = await this.userBusiness.createUser(input)

            res.status(201).send({
                message: "User created successfully.",
                accessData
            })

        } catch (error) {
            res.status(error.code || 400).send(error.message || error.sqlMessage)
        }
    }
}