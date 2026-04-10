import { IsString, IsUUID } from "class-validator";

export class CreateWalletValidatorDto {
  @IsUUID('4', { message: 'userId must be a valid UUID v4' })
  userId!: string;
}

export class GetWalletVAlidatorDto {
  @IsUUID('4', { message: 'id must be a valid UUID v4' })
  id!: string;
}

export class CreditWalletValidatorDto {
  @IsUUID('4', { message: 'walletId must be a valid UUID v4' })
  walletId!: string;

  @IsUUID('4', { message: 'userId must be a valid UUID v4' })
  userId!: string;

  @IsString({ message: "amount must be a string" })
  amount!: string;
}

export class DebitWalletValidatorDto {
  @IsUUID('4', { message: 'walletId must be a valid UUID v4' })
  walletId!:string;

  @IsUUID('4', { message: 'userId must be a valid UUID v4' })
  userId!: string;

  @IsString({ message: "amount must be a string" })
  amount!: string;
}
