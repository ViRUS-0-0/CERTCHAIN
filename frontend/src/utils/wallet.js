import { ethers } from 'ethers';

/**
 * Connect to MetaMask wallet.
 * Returns { provider, signer, account }
 */
export async function connectWallet() {
  if (!window.ethereum) {
    throw new Error(
      'MetaMask is not installed. Please install MetaMask to use this feature.'
    );
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const accounts = await provider.send('eth_requestAccounts', []);
  const signer = await provider.getSigner();

  return {
    provider,
    signer,
    account: accounts[0],
  };
}
