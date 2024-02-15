import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as morgan from 'morgan'
import { ValidationPipe } from '@nestjs/common'
import helmet from 'helmet'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.use(helmet())
  app.use(morgan('dev'))
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  await app.listen(3000)
}

bootstrap().then(() => console.log('Server started at http://localhost:3000'))
