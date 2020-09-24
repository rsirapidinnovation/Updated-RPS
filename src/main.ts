import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { env } from 'process';
import {ConfigService} from '@nestjs/config';
import {SwaggerModule,DocumentBuilder} from '@nestjs/swagger'


// Defining variable
declare const module:any;


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  console.log(process.env.PORT)

  if(module.hot){
    module.hot.accept();
    module.hot.dispose(() => app.close())
  }


  // Building Swagger Module
  const options = new DocumentBuilder()
  .setTitle('Roshambo-RPS')
  .setDescription('')
  .setVersion('1.0')
  .addTag('apps')
  .build();

  const document = SwaggerModule.createDocument(app,options);
  SwaggerModule.setup('api', app, document);
// Swagger ends here

await app.listen(process.env.PORT);

}



bootstrap();
