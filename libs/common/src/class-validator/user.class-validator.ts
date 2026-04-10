import { IsString, IsUUID, IsEmail } from "class-validator";

export class CreateUserValidatorDto {
  @IsString({ message: "email must be a string" })
  @IsEmail({}, { message: "email must be a valid email" })
  email!: string;

  @IsString({ message: "name must be a string" })
  name!: string;
}

export class GetUserByIdValidatorDto {
  @IsUUID('4', { message: 'id must be a valid UUID v4' })
  id!: string;
}