// Abstract class
import { CodedError } from "./CodedError"

export class NotFoundError extends CodedError {
    constructor(
        public message: string
    ) {
        super(message, 404)
    }
}
