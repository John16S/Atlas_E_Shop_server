import { IsNotEmpty } from "class-validator";

export class createUserDto {
    @IsNotEmpty()
    readonly username: string;

    @IsNotEmpty()
    readonly password: string;
    
    @IsNotEmpty()
    readonly email: string;

    readonly role: string = 'USER'; // Установка значения по умолчанию
}