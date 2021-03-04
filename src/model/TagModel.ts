// Services
import { Verify } from "../business/services/verify"


// Entities
import { TagDTO } from "../business/entities/tagInterfaces"



export class TagModel {

    // Transforms a tag + generated id into TagDTO
    static readonly tagToTagDTO = (tag: string, id: string, verifier: Verify): TagDTO => {
        verifier.string(tag)
        verifier.hashtag(tag)

        return {
            id,
            tag
        }
    }
    
}