import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const corsOrigins = configService.get<string>('CORS_ORIGIN');

  app.enableCors({
    origin: corsOrigins.split(','), 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization',
  });

  const port = configService.get<number>('PORT') || 4300;

  await app.listen(port);
}
bootstrap();
