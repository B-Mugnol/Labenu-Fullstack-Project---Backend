// Services



// Entities
import { ImageInput } from "../business/entities/couplingInterfaces"
import { ImageDTO } from "../business/entities/imageInterfaces"


export class ImageModel {

    // Transform ImageInput + generated id into ImageDTO
    static readonly inputToImageDTO = (input: ImageInput, id: string): ImageDTO => {
        const { subtitle, creation_date, file_path, file, collection, author_id } = input

        return {
            id,
            subtitle,
            creation_date,
            file_path,
            file,
            collection,
            author_id
        }
    }
    
}