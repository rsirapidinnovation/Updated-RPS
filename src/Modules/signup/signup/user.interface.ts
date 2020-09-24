import * as mongoose from 'mongoose';
import  {cards} from '../../common/cards.interface';


export interface user extends mongoose.Document{
    username:string

    email:string

    cards:cards

    usedCards:Array<Number>
    
    notUsedCards:Array<Number>

    stars:number

    publickey:string

    lastupdated:Date

    userinBlockchain:Boolean

    client_id:string

    salt:string

    password:string

    role: string
}