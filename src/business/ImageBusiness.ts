// Databases
import { ImageDatabase } from "../data/ImageDatabase"
import { ImageTagRelationDatabase } from "../data/ImageTagRelationDatabase"
import { TagDatabase } from "../data/TagDatabase"


// Services
import { IdManager } from "./services/idManager"
import { TokenManager } from "./services/tokenManager"
import { Verify } from "./services/verify"


// Models and Entities
import { ImageInput } from "./entities/couplingInterfaces"
import { TagModel } from "../model/TagModel"
import { AuthenticationData } from "./entities/authorization"
import { ImageModel } from "../model/ImageModel"


// Error
import { UnauthorizedError } from "../error/UnauthorizedError"
import { InvalidInputError } from "../error/InvalidInputError"


export class ImageBusiness {
    constructor(
        private imageDatabase: ImageDatabase,
        private relationDatabase: ImageTagRelationDatabase,
        private tagDatabase: TagDatabase,
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
            switch (error.code) {
                case 417:
                    throw new InvalidInputError(error.message)
                case 401:
                    throw new UnauthorizedError(error.message)
                default:
                    throw new Error(error.message)
            }
        }
    }
}