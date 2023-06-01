import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

//Этот Гуард будет вызыватся перед эндпоинтом и проверят есть ли в request'е //!session id
@Injectable()
export class AuthenticatedGuard implements CanActivate {
    //*метод canActivate возвращает bool значение, есть ли в запросе session_id
    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        
        //будем возвращать bool значение
        //*Так как мы зарегистрировали session через passport (в main.ts)
        return request.isAuthenticated();
    }
}
