// Abstract class
import { BaseDatabase } from "./BaseDatabase"


// Entities
import { ImageDTO } from "../business/entities/imageInterfaces"


export class ImageDatabase extends BaseDatabase {

    public create = async ({
        id,
        subtitle,
        creation_date,
        file_path,
        file,
        collection,
        author_id
    }: ImageDTO): Promise<void> => {
        try {
            await this.connection.raw(`
                INSERT INTO ${this.tableNames.images}
                    (id, subtitle, creation_date, file_path, file, collection, author_id)
                VALUES (
                    "${id}",
                    "${subtitle}",
                    "${creation_date}",
                    "${file_path}",
                    "${file}",
                    "${collection}",
                    "${author_id}"
                );                
            `)
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public getUntaggedImagesByUserId = async (
        userId: string,
        perPage?: number,
        pageNumber?: number
    ): Promise<ImageDTO[]> => {
        try {
            const result: any = await this.connection.raw(`
                SELECT * FROM ${this.tableNames.images}
                WHERE
                    author_id = "${userId}"
                ${perPage ?
                    "LIMIT " + perPage + "\n" +
                    "OFFSET " + (pageNumber ? perPage * (pageNumber! - 1) : 1)
                    :
                    "LIMIT 1000"
                }
                ;
            `)

            return result[0]

        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }
}