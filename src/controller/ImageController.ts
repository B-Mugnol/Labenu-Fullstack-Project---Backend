// External libraries
import { Request, Response } from "express"


// Business layer classes and services
import { ImageBusiness } from "../business/ImageBusiness"


// Model and Entities
import { ImageInput } from "../business/entities/couplingInterfaces"
import { ImageModel } from "../model/ImageModel"


// Services
import { Verify } from "../business/services/verify"


export class ImageController {
    constructor(
        private imageBusiness: ImageBusiness,
        private verifier: Verify
    ) { }


    public readonly create = async (req: Request, res: Response): Promise<void> => {
        try {
            const validKeys = ["subtitle", "file_path", "file", "collection", "tags"]
            const optionalKeys = ["file_path", "file"]
            this.verifier.objectKeys(req.body, validKeys, optionalKeys)

            const input: ImageInput = ImageModel.anyToImageInput(req.body)

            const token = req.headers.authorization

            await this.imageBusiness.create(input, token)

            res.status(201).send({
                message: "Image created successfully."
            })

        } catch (error) {
            res.status(error.code || 400).send(error.message || error.sqlMessage)
        }
    }
}