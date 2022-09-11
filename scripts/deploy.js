async function main() {
  const Docial = await ethers.getContractFactory("Docial");

  // Start deployment, returning a promise that resolves to a contract object
  const social_dapp = await Docial.deploy();
  console.log("Contract deployed to address:", social_dapp.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
