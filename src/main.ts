import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session'
import * as passport from 'passport'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.use(session({
    secret: 'very_secret_keyword',
    resave: false,
    saveUninitialized: false,
    
  }))
  app.use(passport.initialize());
  app.use(passport.session());  //Регистрируем session через passport


  await app.listen(3000);
}
bootstrap();
