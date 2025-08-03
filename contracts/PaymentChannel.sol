// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PaymentChannel {
    struct Payment {
        address from;
        address to;
        uint256 amount;
        string token;
        bool confirmed;
    }

    Payment[] public payments;

    event PaymentSent(address indexed from, address indexed to, uint256 amount, string token);

    function sendPayment(address to, uint256 amount, string memory token) public {
        payments.push(Payment(msg.sender, to, amount, token, false));
        emit PaymentSent(msg.sender, to, amount, token);
    }

    function getPayment(uint256 index) public view returns (address from, address to, uint256 amount, string memory token, bool confirmed) {
        Payment memory p = payments[index];
        return (p.from, p.to, p.amount, p.token, p.confirmed);
    }
    // TODO: Add escrow, stablecoin integration, confirmation logic, etc.
} 