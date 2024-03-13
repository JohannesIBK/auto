import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Config } from "./types/internal";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  const config = app.get<ConfigService<Config, true>>(ConfigService);

  app.setGlobalPrefix("api");
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({ origin: ["http://localhost:4200"] });

  await app.listen(config.get("PORT"), "0.0.0.0");
}

bootstrap();
