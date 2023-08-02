import './App.css';
import drive from "./artifacts/contracts/Drive.sol/Drive.json"
import { ethers } from 'ethers';
import {useState,useEffect} from "react";
import FileUpload from './components/FileUpload';
import Display from './components/Display';
import Modal from './components/Modal';

function App() {
  const [account,setAccount] = useState("");
  const [contract,setContract] = useState(null);
  const [provider,setProvider] = useState(null);
  const [modalOpen,setModalOpen] = useState(null)

  useEffect(()=>{
    const loadBlockchainData = async()=>{
        try {
          if(window.ethereum){
            const account = await window.ethereum.request({
              method : "eth_requestAccounts",
            });
            const currAccount = account[0];
            console.log(currAccount+"account");
            setAccount(currAccount);
            window.ethereum.on("accountsChanged",(newAccounts)=>{
              setAccount(newAccounts[0]);
              window.location.reload();
            })

            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            setProvider(provider);
            
            const contract = new ethers.Contract(
              "0x618B240dFE063D2ab59979d32C9Bc2feC2A07fDB",
              drive.abi,
              signer
            )
            setContract(contract);
            console.log("Contract Object:", contract);
          }
          else{
            console.log("Please install metamask or a web3 wallet")
          }
        } catch (error) {
          console.log("Error in loading blockchain data",error)
        }
    }
    loadBlockchainData();
  },[])
  return (
    <>
    {!modalOpen && (<button className='share' onClick={()=>{setModalOpen(true)}}>Share</button>)}
      {modalOpen && (<Modal setModalOpen={setModalOpen} contract={contract}/>)}
    <div className="App">
      <h1 style={{color:"white" , fontFamily:"monospace" }}>ImageSafe</h1>
      <div class="bg"></div>
      <div class="bg bg2"></div>
      <div class="bg bg3"></div>
      <p style={{color:"white" , fontWeight:"900" , fontSize:"20px"}}
      >ACCOUNT ADDRESS: {account? account:"No account connected"}
      </p>
      <FileUpload account={account} contract={contract} provider={provider}/>
      <Display account={account} contract={contract}/>
    </div>
    </>
  );
}

export default App;
