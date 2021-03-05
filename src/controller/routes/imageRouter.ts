// External library
import express from "express"


// Business
import { ImageBusiness } from "../../business/ImageBusiness"


// Controller
import { ImageController } from "../ImageController"


// Database
import { ImageDatabase } from "../../data/ImageDatabase"
import { ImageTagRelationDatabase } from "../../data/ImageTagRelationDatabase"
import { TagDatabase } from "../../data/TagDatabase"


// Services
import { IdManager } from "../../business/services/idManager"
import { TokenManager } from "../../business/services/tokenManager"
import { Verify } from "../../business/services/verify"
import { ErrorHandler } from "../../business/services/errorHandler"


export const imageRouter = express.Router()

const imageBusiness = new ImageBusiness(
    new ImageDatabase,
    new ImageTagRelationDatabase,
    new TagDatabase,
    new IdManager,
    new TokenManager,
    new Verify,
    new ErrorHandler
)

imageRouter.post(
    "/create",
    new ImageController(imageBusiness, new Verify).create
)