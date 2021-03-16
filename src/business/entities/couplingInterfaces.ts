// Entities
import { ImageDTO } from "./imageInterfaces"


export interface allImageInfoDTO extends ImageDTO {
    tags: string[]
}

export interface ImageInput {
    subtitle: string,
    file_path: string | null,
    file: Blob | null,
    collection: string,
    tags: string[]
}
