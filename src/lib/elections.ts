export type Candidate = {
  id: number;
  name?: string;
  votes: number;
};

export type Election = {
  id: number;
  title: string;
  description: string;
  creator: string; // Stacks address
  startBlock: number;
  endBlock: number;
  candidates: Candidate[];
};

const shortAddr = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

// This is mock data and will be replaced with data from the smart contract.
export const elections: Election[] = [
  {
    id: 1,
    title: 'Community Fund Proposal #123',
    description:
      'Should we allocate 50,000 STX from the community fund to develop a new NFT marketplace? This proposal outlines the potential benefits and roadmap.',
    creator: shortAddr('SP2J6B1G1A0D4Z3E4R5T6Y7U8I9O0P1Q2R3S4T5V'),
    startBlock: 100,
    endBlock: 200,
    candidates: [
      { id: 1, name: 'Yes', votes: 1250 },
      { id: 2, name: 'No', votes: 340 },
    ],
  },
  {
    id: 2,
    title: 'Board of Directors Election 2024',
    description: 'Annual election for the two open seats on the board of directors. Top two candidates will be elected.',
    creator: shortAddr('SP3G1A0D4Z3E4R5T6Y7U8I9O0P1Q2R3S4T5V6W7X'),
    startBlock: 150,
    endBlock: 250,
    candidates: [
      { id: 1, name: 'Alice', votes: 890 },
      { id: 2, name: 'Bob', votes: 1120 },
      { id: 3, name: 'Charlie', votes: 750 },
      { id: 4, name: 'Diana', votes: 910 },
    ],
  },
  {
    id: 3,
    title: 'Protocol Upgrade v2.1',
    description:
      'Vote on the adoption of Protocol Upgrade v2.1, which includes performance improvements and new features for smart contracts.',
    creator: shortAddr('SP1A0D4Z3E4R5T6Y7U8I9O0P1Q2R3S4T5V6W7X8Y'),
    startBlock: 220,
    endBlock: 320,
    candidates: [
      { id: 1, name: 'Approve', votes: 4500 },
      { id: 2, name: 'Reject', votes: 250 },
    ],
  },
];
