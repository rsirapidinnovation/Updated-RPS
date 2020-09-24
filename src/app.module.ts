import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule,ConfigService} from '@nestjs/config';
import {join} from 'path'; // This is used to make path independent of system
import { CommonModule } from './modules/common/common.module';
import { SignupModule } from './modules/signup/signup.module';
// import { SignupController } from './signup/signup/signup.controller';
import configuration from './config/configuration';
import {MongooseModule} from '@nestjs/mongoose'





@Module({
  imports: [

    //adding config module to the 

    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:[ join(__dirname, "/Environment","/development.env").split('dist').join('').replace(/\\/g, "//"), join(__dirname, "/Environment","/.env").split('dist').join('').replace(/\\/g, "//"),],
      load:[configuration]
    }),
//  Importing Mongoose Module
     MongooseModule.forRootAsync

     ({
 
       useFactory: (configService: ConfigService) =>
 
       ({
         uri:configService.get<string>('URL')
 
       }),
 
       inject: [ConfigService],
 
     }),
    CommonModule,
    SignupModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
