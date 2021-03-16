// Entities
import { UserDTO, UserInput } from "../business/entities/userInterfaces"


export class UserModel {

    static readonly inputToUserDTO = (user: UserInput, id: string): UserDTO => {
        const { name, nickname, email, password, avatar } = user
        return {
            id,
            name,
            nickname,
            email,
            password,
            avatar
        }
    }


    static readonly anyToUserInput = (user: any): UserInput => {
        const { name, nickname, email, password, avatar } = user

        return {
            name,
            nickname,
            email,
            password,
            avatar
        }
    }
}
