import { BaseError } from "./BaseError";

export class UnauthorizedError extends BaseError {
    constructor(
        message: string = "Não possui autorização" 
    ) {
        super(401, message)
    }
}
