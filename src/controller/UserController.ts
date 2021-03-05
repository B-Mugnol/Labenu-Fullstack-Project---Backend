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
        private userBusiness: UserBusiness,
        private verifier: Verify
    ) { }


    public readonly signup = async (req: Request, res: Response): Promise<void> => {
        try {
            const validKeys = ["name", "nickname", "email", "password", "avatar"]
            this.verifier.objectKeys(req.body, validKeys)

            this.verifier.string(req.body)

            const input: UserInput = UserModel.anyToUserInput(req.body)

            const accessData = await this.userBusiness.createUser(input)

            res.status(201).send({
                message: "User created successfully.",
                accessData
            })

        } catch (error) {
            res.status(error.code || 400).send(error.message || error.sqlMessage)
        }
    }


    public readonly login = async (req: Request, res: Response): Promise<void> => {
        try {
            const validKeys = ["email", "password"]
            this.verifier.objectKeys(req.body, validKeys)

            this.verifier.string(req.body)

            const { email, password } = req.body

            const accessData = await this.userBusiness.login(email, password)

            res.status(200).send({
                message: "User logged in successfully.",
                accessData
            })

        } catch (error) {
            res.status(error.code || 400).send(error.message || error.sqlMessage)
        }
    }
}