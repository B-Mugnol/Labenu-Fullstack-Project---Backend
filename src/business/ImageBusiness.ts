// Databases
import { CouplingDatabase } from "../data/CouplingDatabase"
import { ImageDatabase } from "../data/ImageDatabase"
import { ImageTagRelationDatabase } from "../data/ImageTagRelationDatabase"
import { TagDatabase } from "../data/TagDatabase"


// Services
import { ErrorHandler } from "./services/errorHandler"
import { IdManager } from "./services/idManager"
import { TokenManager } from "./services/tokenManager"
import { Verify } from "./services/verify"


// Models and Entities
import { allImageInfoDTO, ImageInput } from "./entities/couplingInterfaces"
import { TagModel } from "../model/TagModel"
import { AuthenticationData } from "./entities/authorization"
import { ImageModel } from "../model/ImageModel"


// Error
import { UnauthorizedError } from "../error/UnauthorizedError"


export class ImageBusiness {
    constructor(
        private couplingDatabase: CouplingDatabase,
        private imageDatabase: ImageDatabase,
        private relationDatabase: ImageTagRelationDatabase,
        private tagDatabase: TagDatabase,
        private errorHandler: ErrorHandler,
        private idManager: IdManager,
        private tokenManager: TokenManager,
        private verifier: Verify
    ) { }


    public readonly create = async (image: ImageInput, token: string | undefined): Promise<void> => {

        try {
            if (!token) {
                throw new UnauthorizedError("No token found.")
            }

            const { subtitle, file_path, collection } = image
            this.verifier.string({ subtitle, file_path, collection })

            const imageId: string = this.idManager.generate()
            const creatorData: AuthenticationData = this.tokenManager.tokenData(token)

            image.tags.forEach(tag => {
                this.verifier.string(tag)
                this.verifier.hashtag(tag)
            })

            await this.imageDatabase.create(
                ImageModel.inputToImageDTO(
                    image, imageId, creatorData.id
                )
            )

            image.tags.forEach(async tag => {
                try {
                    const tagObject = TagModel.tagToTagDTO(tag,
                        this.idManager.generate()
                    )

                    const tagInfo = await this.tagDatabase.create(tagObject)

                    await this.relationDatabase.create({
                        image_id: imageId,
                        tag_id: tagInfo.id
                    })
                } catch (error) {
                    throw new Error(error.message)
                }
            })

        } catch (error) {
            this.errorHandler.throwCustomError(error.code, error.message)
        }
    }


    public readonly getByUser = (token: string, perPage?: number,
        pageNumber?: number): Promise<allImageInfoDTO[]> => {
        try {
            if (!token) {
                throw new UnauthorizedError("No token found.")
            }

            const userData = this.tokenManager.tokenData(token)

            // const userImages = await 


        } catch (error) {
            this.errorHandler.throwCustomError(error.code, error.message)
        }
    }
}