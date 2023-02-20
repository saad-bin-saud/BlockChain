const sha256 = require('sha256');
const currentNodeUrl = process.argv[3];


function BlockChain() {
    this.chain = [];
    this.pandingTransaction = [];
    this.CreateNewBlock(786,'GebesisBlock','FirstBlock');
    this.currentNodeUrl = currentNodeUrl;
    this.network = [];
}

BlockChain.prototype.CreateNewBlock = function(nonce,prevBlockHash,hash){
    const newBlock = {
        index:this.chain.length+1,
        timestamp:Date.now(),
        transaction: this.pandingTransaction,
        nonce: nonce,
        prevBlockHash:prevBlockHash,
        hash: hash,
     };
     this.pandingTransaction = [];
     this.chain.push(newBlock);

     return newBlock;
 }

 BlockChain.prototype.GetlastBlock = function (){
    return this.chain[this.chain.length - 1];
 }

BlockChain.prototype.CreateNewTransaction = function (amount,sender,recipient){
    const NewTransaction = {
        amount: amount,
        sender: sender,
        recipient: recipient
    }
    this.pandingTransaction.push(NewTransaction);
    return this.GetlastBlock()['index'] +1;
}

BlockChain.prototype.hashBlock = function(previousBlockHash,currentBlockData,nonce){
    const dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
    const hash = sha256(dataAsString);
    return hash;
}

BlockChain.prototype.proofOfWork = function(prevBlockHash,currentBlockData){
    let nonce = 0;
    let hash = this.hashBlock(prevBlockHash,currentBlockData,nonce);

    while(hash.substring(0,4) !== '0000'){
        nonce++;
        hash = this.hashBlock(prevBlockHash,currentBlockData,nonce)
    }
    return nonce;
}
 module.exports = BlockChain;
 