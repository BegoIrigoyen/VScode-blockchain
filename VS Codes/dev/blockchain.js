//this file is our blockchain data structure
//pascal case = lower first, upper each word with no spaces
//camel case = BegoIrigoyen
//kebob-case = bego-irigoyen
//sanek_case = bego_irigoyen

const sha256 = require("js-sha256"); //la funcion "require" sería el equivalente a copiar y pegar el código


//this is a 'constructor' function...data object 
function Blockchain() {
    this.chain = []; //initialize the chain to an empty array. We will store all of our blocks here. 
    this.newTransactions = []; //hold all the new t/x before they are "mined" into a block 
    this.createNewBlock(100,"0","0"); //GENESIS BLOCK. Bloque inicial
};
Blockchain.prototype.createNewBlock = function(nonce, previousBlockHash, hash) {
    //all of these terms will  soon be revealed
    const newBlock = {
        index: this.chain.length + 1,
        //what block is this in our chain. first, or 1000th? 
        timestamp: Date.now(),
        transactions: this.newTransactions,
        //all of the transaction in this block
        nonce: nonce,
        //a nonce is a number only used once (2, 10, 1232349). this is the PROOF that we actually created a legit. block 
        hash: hash,
        //this data from our new block.
        previousBlockHash: previousBlockHash
            //data from our current block hashed into a string
    };
    this.newTransactions = [];
    //clears out any newTransactions
    this.chain.push(newBlock);
    //add the newBlock the the chain 
    return newBlock;
}
Blockchain.prototype.getLastBlock = function() {
    return this.chain[this.chain.length - 1];
}
Blockchain.prototype.createNewTransaction = function(amount, sender, recipient) {
    //create a newTransaction object
    const newTransaction = {
        amount: amount,
        sender: sender,
        recipient: recipient
    };
    //add the newTransaction to the newTransaction data area
    this.newTransactions.push(newTransaction);

    return this.getLastBlock()['index'] + 1;
    //get the index of the last block of our chain plus one, for a new block. 
}

Blockchain.prototype.hashBlock = function(previousBlockHash, currentBlockData, nonce){
    //what does this method do? take the blockData ==> some hash result
    const dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData); //"stringify" nombre de la función de la librería que se está usando

    //pass all of our data as a string into our new, coll js-sha256 library/package/dependency
    const hash = sha256(dataAsString);
    return hash; 
}

Blockchain.prototype.proofOfWork = function(previousBlockHash,currentBlockData){
    //brute force, increment nonce & run the hash until we are happy (happy= hash satisfies the business)
    //usamos "let" cuando la variable va a cambiar mucho
    let nonce = 0; //start at zero 
    //create a hash running the hashBlock() method with our default nonce of zero
    let hash = this.hashBlock(previousBlockHash,currentBlockData,nonce);
    //execute the code {...} while this condition is true. Si no se define correctamente entra en un loop infinito
        // in javaScript language:
        //= means to assign a value
        //== comparison. result: true or false
        //!== not equal. result: true or false
        //=== means do they equal and are the same DATA TYPE
    
    while(hash.substring(0,4) !== "0000"){
        nonce++; //nonce + nonce == (nonce = nonce +1)
        hash = this.hashBlock(previousBlockHash,currentBlockData,nonce);
    }
    return nonce;
};

module.exports = Blockchain;
