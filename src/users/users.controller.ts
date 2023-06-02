import { Body, Controller, Get, Header, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto } from './dto/create-user.dt';
import { LocalAuthGuard } from 'src/auth/local.auth.guard';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';

@Controller('users')
export class UsersController {
    //*Пишем эндпоинты
    constructor(private readonly userService: UsersService){}   //задаём UsersService чтоб использовать его методы

    //!Метод createUser
    @Post('/signup')    //префикс "signup"  //*URL-(users/signup)
    @HttpCode(HttpStatus.CREATED)   //будем возвращать код состояния HTTP 201 Created.
    @Header('Content-type', 'application/json')   //устанавливает заголовок Content-Type со значением application/json
    createUser(@Body() createUserDto: createUserDto){   //*Достаём данные из Body (отправляя с фронта)
        return this.userService.create({    //*create- метод из класса UsersService
            ...createUserDto, // Распаковываем объект createUserDto
            role: createUserDto.role || 'USER', // Устанавливаем значение по умолчанию, если role не указано
        })   
    }

    //!Метод login
    @Post('/login')    //префикс "login"  //*URL-(users/login)
    @UseGuards(LocalAuthGuard) //!Когда мы будем делать логин, вызывется наш localAuthGuard
    @HttpCode(HttpStatus.OK)   //будем возвращать код состояния HTTP 200 OK.
    login(@Request() req) {   //*Достаём данные из Request (отправляя с фронта)
        //Если пользователь валидный
        return { user: req.user, msg: 'Logged in' }
    }

    //!Метод loginСheck
    @Get('/loginCheck')    //префикс "loginCheck"  //*URL-(users/loginCheck)
    @UseGuards(AuthenticatedGuard) //!Когда мы будем делать логин, вызывется наш AuthenticatedGuard
    loginCheck(@Request() req) {   //*Достаём данные из Request (отправляя с фронта)
        //Если пользователь залогинился
        return req.user;
    }

    //!Метод logout
    @Get('/logout')    //префикс "logout"  //*URL-(users/logout)
    logout(@Request() req) {   //*Достаём данные из Request (отправляя с фронта)
        //Уничтожаем сессию
        req.session.destroy();
        return {msg: 'Logged out, session has ended'};
    }
}
