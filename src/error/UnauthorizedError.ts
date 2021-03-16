// Abstract class
import { CodedError } from "./CodedError"

export class UnauthorizedError extends CodedError {
    constructor(
        public message: string
    ) {
        super(message, 401)
    }
}
