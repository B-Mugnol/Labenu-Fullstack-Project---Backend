export interface UserDTO {
    id: string,
    name: string,
    nickname: string,
    email: string,
    password: string,
    avatar: string
}

export interface UserInput {
    name: string,
    nickname: string,
    email: string,
    password: string,
    avatar: string
}