import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { ValidationPipe, VersioningType } from "@nestjs/common"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"

import * as packageJson from '../package.json';

// console.log('package.json', packageJson)

declare const module: any;

const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 3002;


async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())
  // app.setGlobalPrefix('api')
  app.enableVersioning({
    type: VersioningType.URI
  })

  app.enableCors({
    origin: true,
    credentials: true,
    maxAge: 1728000
  })

  app.useGlobalPipes(new ValidationPipe())

  if (ENV !== 'production') {
    const options = new DocumentBuilder()
      .setTitle(packageJson.name)
      .setDescription(packageJson.description)
      .setContact(packageJson.author, packageJson.homepage, packageJson.email)
      .setVersion(packageJson.version)
      .build()
    const document = SwaggerModule.createDocument(app, options)
    SwaggerModule.setup('api', app, document)
  }

  await app.listen(PORT)

  console.log("Server is running on:" + await app.getUrl())
}

bootstrap()