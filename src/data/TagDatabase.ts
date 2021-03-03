// Abstract class
import { BaseDatabase } from "./BaseDatabase"


// Entities
import { TagDTO } from "../business/entities/tagInterfaces"


export class TagDatabase extends BaseDatabase {

    public create = async ({
        id,
        tag
    }: TagDTO): Promise<TagDTO> => {
        try {
            const databaseTag: TagDTO | undefined = await this.getTag(tag)

            // If tag already exists, return it. Else insert tag into DB
            if (databaseTag) {
                return {
                    id: databaseTag.id,
                    tag: databaseTag.tag
                }
            }

            await this.connection.raw(`
                INSERT INTO ${this.tableNames.tags} (id, tag)
                VALUES (
                    "${id}",
                    "${tag}"
                );
            `)

            return { id, tag }

        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }


    public getTag = async (tag: string): Promise<TagDTO> => {
        try {
            const result: any = this.connection.raw(`
                SELECT * FROM ${this.tableNames.tags}
                WHERE
                    tag = ${tag}
                ;
            `)

            return result[0]
            
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }
}