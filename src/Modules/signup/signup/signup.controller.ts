import { Controller, Post, Body } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse } from '@nestjs/swagger';
import { SignupService } from './signup.service';
import { username } from './username.dto';

@Controller('signup')
export class SignupController {

    constructor(private readonly signUpService:SignupService ){}

    @Post('/createUser')
    @ApiBody({type:username})
    @ApiCreatedResponse({description:"User Registration"})
    createUser(@Body() userNameDto:username){
        console.log(userNameDto);
        return this.signUpService.createUser(userNameDto)
      
      }

}
