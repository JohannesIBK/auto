import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { validate } from "./config/configuration";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Config } from "./types/internal";
import { CarEntity, CustomerEntity, RentCarEntity } from "@/entity";
import { CustomerModule } from "./api/customer/customer.module";
import { CarModule } from "./api/car/car.module";
import { RentCarService } from "@/services/rent-car/rent-car.service";
import { RentCarModule } from "./api/rent-car/rent-car.module";

@Module({
  imports: [
    ConfigModule.forRoot({ cache: true, isGlobal: true, validate }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<Config, true>) => ({
        url: configService.get("DATABASE_URL"),
        type: "postgres",
        logging: true,
        synchronize: true,
        entities: [CarEntity, CustomerEntity, RentCarEntity],
      }),
    }),
    CustomerModule,
    CarModule,
    RentCarModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
