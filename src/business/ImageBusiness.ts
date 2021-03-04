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


export class ImageBusiness {
    constructor(
        private imageDatabase: ImageDatabase,
        private relationDatabase: ImageTagRelationDatabase,
        private tagDatabase: TagDatabase,
        private idManager: IdManager,
        private tokenManager: TokenManager,
        private verifier: Verify
    ) { }


    public readonly create = async (image: ImageInput, token: string): Promise<void> => {

        const imageId: string = this.idManager.generate()
        const creatorData: AuthenticationData = this.tokenManager.tokenData(token)

        await this.imageDatabase.create(
            ImageModel.inputToImageDTO(
                image, imageId, creatorData.id, this.verifier
            )
        )

        image.tags.forEach(async tag => {
            const tagObject = TagModel.tagToTagDTO(tag,
                this.idManager.generate(),
                this.verifier)

            const tagInfo = await this.tagDatabase.create(tagObject)

            await this.relationDatabase.create({
                image_id: imageId,
                tag_id: tagInfo.id
            })
        })
    }
}