import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { ValidationPipe } from "@nestjs/common"
declare const module: any;


async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())
  app.setGlobalPrefix('api')
  await app.listen(3002)
  // if (module.hot) {
  //   module.hot.accept();
  //   module.hot.dispose(() => app.close());
  // }
  console.log("Server is running on:" + await app.getUrl())
}

bootstrap()