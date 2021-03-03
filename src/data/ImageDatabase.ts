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
}