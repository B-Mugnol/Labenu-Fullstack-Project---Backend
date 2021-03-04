// Abstract class
import { BaseDatabase } from "./BaseDatabase"


// Databases
import { UserDatabase } from "./UserDatabase"
import { ImageDatabase } from "./ImageDatabase"
import { ImageTagRelationDatabase } from "./ImageTagRelationDatabase"
import { TagDatabase } from "./TagDatabase"


// Entities
import { allImageInfoDTO } from "../business/entities/couplingInterfaces";
import { ImageDTO } from "../business/entities/imageInterfaces"


// Errors
import { NotFoundError } from "../error/NotFoundError"


export class CouplingDatabase extends BaseDatabase {

    constructor(
        private userDatabase: UserDatabase,
        private imageDatabase: ImageDatabase,
        private relationDatabase: ImageTagRelationDatabase,
        private tagDatabase: TagDatabase
    ) {
        super()
    }


    public getImagesByUserId = async (
        userId: string,
        perPage?: number,
        pageNumber?: number): Promise<allImageInfoDTO[]> => {
        try {
            const basicImage: ImageDTO[] | undefined = await this.imageDatabase.getUntaggedImagesByUserId(
                userId,
                perPage,
                pageNumber
            )

            if (!basicImage) throw new NotFoundError("User has created no images.")

            const imageArray: allImageInfoDTO[] = []

            basicImage.forEach(async image => {
                const tagsObjArray: { tag: string }[] = await this.connection.raw(`
                    SELECT tag FROM ${this.tableNames.images} img
                    JOIN ${this.tableNames.imageTagRelation} r
                        ON r.image_id = ${image.id}
                    JOIN ${this.tableNames.tags} t
                        ON t.id = r.tag_id
                `)

                const tags: string[] = tagsObjArray.map(tagObj => tagObj.tag)

                imageArray.push({ ...image, tags })
            });

            return imageArray

        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }
}