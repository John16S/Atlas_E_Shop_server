import { Body, Controller, Header, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto } from './dto/create-user.dt';

@Controller('users')
export class UsersController {
    //*Пишем эндпоинты
    constructor(private readonly userService: UsersService){}   //задаём UsersService чтоб использовать его методы

    @Post('/signup')    //префикс "signup"  //*URL-(users/signup)
    @HttpCode(HttpStatus.CREATED)   //будем возвращать код состояния HTTP 201 Created.
    @Header('Content-type', 'application/json')   //устанавливает заголовок Content-Type со значением application/json

    createUser(@Body() createUserDto: createUserDto){   //*Достаём данные из Body (отправляя с фронта)
        return this.userService.create({    //*create- метод из класса UsersService
            ...createUserDto, // Распаковываем объект createUserDto
            role: createUserDto.role || 'USER', // Устанавливаем значение по умолчанию, если role не указано
        })   
    }
}
