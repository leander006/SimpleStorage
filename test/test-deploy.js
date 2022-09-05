const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SimpleStorage", function () {
  let simpleStorage, simpleFactory;
  beforeEach(async function () {
    simpleFactory = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await simpleFactory.deploy();
  });
  it("Should start with favorate number 0", async function () {
    const currentValue = await simpleStorage.retrieve();
    expect(currentValue).to.equal(0);
  });
  it("Should update when we call store", async function () {
    const transction = await simpleStorage.store(69);
    transction.wait(1);
    const currentValue = await simpleStorage.retrieve();
    expect(currentValue).to.equal(69);
  });
});
