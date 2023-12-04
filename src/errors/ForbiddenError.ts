import { BaseError } from "./BaseError";

export class ForbiddenError extends BaseError {
    constructor(
        message: string = "Não possui credenciais suficientes" 
    ) {
        super(403, message)
    }
}
