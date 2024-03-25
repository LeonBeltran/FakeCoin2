import {
    time,
    loadFixture,
  } from "@nomicfoundation/hardhat-toolbox/network-helpers";
  import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
  import { expect } from "chai";
  import { ethers } from "hardhat";
  
  describe("FakeCoin2", function () {
    async function deployFakeCoin2Fixture() {
      // Contracts are deployed using the first signer/account by default
      const [owner] = await ethers.getSigners();
  
      const initialSupply = 1000 * 10 ** 6;
      const FakeCoin2 = await ethers.getContractFactory("FakeCoin2");
      const fakeCoin2 = await FakeCoin2.deploy(owner.address, initialSupply);
  
      return { fakeCoin2, owner, initialSupply };
    }
  
    describe("Deployment", function () {
      it("Should set the initial total supply", async function () {
        const { fakeCoin2, owner, initialSupply} = await loadFixture(deployFakeCoin2Fixture);
        const totalSupply = await fakeCoin2.totalSupply()
        expect(initialSupply).to.equal(totalSupply);
      });
  
      it("Should set the initial owner", async function () {
        const { fakeCoin2, owner, initialSupply} = await loadFixture(deployFakeCoin2Fixture);
        const contractOwner = await fakeCoin2.owner()
        expect(owner.address).to.equal(contractOwner);
      });
    });
  });