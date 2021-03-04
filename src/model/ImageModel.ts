// Services
import { Verify } from "../business/services/verify"


// Entities
import { ImageInput } from "../business/entities/couplingInterfaces"
import { ImageDTO } from "../business/entities/imageInterfaces"


export class ImageModel {

    // Transform ImageInput + generated id into ImageDTO
    static readonly inputToImageDTO = (input: ImageInput, id: string, authorId: string, verifier: Verify): ImageDTO => {
        const validKeys = ["subtitle", "file_path", "file", "collection"]
        const optionalKeys = ["file_path", "file"]
        verifier.objectKeys(input, validKeys, optionalKeys)

        const { subtitle, file_path, file, collection } = input

        verifier.string({ subtitle, file_path, collection })

        return {
            id,
            subtitle,
            creation_date: new Date().getTime(),
            file_path,
            file,
            collection,
            author_id: authorId
        }
    }

}