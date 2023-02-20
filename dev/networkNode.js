const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const BlockChain = require('./BlockChain');
const bitcoin = new BlockChain();
const {v4: uuidv4} = require('uuid');
const nodeAddres = uuidv4().split('-').join('');
const port = process.argv[2];


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false})),

//this will give as complete BlockChain//
app.get('/block', function (req, res) {
  res.send(bitcoin)
});

//this is for Creating Transaction//
app.post('/transaction', function (req, res) {
 const blockIndex = bitcoin.CreateNewTransaction(req.body.amount,req.body.sender,req.body.recipient);
 res.json({note: `This transaction will be add in next ${blockIndex}`});
});

//this is for Mine//
app.get('/mine' ,function(req,res){
  const lastBlock = bitcoin.GetlastBlock();
  const previousBlockHash = lastBlock['hash'];

  const currentBlockData = {
    transaction: bitcoin.pandingTransaction,
    index: lastBlock['index'] + 1
  }

  const nonce = bitcoin.proofOfWork(previousBlockHash, currentBlockData);

  const blockhash = bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce);

  bitcoin.CreateNewTransaction(23, "0000000", nodeAddres);

  const newBlock = bitcoin.CreateNewBlock(nonce, previousBlockHash, blockhash);
  res.json({
    note: "this is a new block",
    block: newBlock
  });
});

//For wallet//
app.get('/wallet', function (req, res) {
  res.sendFile(__dirname + "/index.html")
});

app.post('/wallet', function (req, res) {
  const blockIndex = bitcoin.CreateNewTransaction(req.body.amount,req.body.senderAddress,req.body.recipientAddress);
  res.json({note: `This transaction will be add in next ${blockIndex}`});
 });

 //this code is use for registering a node and broadcast it to the network//
app.post('/register-and-broadcast-node',function(req,res){

});

//this cod will register a new nodes that will be conicted//
app.post('/register-node',function(req,res){

});

//this will register multipule nodes//
app.post('/register-node-bulk',function(req,res){
  
});

app.listen(port, function () {
  console.log(`the server is runing on ${port}....`);
});

