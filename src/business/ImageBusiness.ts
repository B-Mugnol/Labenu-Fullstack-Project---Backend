// Databases
import { CouplingDatabase } from "../data/CouplingDatabase"
import { ImageDatabase } from "../data/ImageDatabase"
import { ImageTagRelationDatabase } from "../data/ImageTagRelationDatabase"
import { TagDatabase } from "../data/TagDatabase"
import { UserDatabase } from "../data/UserDatabase"


// Services
import { ErrorHandler } from "./services/errorHandler"
import { IdManager } from "./services/idManager"
import { TokenManager } from "./services/tokenManager"
import { Verify } from "./services/verify"


// Models and Entities
import { allImageInfoDTO, ImageInput } from "./entities/couplingInterfaces"
import { AuthenticationData } from "./entities/authorization"
import { ImageModel } from "../model/ImageModel"
import { TagModel } from "../model/TagModel"
import { UserDTO } from "./entities/userInterfaces"


// Error
import { UnauthorizedError } from "../error/UnauthorizedError"
import { NotFoundError } from "../error/NotFoundError"
import { InvalidInputError } from "../error/InvalidInputError"


export class ImageBusiness {
    constructor(
        private couplingDatabase: CouplingDatabase,
        private imageDatabase: ImageDatabase,
        private relationDatabase: ImageTagRelationDatabase,
        private tagDatabase: TagDatabase,
        private userDatabase: UserDatabase,
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

            if (!image.file && !image.file_path) {
                throw new InvalidInputError("Provide only one of the two: file or file_path.")
            }

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


    public readonly getByUser = async (
        token: string | undefined,
        userId: string | undefined,
        perPage?: string,
        pageNumber?: string): Promise<allImageInfoDTO[] | void> => {
        try {
            if (!token) {
                throw new UnauthorizedError("No token found.")
            }

            const userData = this.tokenManager.tokenData(token)

            let businessPerPage: number | undefined = undefined
            let businessPageNumber: number | undefined = undefined

            if (!isNaN(Number(perPage))) {
                businessPerPage = Number(perPage)
            }
            if (!isNaN(Number(pageNumber))) {
                businessPageNumber = Number(pageNumber)
            }

            let id: string = ""
            if (userId) {
                id = userId
                const user: UserDTO | undefined = await this.userDatabase.getById(id)

                if (!user) {
                    throw new NotFoundError("User not found.")
                }

            } else {
                id = userData.id
            }

            const userImages = await this.imageDatabase.getUntaggedImagesByUserId(
                id,
                businessPerPage,
                businessPageNumber
            )

            if (!userImages.length) {
                return []
            }

            const taggedUserImages: Promise<allImageInfoDTO>[] = userImages.map(async (image) => {
                try {
                    const tagInfoArray = await this.couplingDatabase.getTagsFromImageId(image.id)

                    const tags: string[] = tagInfoArray.map(tag => tag.tag)

                    return { ...image, tags }

                } catch (error) {
                    throw new Error(error.message)
                }
            })

            return Promise.all(taggedUserImages)

        } catch (error) {
            this.errorHandler.throwCustomError(error.code, error.message)
        }
    }

}