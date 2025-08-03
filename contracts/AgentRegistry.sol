// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AgentRegistry {
    struct Agent {
        address owner;
        string name;
        bool exists;
    }

    mapping(address => Agent) public agents;

    event AgentRegistered(address indexed owner, string name);

    function registerAgent(string memory name) public {
        require(!agents[msg.sender].exists, "Agent already registered");
        agents[msg.sender] = Agent(msg.sender, name, true);
        emit AgentRegistered(msg.sender, name);
    }

    function getAgent(address owner) public view returns (string memory name, bool exists) {
        Agent memory agent = agents[owner];
        return (agent.name, agent.exists);
    }
    // TODO: Add more agent metadata, reputation, etc.
} 