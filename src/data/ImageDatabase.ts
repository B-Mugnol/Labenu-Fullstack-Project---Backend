// Abstract class
import { BaseDatabase } from "./BaseDatabase"


// Entities
import { ImageDTO } from "../business/entities/imageInterfaces"


export class ImageDatabase extends BaseDatabase {

    public readonly create = async ({
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


    public readonly getUntaggedImagesByUserId = async (
        userId: string,
        perPage: number = 100,
        pageNumber: number = 1
    ): Promise<ImageDTO[]> => {
        try {
            const result: any = await this.connection.raw(`
                SELECT * FROM ${this.tableNames.images}
                WHERE
                    author_id = "${userId}"
                ORDER BY
                    creation_date DESC
                LIMIT
                    ${perPage}
                OFFSET
                    ${perPage * (pageNumber - 1)}
                ;
            `)

            return result[0]

        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }
}
