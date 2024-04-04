import { IsDefined, IsNotEmpty, IsNumber } from "class-validator";

export class CreateOrderDto {
    @IsNotEmpty()
    @IsNumber()
    price: number;
}
