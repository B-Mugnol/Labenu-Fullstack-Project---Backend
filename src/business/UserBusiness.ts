// Database
import { UserDatabase } from "../data/UserDatabase"


// Services
import { HashManager } from "./services/hashManager"
import { IdManager } from "./services/idManager"
import { TokenManager } from "./services/tokenManager"
import { Verify } from "./services/verify"


// Models and Entities
import { UserModel } from "../model/UserModel"
import { UserInput } from "./entities/userInterfaces"
import { AccessData } from "./entities/authorization"

export class UserBusiness {
    constructor(
        private userDatabase: UserDatabase,
        private idManager: IdManager,
        private hashManager: HashManager,
        private tokenManager: TokenManager,
        private verifier: Verify
    ) { }

    public createUser = async (user: UserInput): Promise<AccessData> => {
        // Validations (empty field validation done in Controller layer):
        this.verifier.email(user.email) // Throws error if not an email
        this.verifier.length(user.password, "Password", 7) // Verifies password length >= 7


        const userId: string = this.idManager.generate()
        const hashedPassword: string = await this.hashManager.generate(user.password)

        await this.userDatabase.create(
            UserModel.inputToUserDTO(
                {
                    ...user,
                    password: hashedPassword
                },
                userId))


        const accessData: AccessData = {
            id: userId,
            token: this.tokenManager.generate({ id: userId })
        }

        return accessData
    }
}