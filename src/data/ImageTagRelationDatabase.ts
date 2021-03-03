// Abstract class
import { BaseDatabase } from "./BaseDatabase"


// Entities
import { ImageTagRelationDTO } from "../business/entities/imageTagRelationInterfaces"


export class imageTagRelationDatabase extends BaseDatabase {

    public create = async ({
        image_id,
        tag_id
    }: ImageTagRelationDTO): Promise<void> => {
        try {
            await this.connection.raw(`
            INSERT INTO ${this.tableNames.imageTagRelation} (image_id, tag_id)
            VALUES (
                "${image_id}",
                "${tag_id}"
            );
        `)
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }
}