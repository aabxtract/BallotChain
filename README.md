🗳️ Ballotz: Decentralized Voting dApp

A universal voting platform for organizations big and small, built on the Stacks L2 to leverage the security of Bitcoin. Ballotz is designed for both private and public organizations to run transparent and secure elections for everything from major public issues to minor team decisions.

Users can create their own elections, define candidates, and allow participants to vote. For DAOs and private groups, voting can be restricted to token-holders. All votes are recorded on-chain, making the process verifiable, immutable, and censorship-resistant.

✨ Features

🔐 Wallet-based authentication (no accounts or emails)

🏗️ Create custom elections for public or private groups

🗳️ One vote per wallet (or weighted by token holdings)

⏱️ Block-height based start and end times for voting periods

💎 Token-gated voting for DAOs and exclusive communities

📊 Real-time, transparent vote counts

🧠 How It Works
1. Create an Election

A user connects their Stacks wallet (Leather or Xverse) and fills out a simple form to create an election, providing key details like the title, description, and voting period. They can optionally add a token contract address to restrict voting to specific token holders.

2. Vote

Participants can browse all public elections or access private ones. During the active voting period, they can connect their wallet and cast a single vote for their preferred candidate. The smart contract ensures that rules, such as one-vote-per-person or token-holding requirements, are enforced.

3. View Results

Results are updated in real-time and can be viewed by anyone, ensuring full transparency. Once the election's end block is reached, the results are permanently frozen and recorded on the blockchain.

🖥️ Frontend Overview

The frontend provides a clean, modern, and intuitive interface for interacting with the underlying Clarity smart contract.

Pages

Landing Page – An introduction to Ballotz with CTAs to view or create elections.

Elections List – A gallery of all public elections, showing their status and key details.

Create Election – A form to configure and launch a new election.

Election Detail – A page to view candidates, cast a vote, and see real-time results.

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

DAO Governance: Allow token holders to vote on proposals.

Corporate Voting: Securely run shareholder votes or internal polls.

Community Decisions: Let community members decide on funding, projects, or leadership.

Public Elections: Provide a transparent and auditable platform for local or national elections.

🚀 Future Enhancements

Weighted voting based on token holdings.

Support for multiple voting strategies (e.g., ranked-choice, quadratic voting).

Decentralized identity integration for enhanced voter verification.

Advanced analytics and data visualization for election results.

🧪 Development
Run Frontend Locally
npm install
npm run dev

Requirements

Node.js

Stacks wallet (Leather or Xverse)

🔒 Philosophy

Ballotz is built on the principle of verifiable trust. By anchoring the voting process to Bitcoin via the Stacks layer, it provides a platform where transparency and fairness are not just promised but are mathematically guaranteed.

📄 License

MIT License
