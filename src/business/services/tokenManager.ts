// External Library
import * as jwt from "jsonwebtoken"


// Interface
import { AuthenticationData } from '../entities/AuthenticationData'


export class TokenManager {
    public generate = (input: AuthenticationData): string => {
        const token: string = jwt.sign(
            {
                id: input.id
            },
            process.env.JWT_KEY as string,
            { expiresIn: process.env.JWT_EXPIRE_TIME }
        )

        return token
    }
    public tokenData = (token: string): AuthenticationData => {
        const { id } = jwt.verify(token, process.env.JWT_KEY!) as AuthenticationData

        return { id }
    }
}

