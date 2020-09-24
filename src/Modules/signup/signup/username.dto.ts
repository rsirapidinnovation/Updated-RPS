import { IsNotEmpty } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class username{
@IsNotEmpty()
@ApiProperty({type: String , description: "username"})
username:string

@IsNotEmpty()
@ApiProperty({type: String , description: "email"})
email:string

@IsNotEmpty()
@ApiProperty({type: String , description: "publickey"})
publickey:string

@IsNotEmpty()
@ApiProperty({type: String , description: "password"})
password:string
    
}