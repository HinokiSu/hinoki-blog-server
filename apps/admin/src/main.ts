import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AdminModule } from './admin.module'

async function bootstrap() {
  const app = await NestFactory.create(AdminModule)

  const config = new DocumentBuilder()
    .setTitle('Admin CMS')
    .setDescription(`The Blog's Admin API description`)
    .setVersion('1.0')
    // .addTag('Blog')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api-docs', app, document)

  await app.listen(4000)
  console.log(`http://localhost:4000/api-docs`)
}
bootstrap()
