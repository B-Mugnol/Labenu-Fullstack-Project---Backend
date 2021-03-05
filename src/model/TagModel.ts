// Entities
import { TagDTO } from "../business/entities/tagInterfaces"


export class TagModel {

    // Transforms a tag + generated id into TagDTO
    static readonly tagToTagDTO = (tag: string, id: string): TagDTO => {
        return {
            id,
            tag
        }
    }
}