// External library
import express from "express"


// User Business, Database and Controller
import { UserBusiness } from "../../business/UserBusiness"
import { UserDatabase } from "../../data/UserDatabase"
import { UserController } from "../UserController"


// Services
import { HashManager } from "../../business/services/hashManager"
import { IdManager } from "../../business/services/idManager"
import { TokenManager } from "../../business/services/tokenManager"
import { Verify } from "../../business/services/verify"
import { ErrorHandler } from "../../business/services/errorHandler"


export const userRouter = express.Router()

const userBusiness = new UserBusiness(
    new UserDatabase,
    new IdManager,
    new HashManager,
    new TokenManager,
    new Verify,
    new ErrorHandler
)

userRouter.post(
    "/signup",
    new UserController(userBusiness, new Verify)
        .signup
)