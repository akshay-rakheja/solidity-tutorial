async function main() {
  const [owner, somebodyElse] = await hre.ethers.getSigners();
  const keyboardsContractFactory = await hre.ethers.getContractFactory("Keyboards");
  const keyboardsContract = await keyboardsContractFactory.deploy();
  await keyboardsContract.deployed();

  console.log("Contract deployed to:", keyboardsContract.address);
  
  //getkeyboard txn without creating one.
  let keyboards = await keyboardsContract.getKeyboards();
  console.log("We got the keyboards!", keyboards);

  //keyboard txn
  const keyboardTxn1 = await keyboardsContract.create("A really great keyboard!");
  await keyboardTxn1.wait();

  //txn 2
  const keyboardTxn2 = await keyboardsContract.connect(somebodyElse).create("A really shitty keyboard!");
  await keyboardTxn2.wait();


  //getkeyboard txn after creating one
  keyboards = await keyboardsContract.getKeyboards();
  console.log("We got the keyboards!", keyboards);

  //from the other user
  keyboards = await keyboardsContract.connect(somebodyElse).getKeyboards();
  console.log("And as somebody else!", keyboards);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
