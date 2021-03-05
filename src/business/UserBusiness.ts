// Database
import { UserDatabase } from "../data/UserDatabase"


// Services
import { ErrorHandler } from "./services/errorHandler"
import { HashManager } from "./services/hashManager"
import { IdManager } from "./services/idManager"
import { TokenManager } from "./services/tokenManager"
import { Verify } from "./services/verify"


// Models and Entities
import { UserModel } from "../model/UserModel"
import { UserDTO, UserInput } from "./entities/userInterfaces"
import { AccessData } from "./entities/authorization"


// Errors
import { InvalidInputError } from "../error/InvalidInputError"
import { NotFoundError } from "../error/NotFoundError"
import { UnauthorizedError } from "../error/UnauthorizedError"

export class UserBusiness {
    constructor(
        private userDatabase: UserDatabase,
        private idManager: IdManager,
        private hashManager: HashManager,
        private tokenManager: TokenManager,
        private verifier: Verify,
        private errorHandler: ErrorHandler
    ) { }

    public readonly createUser = async (user: UserInput): Promise<AccessData | void> => {
        try {
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
        } catch (error) {
            this.errorHandler.throwCustomError(error.code, error.message)
        }
    }


    public readonly login = async (email: string, password: string): Promise<AccessData | void> => {
        try {
            const databaseUser: UserDTO | undefined = await this.userDatabase.getByEmail(email)

            if (!databaseUser) {
                throw new NotFoundError("Email does not exist.")
            }

            if (!await this.hashManager.compare(password, databaseUser.password)) {
                throw new UnauthorizedError("Wrong password.")
            }

            return {
                id: databaseUser.id,
                token: this.tokenManager.generate({ 
                    id: databaseUser.id 
                })
            }

        } catch (error) {
            this.errorHandler.throwCustomError(error.code, error.message)
        }
    }

}