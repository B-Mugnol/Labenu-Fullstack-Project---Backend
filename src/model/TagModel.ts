// Entities
import { TagDTO } from "../business/entities/tagInterfaces"


export class TagModel {

    static readonly tagToTagDTO = (tag: string, id: string): TagDTO => {
        return {
            id,
            tag
        }
    }
}
