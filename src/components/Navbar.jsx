import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {

  const [isConnected, setIsConnected] = React.useState(false);
  const [account, setAccount] = React.useState('');
  //Connect Wallet
  async function connectWallet() {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0xaa36a7' }],
      })
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
        params: [
          {
            chainId: "0xaa36a7",
            chainName: "Sepolia",
            rpcUrls: ["https://sepolia.drpc.org"],
            blockExplorerUrls: ["https://sepolia.etherscan.io/"],
            nativeCurrency: {
              name: "Ethereum",
              symbol: "ETH",
              decimals: 18,
            },
          },
        ],
      });
      setIsConnected(true);
      const account = await accounts[0];
      setAccount(account);
  
      console.log(account);
    } catch (switchError) {
      if (switchError.code === 4902) {
        // try {
        //     await provider.request({
        //         method: 'wallet_addEthereumChain',
        //         params: [
        //             {
        //                 chainId: '0xaa36a7',
        //                 chainName: 'Sepolia',
        //                 rpcUrls: ['https://sepolia.drpc.org'],
        //                 blockExplorerUrls: ['https://sepolia.etherscan.io/'],
        //                 nativeCurrency: {
        //                     name: 'Ethereum',
        //                     symbol: 'ETH',
        //                     decimals: 18,
        //                 },
        //             },
        //         ],
        //     });
        // } catch (addError) {
        //     console.error(addError);
        // }
        alert("Please connect to the Sepolia Network");
    }
  }
}
  return (
    <header>
        <div className='logo'>
            <h2>WEB3.PRODUCT</h2>
        </div>
        <div className='navbar'>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/list-products">List Products</NavLink>
            <NavLink to="/add-products">Add Products</NavLink>
            <NavLink to="/transaction">Transaction History</NavLink>
        </div>
        <div>
            <button onClick={connectWallet} className='wallet'>{isConnected? `${account.slice(0,6)}...${account.slice(-4, -1)}`: 'Connect Wallet'}</button>
        </div>
    </header>
  )
}

export default Navbar