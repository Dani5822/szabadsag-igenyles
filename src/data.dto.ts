import { IsDate, IsDefined, IsOptional, IsString, Matches } from "class-validator";


export class Data{

    name: string;

    start:string;

    end:string;

    paid:string;

    id:string;
  
    reason:string;
}