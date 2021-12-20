import { ValidationError } from "class-validator";

export namespace Utils {
    export const getErrorMessages = (errors: ValidationError[]) => {
        const errorsMessages = errors.map(item => {
            return !!item.constraints
                && Object.values(item.constraints).filter(item => item.length)
        });
        return errorsMessages;
    }
}