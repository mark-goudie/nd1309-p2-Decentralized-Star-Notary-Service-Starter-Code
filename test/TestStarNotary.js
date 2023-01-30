const StarNotary = artifacts.require("StarNotary");

var accounts;
var owner;
let user1;
let user2;
let lastStarId = 0;

contract("StarNotary", (accs) => {
  accounts = accs;
  owner = accounts[0];
  user1 = accounts[1];
  user2 = accounts[2];
});

function getNewStarId() {
  lastStarId++;
  return lastStarId;
}

// const deployStarNotary = async () => {
//   starNotaryContract = await StarNotary.deployed();
// };

// before(deployStarNotary);

it("can Create a Star", async () => {
  let tokenId = getNewStarId();
  let instance = await StarNotary.deployed();
  await instance.createStar("Awesome Star!", tokenId, { from: accounts[0] });
  assert.equal(await instance.tokenIdToStarInfo.call(tokenId), "Awesome Star!");
});

it("lets user1 put up their star for sale", async () => {
  let instance = await StarNotary.deployed();
  let user1 = accounts[1];
  let starId = getNewStarId();
  let starPrice = web3.utils.toWei(".01", "ether");
  await instance.createStar("awesome star", starId, { from: user1 });
  await instance.putStarUpForSale(starId, starPrice, { from: user1 });
  assert.equal(await instance.starsForSale.call(starId), starPrice);
});

it("lets user1 get the funds after the sale", async () => {
  let instance = await StarNotary.deployed();
  let user1 = accounts[1];
  let user2 = accounts[2];
  let starId = getNewStarId();
  let starPrice = web3.utils.toWei(".01", "ether");
  let balance = web3.utils.toWei(".05", "ether");
  await instance.createStar("awesome star", starId, { from: user1 });
  await instance.putStarUpForSale(starId, starPrice, { from: user1 });
  let balanceOfUser1BeforeTransaction = await web3.eth.getBalance(user1);
  await instance.buyStar(starId, { from: user2, value: balance });
  let balanceOfUser1AfterTransaction = await web3.eth.getBalance(user1);
  let value1 = Number(balanceOfUser1BeforeTransaction) + Number(starPrice);
  let value2 = Number(balanceOfUser1AfterTransaction);
  assert.equal(value1, value2);
});
// fix the next two
it("lets user2 buy a star, if it is put up for sale", async () => {
  let instance = await StarNotary.deployed();
  let starId = getNewStarId();
  let starPrice = web3.utils.toWei(".01", "ether");
  let balance = web3.utils.toWei(".05", "ether");
  await instance.createStar("awesome star", starId, { from: user1 });
  await instance.putStarUpForSale(starId, starPrice, { from: user1 });
  await instance.buyStar(starId, { from: user2, value: balance });
  assert.equal(await instance.ownerOf.call(starId), user2);
});

it("lets user2 buy a star and decreases its balance in ether", async () => {
  // given

  let instance = await StarNotary.deployed();
  let starId = getNewStarId();
  let starPrice = web3.utils.toWei(".01", "ether");
  let balance = web3.utils.toWei(".05", "ether");
  await instance.createStar("awesome star", starId, { from: user1 });
  await instance.putStarUpForSale(starId, starPrice, { from: user1 });
  const balanceOfUser2BeforeTransaction = await web3.eth.getBalance(user2);
  await instance.buyStar(starId, { from: user2, value: balance, gasPrice: 0 });
  const balanceAfterUser2BuysStar = await web3.eth.getBalance(user2);
  let value =
    Number(balanceOfUser2BeforeTransaction) - Number(balanceAfterUser2BuysStar);
  assert.equal(value, starPrice);
});

// Implement Task 2 Add supporting unit tests

it("can add the star name and star symbol properly", async () => {
  // 1. create a Star with different tokenId
  //2. Call the name and symbol properties in your Smart Contract and compare with the name and symbol provided
  let instance = await StarNotary.deployed();

  let inputName = await instance.name.call();
  let inputSymbol = await instance.symbol.call();

  assert.equal("Astro Star", inputName);
  assert.equal("AST", inputSymbol);
});

it("lets 2 users exchange stars", async () => {
  // 1. create 2 Stars with different tokenId
  // 2. Call the exchangeStars functions implemented in the Smart Contract
  // 3. Verify that the owners changed
  let instance = await StarNotary.deployed();

  let [user1, user2] = accounts.slice(1, 3);

  let [star1Id, star2Id] = [getNewStarId(), getNewStarId()];
  let [star1Name, star2Name] = ["firstStar", "secondStar"];

  await Promise.all([
    instance.createStar(star1Name, star1Id, { from: user1 }),
    instance.createStar(star2Name, star2Id, { from: user2 }),
  ]);

  await instance.exchangeStars(star1Id, star2Id, { from: user1 });

  let [ownerOfStar1, ownerOfStar2] = await Promise.all([
    instance.ownerOf.call(star1Id),
    instance.ownerOf.call(star2Id),
  ]);

  assert.deepEqual([ownerOfStar2, ownerOfStar1], [user1, user2]);
});

it("lets a user transfer a star", async () => {
  // 1. create a Star with different tokenId
  // 2. use the transferStar function implemented in the Smart Contract
  // 3. Verify the star owner changed.
  let instance = await StarNotary.deployed();
  let [user1, user2] = accounts.slice(0, 2);
  let starId = getNewStarId();
  await instance.createStar("thirdStar", starId, { from: user1 });
  await instance.transferStar(user2, starId, { from: user1 });
  let starOwner = await instance.ownerOf.call(starId);
  assert.equal(starOwner, user2);
});

it("lookUptokenIdToStarInfo test", async () => {
  // 1. create a Star with different tokenId
  // 2. Call your method lookUptokenIdToStarInfo
  // 3. Verify if you Star name is the same
  let instance = await StarNotary.deployed();
  const starId = getNewStarId();
  await instance.createStar("fourthStar", starId, {
    from: accounts[0],
  });

  assert.equal(await instance.lookUptokenIdToStarInfo(starId), "fourthStar");
});
