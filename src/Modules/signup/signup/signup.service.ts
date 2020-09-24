import { Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { username } from './username.dto';
import { user } from './user.interface';
import {Model} from 'mongoose'
import { EmailVerify } from 'src/Modules/common/EmailVerify.interface';
import * as bcrypt from 'bcrypt';
import {sign_up,show_stars, total_cards ,returnownedTokens } from '../../../../gameblock.js';


@Injectable()
export class SignupService {

    private obj_deployed_addresses = {
        gameContractAddress : '0x02BABFb7293c502A3BE6f3bfEbbd71bfB3B46eC9',
        nftContractAddress : '0x94E3AcDeed5780B002c1C141926f6605704c5ef8',
        starsContractAddress : '0x0A27A7370D14281152f7393Ed6bE963C2019F5fe',
      }


constructor(
    @InjectModel('user') private readonly user:Model<user>,
    @InjectModel('EmailVerify') private  readonly EmailVerify:Model<EmailVerify>
){}




// HashPassword Function

private async hashPassword(password:string,salt:string):Promise<string>{

    return bcrypt.hash(password,salt);

  }

// Create User Service starts here

async createUser(userNameDto:username)
   
{

  const user=new this.user()

  user.username=userNameDto.username,

  user.email=userNameDto.email,
  

  user.cards={ ROCK:[],PAPER:[],SCISSOR:[]},

  user.stars=0,

  user.userinBlockchain=false,

  user.publickey = userNameDto.publickey,

  user.lastupdated=new Date(),

  user.client_id="0",

  user.salt=await bcrypt.genSalt(),

  user.password=await this.hashPassword(userNameDto.password,user.salt)



  try 

  {

    let curruser = await this.user.collection.findOne({ username: userNameDto.username}) || 

    await this.user.collection.findOne({ email: userNameDto.email}) ||

    await this.user.collection.findOne({ publickey: userNameDto.publickey})

    if (curruser)
    {
      const arr=[]
      console.log("user with provided credentials already exist ");   
      var i=0

      while(i<3)

      {

        const user1 = userNameDto.username+Math.floor((Math.random() * 100) + 54)

        const userfind=await user.collection.findOne({ username: user1})

        if(userfind)

        {}

        else

        {

          arr.push(user1)

          i++

        }

      }

      if(await this.user.collection.findOne({ username: userNameDto.username}))

      return "Username is Unavailable " + (arr)

      else

      return "Email/Public key already exists."

    } 

    else{
     
      try{
             let flag = 0;
             const secondFunction = async () => 
             {
                const result = await sign_up(userNameDto.publickey,this.obj_deployed_addresses.gameContractAddress)
                console.log(result+" #@#@")
                if(result === 1)
                flag=1
             
              }
            
            try{
              
              // await sign_up(userNameDto.publickey,this.obj_deployed_addresses.gameContractAddress)
              //.then(value => flag=1);
              await secondFunction()
              
       
               
            
            }
            
            catch(err){
            
              flag=0;
            
            }

            console.log("flag is "+flag)
            if(flag == 1)
            
            {
              let arrofCards = await returnownedTokens(userNameDto.publickey)

              console.log(arrofCards)
              user.cards.ROCK.push(arrofCards[0],arrofCards[1],arrofCards[2])
              user.cards.PAPER.push(arrofCards[3],arrofCards[4],arrofCards[5])
              user.cards.SCISSOR.push(arrofCards[6],arrofCards[7],arrofCards[8])

             console.log(user.cards)
              user.stars = 10
  
              user.userinBlockchain = true;

              await user.save();
  
              return "User Registered Successfully";
            
            }
            
            else
            
            {
            
              return "not created"
            
            }

      
          }
      
          catch(Error){
      
            //console.error(Error);
      
            return `User not created + ${Error}`;
      
          }
    
        }

  
      } 

  
      catch (err) 

  
      {

  
        console.error(err)

  
      }

}

// Create User service ends here




}
