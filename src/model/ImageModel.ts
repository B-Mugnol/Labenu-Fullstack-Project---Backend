// External libraries
import dayjs from "dayjs"


// Entities
import { ImageDTO } from "../business/entities/imageInterfaces"
import { ImageInput } from "../business/entities/couplingInterfaces"


// Error
import { InvalidInputError } from "../error/InvalidInputError"


export class ImageModel {

    static readonly inputToImageDTO = (input: ImageInput, id: string, authorId: string): ImageDTO => {
        const { subtitle, file_path, file, collection } = input

        return {
            id,
            subtitle,
            creation_date: dayjs().format('YYYY-MM-DDTHH:mm:ss'),
            file_path,
            file,
            collection,
            author_id: authorId
        }
    }


    static readonly anyToImageInput = (image: any): ImageInput => {
        try {
            const { subtitle, file_path, file, collection, tags } = image

            return {
                subtitle,
                file_path,
                file,
                collection,
                tags
            }

        } catch (error) {
            throw new InvalidInputError(error.message)
        }

    }
}
