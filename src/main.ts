import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Mini CRM Backend')
    .setDescription('API Documentation for Prysm Labs Backend Assignment')
    .setVersion('1.0')
    .addBearerAuth() // for JWT-protected routes
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Swagger UI at http://localhost:3000/api

  await app.listen(3000);
}
bootstrap();
