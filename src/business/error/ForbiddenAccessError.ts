import { CodedError } from "./CodedError";

export class ForbiddenAccessError extends CodedError {
    constructor(
        public message: string
    ) {
        super(message, 403)
    }
}