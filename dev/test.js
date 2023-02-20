const BlockChain = require('./BlockChain');

const bitcoin = new BlockChain();

const previousBlockHash = "akjohjsiodhosdhoahhjhsdskiojhiuju";
const currentBlockData = [
    {
        amount:10,
        sender: 'sahfohaohaohajhajhka',
        recipient:'hsdhjksdhkhlzzk'
    },
    {
        amount:15,
        sender: 'lklhjghdgssds',
        recipient:'reewtweryttuytiuyt'
    }
];


console.log(bitcoin.proofOfWork(previousBlockHash,currentBlockData));