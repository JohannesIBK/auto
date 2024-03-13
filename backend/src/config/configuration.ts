import { IsNumber, IsOptional, IsString, validateSync } from "class-validator";
import { Config } from "../types/internal";
import { plainToClass } from "class-transformer";

class ConfigurationValidation {
  @IsOptional()
  @IsNumber()
  PORT: number;
  @IsString()
  DATABASE_URL: string;
}

export function validate(config: Record<string, any>): Config {
  const validatedConfig = plainToClass(ConfigurationValidation, config, { enableImplicitConversion: true });
  const errors = validateSync(validatedConfig, { skipMissingProperties: false });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return {
    ...validatedConfig,
    PORT: validatedConfig.PORT ?? 3000,
  };
}
