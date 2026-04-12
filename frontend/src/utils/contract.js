import { ethers } from 'ethers';
import ABI from '../abi/CertChain.json';
import addressData from '../abi/address.json';

const CONTRACT_ADDRESS = addressData.address;

/**
 * Get a contract instance.
 * @param {ethers.Signer|ethers.Provider} signerOrProvider
 */
function getContract(signerOrProvider) {
  return new ethers.Contract(CONTRACT_ADDRESS, ABI, signerOrProvider);
}

/**
 * Issue a certificate on-chain.
 * @param {ethers.Signer} signer
 * @param {Object} certData - { studentName, regNo, degree, institution, issueDate }
 * @returns {{ certId: string, txHash: string }}
 */
export async function issueCert(signer, certData) {
  const contract = getContract(signer);
  const certId = certData.regNo + '_' + Date.now();

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
}

/**
 * Verify a certificate on-chain.
 * @param {ethers.Provider} provider
 * @param {string} certId
 * @returns {Object} Certificate data with `exists` boolean
 */
export async function verifyCert(provider, certId) {
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
}
