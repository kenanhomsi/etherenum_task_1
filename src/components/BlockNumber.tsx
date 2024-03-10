import { useState, useEffect } from 'react';
import Web3 from 'web3';

const BlockNumber = () => {
  const [latestBlock, setLatestBlock] = useState<number >(0);
  const [targetAddress, settargetAddress] = useState<string>('0x808d0aeE8db7E7c74FaF4b264333aFE8c9cCDBA4');
  const [fbalance, setfBalance] = useState();
  const [DoIt,setDoIt]=useState<boolean>(false);
useEffect(()=>{
  async function getLastBlockNumber() {
    try{
      const web3 = new Web3('https://mainnet.infura.io/v3/52a18d8ed24747c3b3c28af5eefafe2b');
      const latestBlockNumber = await web3.eth.getBlockNumber();
    setLatestBlock(parseInt(latestBlockNumber));
    }catch(err){
      console.log(err);
    }
}
async function getUSDTBalance(address: string) {
  const contractAddress = '0xdac17f958d2ee523a2206206994597c13d831ec7';
  const web3 = new Web3('https://mainnet.infura.io/v3/52a18d8ed24747c3b3c28af5eefafe2b');

  const usdtContract = new web3.eth.Contract(
    [
      {
          "constant": true,
          "inputs": [
              {
                  "name": "_owner",
                  "type": "address"
              }
          ],
          "name": "balanceOf",
          "outputs": [
              {
                  "name": "balance",
                  "type": "uint256"
              }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
      }
  ],
      contractAddress
  );

  const balance = await usdtContract.methods.balanceOf(address).call();
  
  setfBalance(balance.toString());
}

getUSDTBalance(targetAddress);

getLastBlockNumber();
setDoIt(false);
},[ DoIt === true])
 

  return(
    <>
    <div>Latest Ethereum block number: <span>{latestBlock}</span></div>
    <h3>Enter Ethereum address</h3>
    <input type="text" placeholder=" 0x808d0aeE8db7E7c74FaF4b264333aFE8c9cCDBA4" onChange={(e) => settargetAddress(e.target.value)} />
      <button onClick={()=>setDoIt(true)}>Get USDT Balance</button>
      {fbalance && <div>USDT balance   is = {fbalance}</div>}
    </>
  )
};

export default BlockNumber;