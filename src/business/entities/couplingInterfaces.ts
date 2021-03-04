// Entities
import { ImageDTO } from "./imageInterfaces"

export interface allImageInfoDTO extends ImageDTO {
    tags: string[]
}

export interface ImageInput {
    subtitle: string,
    creation_date: number,
    file_path: string | null,
    file: Blob | null,
    collection: string,
    author_id: string,
    tags: string[]
}