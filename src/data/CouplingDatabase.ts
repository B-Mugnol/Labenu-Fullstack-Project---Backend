// Abstract class
import { BaseDatabase } from "./BaseDatabase"


// Entities
import { TagDTO } from "../business/entities/tagInterfaces"


export class CouplingDatabase extends BaseDatabase {

    public getTagsFromImageId = async (
        imageId: string
    ): Promise<TagDTO[]> => {
        try {
            const result: any = await this.connection.raw(`
                    SELECT tag FROM ${this.tableNames.images} img
                    JOIN ${this.tableNames.imageTagRelation} r
                        ON r.image_id = img.id
                    JOIN ${this.tableNames.tags} t
                        ON t.id = r.tag_id
                    WHERE img.id = "${imageId}"
                `)

            return result[0]

        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }
}
