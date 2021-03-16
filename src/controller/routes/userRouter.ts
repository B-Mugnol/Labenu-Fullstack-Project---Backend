// External library
import express from "express"


// User Business, Controller and Database
import { UserBusiness } from "../../business/UserBusiness"
import { UserController } from "../UserController"
import { UserDatabase } from "../../data/UserDatabase"


// Services
import { ErrorHandler } from "../../business/services/errorHandler"
import { HashManager } from "../../business/services/hashManager"
import { IdManager } from "../../business/services/idManager"
import { TokenManager } from "../../business/services/tokenManager"
import { Verify } from "../../business/services/verify"


export const userRouter = express.Router()

const userBusiness = new UserBusiness(
    new UserDatabase,
    new IdManager,
    new HashManager,
    new TokenManager,
    new Verify,
    new ErrorHandler
)

const userController = new UserController(
    userBusiness,
    new Verify)


userRouter.post(
    "/signup",
    userController.signup
)

userRouter.post(
    "/login",
    userController.login
)
