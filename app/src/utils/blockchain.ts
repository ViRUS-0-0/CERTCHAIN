import 'react-native-get-random-values';
import { ethers } from 'ethers';
import { RPC_URL, CONTRACT_ADDRESS, DEV_PRIVATE_KEY } from '../constants';

// We import the ABI that was copied from the frontend
const ABI = require('../abi/CertChain.json');

/**
 * Returns a JsonRpcProvider connected to the local default RPC.
 */
export const getProvider = () => {
  return new ethers.JsonRpcProvider(RPC_URL);
};

/**
 * Returns a Wallet signer using the default dev private key connected to local RPC.
 * (For local testing only. In production, mobile wallets utilize WalletConnect/deep links).
 */
export const getDevSigner = () => {
  const provider = getProvider();
  return new ethers.Wallet(DEV_PRIVATE_KEY, provider);
};

/**
 * Get the main contract instance.
 */
export const getContract = (signerOrProvider: ethers.Signer | ethers.Provider) => {
  return new ethers.Contract(CONTRACT_ADDRESS, ABI, signerOrProvider);
};

export interface CertData {
  studentName: string;
  regNo: string;
  degree: string;
  institution: string;
  issueDate: string;
}

/**
 * Issue a certificate on-chain mimicking frontend logic.
 */
export const issueCert = async (certData: CertData) => {
  const signer = getDevSigner();
  const contract = getContract(signer);
  
  const certId = `${certData.regNo}_${Date.now()}`;

  // Call the issue function
  const tx = await contract.issue(
    certId,
    certData.studentName,
    certData.regNo,
    certData.degree,
    certData.institution,
    certData.issueDate
  );

  await tx.wait();

  return {
    certId,
    txHash: tx.hash,
  };
};

/**
 * Verify a certificate on-chain.
 */
export const verifyCert = async (certId: string) => {
  const provider = getProvider();
  const contract = getContract(provider);
  const result = await contract.verify(certId);

  return {
    exists: result[0],
    studentName: result[1],
    regNo: result[2],
    degree: result[3],
    institution: result[4],
    issueDate: result[5],
    issuedBy: result[6],
    timestamp: Number(result[7]),
  };
};

/**
 * Fetch the last 10 issued certificates.
 */
export const fetchRecentCerts = async () => {
  const provider = getProvider();
  const contract = getContract(provider);

  const filter = contract.filters.Issued();
  // Fetch from the latest block to make dev fetching robust
  const events = await contract.queryFilter(filter, 0, 'latest');

  const certs = [];
  // Take last 10 events
  for (const event of events.slice(-10).reverse()) {
    const args = (event as any).args;
    if (!args) continue;

    const certId = args[0];
    const issuedBy = args[1];

    try {
      const result = await contract.verify(certId);
      certs.push({
        certId,
        studentName: result[1],
        degree: result[3],
        institution: result[4],
        issueDate: result[5],
        issuedBy,
        timestamp: Number(result[7]),
        txHash: event.transactionHash,
      });
    } catch (e) {
      console.warn('Failed to fetch cert:', certId, e);
    }
  }

  return certs;
};
