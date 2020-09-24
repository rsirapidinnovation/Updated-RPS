import { Module } from '@nestjs/common';
import { SignupController } from './signup/signup.controller';
import { SignupService } from './signup/signup.service';
import { CommonModule } from '../common/common.module';
import { MongooseModule } from '@nestjs/mongoose';
import { user } from 'src/Schema/user.model';
import { EmailVerify } from 'src/Schema/EmailVerify.model';

@Module({
  imports:[
    CommonModule,
    MongooseModule.forFeature([{name:'user',schema:user},{name:'EmailVerify',schema:EmailVerify}])
  ],
  controllers: [SignupController],
  providers: [SignupService]
})
export class SignupModule {}
