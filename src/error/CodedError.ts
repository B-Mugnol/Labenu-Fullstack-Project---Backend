export abstract class CodedError extends Error {
    constructor(
        public message: string,
        public code: number = 400
    ) {
        super(message)
    }
}
