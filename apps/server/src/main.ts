import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const config = new DocumentBuilder()
    .setTitle('Blog Server(Client)')
    .setDescription(`The Blog's Server API description`)
    .setVersion('1.0')
    // .addTag('Blog')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('server-api-docs', app, document)

  await app.listen(4001)
  console.log(`http://localhost:4001/server-api-docs`)
}
bootstrap()
