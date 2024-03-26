// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DegenToken is ERC20, Ownable {

    event TokensRedeemed(address indexed user, uint256 amount);

    constructor(string memory name, string memory symbol, uint256 initialSupply) ERC20(name, symbol) Ownable(msg.sender) {
        _mint(msg.sender, initialSupply);
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
        _transfer(_msgSender(), recipient, amount);
        return true;
    }

   function redeem(bytes1 redeemType) public {
    uint256 tokensToBurn;
    //small, medium and big redeem. 
    if (redeemType == 's') {
        tokensToBurn = 10;
    } else if (redeemType == 'm') {
        tokensToBurn = 50;
    } else if (redeemType == 'b') {
        tokensToBurn = 100;
    } else {
        revert("Invalid redeem type");
    }
    
    _burn(msg.sender, tokensToBurn);
    emit TokensRedeemed(msg.sender, tokensToBurn);
}


    function burn(uint256 amount) public {
        _burn(_msgSender(), amount);
    }

    receive() external payable {
        revert("Contract does not accept Ether");
    }

    function withdrawEther(address payable to, uint256 amount) public onlyOwner {
        require(to != address(0), "Invalid address");
        require(address(this).balance >= amount, "Insufficient balance");
        to.transfer(amount);
    }
}
