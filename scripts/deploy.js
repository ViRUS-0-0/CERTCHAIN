import hre from "hardhat";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const CertChain = await hre.ethers.getContractFactory("CertChain");
  const certChain = await CertChain.deploy();
  await certChain.waitForDeployment();

  const address = await certChain.getAddress();
  console.log(`CertChain deployed to: ${address}`);

  // Save address to frontend
  const abiDir = path.join(__dirname, "..", "frontend", "src", "abi");
  if (!fs.existsSync(abiDir)) {
    fs.mkdirSync(abiDir, { recursive: true });
  }

  fs.writeFileSync(
    path.join(abiDir, "address.json"),
    JSON.stringify({ address }, null, 2)
  );
  console.log("Contract address saved to frontend/src/abi/address.json");

  // Copy ABI to frontend
  const artifactPath = path.join(
    __dirname,
    "..",
    "artifacts",
    "contracts",
    "CertChain.sol",
    "CertChain.json"
  );
  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  fs.writeFileSync(
    path.join(abiDir, "CertChain.json"),
    JSON.stringify(artifact.abi, null, 2)
  );
  console.log("ABI copied to frontend/src/abi/CertChain.json");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
