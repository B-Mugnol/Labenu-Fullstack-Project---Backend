import { CodedError } from "./CodedError";

export class InvalidInputError extends CodedError {
    constructor(
        public message: string
    ) {
        super(message, 417)
    }
}