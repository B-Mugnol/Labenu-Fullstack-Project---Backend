// Services
import { Verify } from "../business/services/verify"


// Entities
import { UserDTO, UserInput } from "../business/entities/userInterfaces"


export class UserModel {

    // Transform UserInput + generated id into UserDTO.
    static inputToUserDTO = (user: UserInput, id: string): UserDTO => {
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


    // Attempt to create an UserInput, throws error if not possible
    static anyToUserInput = (user: any, verify: Verify): UserInput => {
        const validKeys = ["name", "nickname", "email", "password", "avatar"]
        verify.objectKeys(user, validKeys)

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