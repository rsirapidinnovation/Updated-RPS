const { Param } = require('@nestjs/common');
var TX = require('ethereumjs-tx');
const Web3 = require('web3')
//const web3 = new Web3('')
 const web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/e72daeeafa5f4e8cae0110b45fed3645"));


//Game interface
const interface =  [{"constant":true,"inputs":[],"name":"stars","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"setOwner","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"tokenID1","type":"uint256"},{"name":"tokenID2","type":"uint256"},{"name":"status","type":"bool"}],"name":"clearTokens","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"nft_add","type":"address"}],"name":"set_nft_address","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"player","type":"address"}],"name":"signup","outputs":[{"name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"player1","type":"address"},{"name":"player2","type":"address"},{"name":"token1","type":"uint256"},{"name":"token2","type":"uint256"}],"name":"play_game","outputs":[{"name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"value","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"token_add","type":"address"}],"name":"set_token_address","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"nft","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"manager","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"setValue","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_of","type":"address"}],"name":"TotalCards","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_of","type":"address"}],"name":"remainingScissor","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_of","type":"address"}],"name":"remainingPaper","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"card1","type":"uint256"},{"name":"card2","type":"uint256"}],"name":"decide","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":false,"inputs":[{"name":"_stars","type":"uint256"}],"name":"setStars","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_amount","type":"uint256"}],"name":"setToken","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"_of","type":"address"}],"name":"showStars","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_of","type":"address"},{"name":"_count","type":"uint256"}],"name":"block_stars","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"starCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"NoOfTokens","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"user","type":"address"},{"name":"tokenId","type":"uint256"}],"name":"cardDetails","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"_manager","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_of","type":"address"}],"name":"remainingRock","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]
var _interface = new web3.eth.Contract((interface) , '0x05A17730c403D669ee33aa94863978F62BF72eE9'); //deployed address 


//NFT interface
const interface_nft = [{"constant":true,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"name":"","type":"address"}],"payable":false,
"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_tokenId","type":"uint256"}],
"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,
"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"player","outputs":[{"name":"cardtype","type":"uint256"},
{"name":"value","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tokenId",
"outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"",
"type":"uint256"}],"name":"approval","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},
{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"playersTokenCount","outputs":[{"name":"","type":"uint256"}],
"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},
{"name":"_tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},
{"constant":true,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"name":"","type":"address"}],"payable":false,
"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],
"name":"ownToken","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,
"inputs":[{"name":"owner","type":"address"},{"name":"_tokenId","type":"uint256"}],"name":"burn","outputs":[],"payable":false,
"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_address","type":"address"},{"name":"typ","type":"uint256"},
{"name":"_totalcount","type":"bool"}],"name":"returnTokenCount","outputs":[{"name":"","type":"uint256"}],"payable":false,
"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"}],"name":"returnOwnedToken",
"outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"playeraddress",
"type":"address"},{"name":"cardtype","type":"uint256"},{"name":"_value","type":"uint256"}],"name":"createToken","outputs":[],
"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"tokenOwners",
"outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,
"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"tokenDetails","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"}],
"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"contractAddress","type":"address"}],
"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},
{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},
{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_approved","type":"address"},
{"indexed":true,"name":"_tokenId","type":"uint256"}],"name":"Approval","type":"event"}];
var _interact = new web3.eth.Contract((interface_nft) , '0xe80f87b93cB05d9e4D1b6461616932331a8E8CB4');


//Stars interface 
const interface_stars = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newaddress","type":"address"}],"name":"changeowner","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"request","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ownerAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_reduceSupply","type":"uint256"}],"name":"DecreaseSupply","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"balanceOwnerAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newSupply","type":"uint256"}],"name":"IncreaseSupply","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"inputs":[{"name":"_initialSupply","type":"uint256"},{"name":"gameContractAddress","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}]
var star = new web3.eth.Contract(interface_stars, '0x35Dc2bA7CF980d99825d0c96dBEDD345644Ba486');


//////////////////////////////////////////////////////////////////////////////////////////////////////////

const account1  = '0x273C249b8bE25a88aDe9ec182655Af6ae263C58a'
const account2  = '0xF7C17c02428CcC44a35725DfDe473cCA2c4393ff'
const account3  = '0xf158F22ec9ef60A64F83Cf2BD59F6b5554E9caC4'
const account4 = '0x63580a35A6B6Da5c13c1Bf9c62C51FbCe64c806F';




const privateKey1 = new  Buffer.from('d126dd29ecae53e923d3b59b2e4b8281b447bd18bd81dc4e9890fd559f1525fb' , 'hex');
const privateKey2 = new  Buffer.from('60d4a93d45c1b890b340db0fbc9ce48afedcee22f71433812828e5c8e8f7774c' , 'hex');
const privateKey3 = new  Buffer.from('1d74031771cabab38b07d31937bdcf279c712f0e2f358c1072bc0cf27898e004' , 'hex');
const privateKey4 = new Buffer.from('7958cb545ad3be8ad142a8f632c7c7cc5c8bc18bdd098f69998ee026e4fa525a' , 'hex');
const privatekeymine = new Buffer.from('f8e9cf0d026ae4b1eb8b38c717ba090a37576dbfa9dbd51e0f2542e12c573e57' , 'hex');

//transcation function for game
async function run_code(data){
        
        var count = await web3.eth.getTransactionCount(account1); //change here 

        var Price =  await web3.eth.getGasPrice();
        
       
        var txData = {

        nonce: web3.utils.toHex(count),
        

        gasLimit: web3.utils.toHex(2500000),
        
        gasPrice: web3.utils.toHex(Price * 1.40),
        
        to: '0x05A17730c403D669ee33aa94863978F62BF72eE9',                   //---> for game 
      // to: '0x35Dc2bA7CF980d99825d0c96dBEDD345644Ba486',                 //----->for nft     
       // to: '0xe80f87b93cB05d9e4D1b6461616932331a8E8CB4',                 //----->fir stars    
        from: account1, //change here 
        
        data: data
        
        };
                
        var run_code = new TX(txData, {'chain': 'rinkeby'});
        
       run_code.sign(privateKey); //change here 
        
        const serialisedrun_code =   run_code.serialize().toString('hex');
        
        const result = await  web3.eth.sendSignedTransaction('0x' + serialisedrun_code);
        console.log(result);
      
};




//interact with game functions 
async function nft(_nftAddress){
        try{
                var data = _interface.methods.set_nft_address(_nftAddress).encodeABI();
                run_code(data);
        }
        catch{
                throw{message: "ERROR: cann't set nft contract address"};
        }
        
}
async function set_ERC20_Contract_address(starContract_address){
        try{
                var data = _interface.methods.set_token_address(starContract_address).encodeABI();
                run_code(data);
        }
        catch{
                throw{message: "ERROR: cann't set token contract address"};
        }
         
}
async function setowner(owner_address){
        try{
                var data = _interface.methods.setOwner(owner_address).encodeABI();
                run_code(data);
        }
        catch{
                throw{message: "ERROR: cann't set owner address"};
        }
}
async function setstars(_stars){
        try{
                var data = _interface.methods.setStars(_stars).encodeABI();
                run_code(data);
        }
        catch{
                throw{message: "ERROR: cann't set star ammount"};
        }
         
}
async function setvalue(_value){
        try{
                var data = _interface.methods.setValue(_value).encodeABI();
                run_code(data);
        }
        catch{
                throw{message: "ERROR: cann't set value of each nft"};
        }
        
}
async function settoken(_amount){
        try{
                var data = await _interface.methods.setToken(_amount).encodeABI();
                run_code(data);
        }
        catch{
                throw{message: "ERROR: cann't set token ammount"};
        }
}
async function signUP(player , account , privateKey , deployedAddress){ //// takes 4 argumets for signup , account of player  
        try{
			    try
			    {																//// , account, private key to be used for transaction and game contract addresss
				var data = await _interface.methods.signUp(player).encodeABI(); 
				await runCode(data , account , privateKey , deployedAddress); 
				return 1
				}
				catch(e)
				{
					return 0
				}
				
        }
        catch{
                throw{message: "ERROR: cann't signup"};
        }
}
async function showstars(_of){   //
        try{
                var data = await _interface.methods.showStars(_of).call(); 
                //run_code(data);
                console.log(data);
                return data;
        }
        catch{
                throw{message: "ERROR: cann't show how many stars this address is holding "};
        }
}
async function totalcards( _of){
        try{
                var data = await _interface.methods.TotalCards(_of).call();
                //run_code(data);
                console.log(data);
                return data;
        }
        catch{
                throw{message: "ERROR: cann't show total cards this account is holding"};
        }
}
async function playGame( player1 ,player2 , token1 , token2 ){
        try{
                var data = await _interface.methods.play_game( player1, player2, token1 , token2).encodeABI();
                return run_code(data);
        }
        catch{
                throw{message: "ERROR: unable to process game"};
        }

}
async function cleartokens(token1 , token2 , status){
        try{
                var data = await _interface.methods.clearTokens( token1, token2, status).encodeABI();
                return run_code(data);
        }
        catch{
                throw{message: "ERROR: unable to clear tokens"};
        }


}
async function CardDetails(player , tokenId){
        try{
                var data= await _interface.methods.cardDetails(player , tokenId);
                console.log(data);
                return data;
        }
        catch{
                throw{message: "token doesn't exist"};

        }
}
async function remainingRock(_of){
        try{
                var data= await _interface.methods.remainingRock(player);
                console.log(data);
                return data;
        }
        catch{
                throw{message: "rock doesn't exist"};

        }   

}
async function    remainingPaper(_of){
        try{
                var data= await _interface.methods.remainingPaper(player);
                console.log(data);
                return data;
        }
        catch{
                throw{message: "rock doesn't exist"};

        }   

}

async function remainingscissor(_of){
        try{
                var data= await _interface.methods.remainingScissor(player);
                console.log(data);
                return data;
        }
        catch{
                throw{message: "rock doesn't exist"};

        }   

}



///////////////////////////////////////////////////////////////////nft functions//////////////////////////////////////////////////////////
     
      async function burn(tokenId , account , privateKey , deployedAddress){  ///burns the card , and card will no longer be accessible 
         try{
                 let cardDelete = await _interact.methods.burn(tokenId).encodeABI();
                runCode(cardDelete , account , privateKey , deployedAddress);
         }
          catch (e){
                throw{ message : "Token not burn"};
          }
       }
       
       async function details(tokeId){ ////argument : tokenID   returns: card type ie rock . paper or scissor and card value
        try{
                var cardType;
                cardType = await _interact.methods.tokenDetails(tokeId).call();
                //It will return both type and value both respectively 
                //transaction(trx);
                console.log(cardType);
                return (cardType);
        }
        catch (e) {
                 throw{ message : "Token details not given"};
        }
      }
      
      async function returnOwnedToken(_address){ //// argument : address   returns : array of Ids given account address is holding
        try{
                let tokenList = await _interact.methods.returnOwnedToken(_address).call();
                console.log(tokenList);
                return tokenList;
        }
        catch(e){
                throw{message : "Owner not returned"};
        }
      }
      
   
       async function ownerOf(tokeId){////argument : tokenId    returns: account address of the owner of given tokenID
         try{
                let cardOwner = await _interact.methods.ownerOf(tokeId).call();
				//transaction(trx);
				console.log(cardOwner);
                return cardOwner;
         }
         catch (e){
                throw{ message : "Does not return owner"};
         }
      }
      
      async function transfer(_address,tokeId , account , privateKey , deployedAddress){/////trasnfer token from self to other account
        try{
        var creation = await _interact.methods.createToken ('0x114dF342f9649f66E3e670bA29418b4693Fe3dA3' ,2 ,20 ).encodeABI();
       run_code(creation);
        }
        catch (e){
          throw{ message : "Token not created"};
        }
     }
     
    async function remove(){
       try{
        var cardDelete = await _interact.methods.burn('0x114dF342f9649f66E3e670bA29418b4693Fe3dA3',19).encodeABI();
        run_code(cardDelete);
       }
        catch (e){
          throw{ message : "Token not burn"};
        }
     }
     
    async function tokenCount(){
       try{
        var count = await _interact.methods.returnTokenCount('0xf158F22ec9ef60A64F83Cf2BD59F6b5554E9caC4', 1,true).call();
        //transaction(trx);
        return count;
       }
       catch(e){
         throw{ message : "Token count not return"};
       }
     }
     
    async function details(){
       try{
        var cardType;
        cardType = await _interact.methods.tokenDetails(31).call();
        //It will return both type and value both respectively
        //transaction(trx);
        console.log(cardType);
        return (cardType,cardValue);
       }
       catch(e){
         throw{ message : "Token details not given"};
       }
     }
     
     async function owner(){
       try{
        var cardOwner = await _interact.methods.ownerOf(1).call();
        //transaction(trx);
        return cardOwner;
       }
       catch (e){
         throw{ message : "Does not return owner"};
       }
    }
    

async function Transfer(_to,value, account , privateKey , deployedAddress){ ///transfer stars from self to other
	try{
                var data = await star.methods.transfer(_to,value).encodeABI();
                runCode(data , account , privateKey , deployedAddress);
        }catch(err){
	        throw{ message : "ERROR : Token not transferred using transfer"};
}
}


//nft('0xe80f87b93cB05d9e4D1b6461616932331a8E8CB4');
//set_ERC20_Contract_address('0x35Dc2bA7CF980d99825d0c96dBEDD345644Ba486');
//setowner('0x05A17730c403D669ee33aa94863978F62BF72eE9');
//setstars(10);
//settoken(3);
//setvalue(40);
var sign_UP =  (address) =>  signUP(address);

var show_Stars = (account) =>  showstars(account);

var total_cards = (account) =>  totalcards(account);

//sign_UP('0x32F6DaA9600Ca367f39FC05Ce213F3D5689B9eB1');

//show_Stars('0x32F6DaA9600Ca367f39FC05Ce213F3D5689B9eB1')



///////////////////////////////////////////////////////////////////////call functions here////////////////////////////////////////////////

//setNftAddress(nftContractAddress , account1 , privateKey1 , gameContractAddress);
//setERC20Contractaddress(starsContractAddress , account1 , privateKey1 , gameContractAddress);
//setOwner(gameContractAddress , account1 , privateKey1 , gameContractAddress);
//setStars(10 , account1 , privateKey1 , gameContractAddress);
//setToken(3 , account1 , privateKey1 , gameContractAddress);
//setValue(40 , account1 , privateKey1 , gameContractAddress);
//signUP('0x5e281d6b288b57613F206bc94d036E7D16a732F9' , account1 , privateKey1 , gameContractAddress);
//showStars(account1 , account1 , privateKey1  , gameContractAddress);
//totalCards(account1 , account1 , privateKey1 , gameContractAddress);

//returnOwnedToken('0xD242b543d61b707162D3A18Cc44160050f23318C' , account1 , privateKey1 , nftContractAddress);
//cardDetails(account1 , 5  , account1 , privateKey1  , gameContractAddress);
//details(5 , account1 , privateKey1 , nftContractAddress);
//transfer(gameContractAddress, 5 , account1 , privateKey1 , nftContractAddress);
//owner(5 , account1 , privateKey1 , nftContractAddress);
//clearTokens(5  , 0 , false , account1 , privateKey1, gameContractAddress);



var sign_up = async function(address,gameContractAddress) { return await signUP(address,account1,privateKey1,gameContractAddress); }
var  show_stars = async function(address) { await showStars(address);}
var total_cards = async function (address) { await totalCards(address); }
var returnownedTokens = async function(playerAddress) { return await returnOwnedToken(playerAddress) }
var detailOfCard = async function(tokenId) { return await details(tokenId)}
var ownerof = async function(tokenId) { return await ownerOf(tokenId)}
var Transfer =async function(_to,value,gameContractAddress) { await Transfer(_to,value,account1,privateKey1,gameContractAddress)}
var burn = async function(tokenId,gameContractAddress) {  await burn(tokenId,account1,privateKey1,gameContractAddress)}

module.exports = {
        sign_up:sign_up,
        show_stars:show_stars,
        total_cards:total_cards,
		returnownedTokens:returnownedTokens,
		detailOfCard:detailOfCard,
		ownerof:ownerof,
		Transfer:Transfer,
		burn:burn
}
// details(392);
// const rescard = aawait details(392);
// console.log(rescard[0]+"   "+rescard[1])
// ownerOf(392)

// details(501);

//burn(501,"0x3A6c34D81cc09e12fB7f62CA2E7cd7d2f08BcD92",privatekeymine,nftContractAddress)

// Transfer("0x3A6c34D81cc09e12fB7f62CA2E7cd7d2f08BcD92",5,account1,privateKey1,starsContractAddress)
// Transfer('0xfD21dd58A3842eC823830EbDb08293b963086506',3,account1,privateKey1,starsContractAddress);