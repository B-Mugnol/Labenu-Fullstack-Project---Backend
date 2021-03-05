export interface ImageDTO {
    id: string,
    subtitle: string,
    creation_date: string,
    file_path: string | null,
    file: Blob | null,
    collection: string,
    author_id: string
}