// External library
import express from "express"


// Business
import { ImageBusiness } from "../../business/ImageBusiness"


// Controller
import { ImageController } from "../ImageController"


// Database
import { CouplingDatabase } from "../../data/CouplingDatabase"
import { ImageDatabase } from "../../data/ImageDatabase"
import { ImageTagRelationDatabase } from "../../data/ImageTagRelationDatabase"
import { TagDatabase } from "../../data/TagDatabase"
import { UserDatabase } from "../../data/UserDatabase"


// Services
import { ErrorHandler } from "../../business/services/errorHandler"
import { IdManager } from "../../business/services/idManager"
import { TokenManager } from "../../business/services/tokenManager"
import { Verify } from "../../business/services/verify"


export const imageRouter = express.Router()


const imageBusiness = new ImageBusiness(
    new CouplingDatabase,
    new ImageDatabase,
    new ImageTagRelationDatabase,
    new TagDatabase,
    new UserDatabase,
    new ErrorHandler,
    new IdManager,
    new TokenManager,
    new Verify,
)

imageRouter.post(
    "/create",
    new ImageController(imageBusiness, new Verify).create
)

imageRouter.get(
    "/",
    new ImageController(imageBusiness, new Verify).getAllImagesByUser
)

imageRouter.get(
    "/:id",
    new ImageController(imageBusiness, new Verify).getAllImagesByUser
)
