// Errors
import { ForbiddenAccessError } from "../../error/ForbiddenAccessError"
import { InvalidInputError } from "../../error/InvalidInputError"
import { NotFoundError } from "../../error/NotFoundError"
import { UnauthorizedError } from "../../error/UnauthorizedError"


export class ErrorHandler {
    public readonly throwCustomError = (code: number, message: string): void => {
        switch (code) {
            case 417:
                throw new InvalidInputError(message)
            case 404:
                throw new NotFoundError(message)
            case 403:
                throw new ForbiddenAccessError(message)
            case 401:
                throw new UnauthorizedError(message)
            default:
                throw new Error(message)
        }
    }
}