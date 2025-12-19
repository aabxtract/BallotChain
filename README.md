🗳️ Decentralized Voting dApp (Stacks L2)

A permissionless, on-chain voting platform built on Stacks L2 that allows anyone to create and run transparent elections secured by Bitcoin.

Users can create their own elections, define the number of candidates, and allow participants to vote once per election. All votes are recorded on-chain, making the process verifiable, immutable, and censorship-resistant.

✨ Features

🔐 Wallet-based authentication (no accounts or emails)

🏗️ Create custom elections

🧑‍🤝‍🧑 Multiple candidates per election

🗳️ One vote per wallet

⏱️ Block-height based start and end times

📊 Real-time vote counts

🔍 Transparent & verifiable results

📜 Immutable on-chain election records

🧠 How It Works
1. Create an Election

A user connects their Stacks wallet and creates an election by providing:

Election title

Description

Number of candidates

Start block

End block

The election is stored on-chain in a Clarity smart contract.

2. Vote

Other users can:

View all active elections

Select an election

Cast one vote for a candidate during the active voting period

The smart contract prevents double voting and rejects votes outside the allowed time window.

3. View Results

Vote counts are visible in real time

Once the election ends, results become read-only

Winning candidate is clearly displayed

🔗 On-Chain Logic (Clarity)

The smart contract handles:

Election creation

Candidate vote tracking

Voter participation tracking

Block-height based validation

Core Functions

create-election

vote

get-election

get-candidate-votes

🖥️ Frontend Overview

The frontend provides a clean and intuitive interface for interacting with the smart contract.

Pages

Landing Page – Intro + wallet connection

Elections List – Browse all elections

Create Election – Election creation form

Election Detail – Vote and view results

🛠️ Tech Stack
Smart Contracts

Clarity

Stacks L2

Frontend

Next.js

TailwindCSS

Stacks.js

Hiro API

🎯 Use Cases

Community governance

DAOs and protocol voting

Online organizations

Clubs and student elections

Transparent decision-making systems

🚀 Future Enhancements

Candidate names stored off-chain

NFT-based voting eligibility

STX-weighted voting

DAO integrations

Election result NFTs

Anti-sybil mechanisms

🧪 Development
Run Frontend Locally
npm install
npm run dev

Requirements

Node.js

Stacks wallet (Leather or Xverse)

Stacks testnet or mainnet access

🔒 Philosophy

This project is built on the belief that trust should be verifiable, not assumed.
By anchoring elections to Bitcoin via Stacks, the platform ensures transparency, immutability, and fairness.

📄 License

MIT License
