import { IsDefined, Length, MaxLength, MinLength, ValidationArguments } from "class-validator";

export class User {
    id?: number;

    @Length(3, 15)
    name?: string;

    @Length(3, 30)
    password?: string;
}

export class UserFilterParams {
    @IsDefined({
        message: (args: ValidationArguments) => {
            return `${args.property} is not defined`;
        }
    })
    @MinLength(1, {
        message: (args: ValidationArguments) => {
            if (!args.value) return '';
            return `Too short, minimum length is $constraint1 character`;
        }
    })
    @MaxLength(15, {
        message: (args: ValidationArguments) => {
            if (!args.value) return '';
            return `Too long, maximum length is $constraint1 character`;
        }
    })
    name: string = '';
}