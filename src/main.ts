import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';

async function bootstrap() {
  console.log(
    process.env['MONGODB_URI']
      .replace('<password>', process.env.MONGODB_PASSWORD)
      .replace('<database>', process.env.MONGODB_DATABASE),
  );
  const app = await NestFactory.create(AppModule);
  app.use(morgan('dev'));
  await app.listen(3000);
}

bootstrap().then(() => console.log('Server started at http://localhost:3000'));
