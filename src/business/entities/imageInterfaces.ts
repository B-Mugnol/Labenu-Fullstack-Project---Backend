export interface ImageDTO {
    id: string,
    subtitle: string,
    creation_date: number,
    file_path: string | null,
    file: Blob | null,
    collection: string,
    author_id: string
}