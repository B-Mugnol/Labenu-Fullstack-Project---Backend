// Services
import { Verify } from "../business/services/verify"


// Entities
import { UserDTO, UserInput } from "../business/entities/userInterfaces"


export class UserModel {

    // Transform UserInput + generated id into UserDTO.
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


    // Attempt to create an UserInput, throws error if not possible
    static readonly anyToUserInput = (user: any, verifier: Verify): UserInput => {
        const validKeys = ["name", "nickname", "email", "password", "avatar"]
        verifier.objectKeys(user, validKeys)
        
        verifier.string(user) // Verifies if all fields are of the correct type: string

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