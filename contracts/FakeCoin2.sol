// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FakeCoin2 is ERC20, Ownable {
    mapping(address => uint256) private _stakes;
    mapping(address => uint256) private _lastStakeTimestamp;
    uint256 private _rewardRate = 100;

    constructor(address initialOwner, uint256 initialSupply)
        ERC20("FakeCoin2", "FAKC")
        Ownable(initialOwner)
    {
        _mint(msg.sender, initialSupply);
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function stake(uint256 amount) public {
        require(amount > 0, "Cannot stake 0 tokens");
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");

        _stakes[msg.sender] += amount;
        _lastStakeTimestamp[msg.sender] = block.timestamp;
        _transfer(msg.sender, address(this), amount);
    }

    function withdraw() public {
        require(_stakes[msg.sender] > 0, "No staked tokens");

        uint256 stakedAmount = _stakes[msg.sender];
        uint256 reward = (block.timestamp - _lastStakeTimestamp[msg.sender]) *
            _rewardRate;

        _stakes[msg.sender] = 0;
        _transfer(address(this), msg.sender, stakedAmount);
        _mint(msg.sender, reward);
    }

    function getStake(address account) public view returns (uint256) {
        return _stakes[account];
    }

    function getCurrentRewards(address account) public view returns (uint256) {
        uint256 reward = (block.timestamp - _lastStakeTimestamp[account]) *
            _rewardRate;
        return reward;
    }

    function getLastStakeTimestamp(
        address account
    ) public view returns (uint256) {
        return _lastStakeTimestamp[account];
    }
}