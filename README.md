# KoinX Tax Loss Harvesting Tool

A responsive React-based Tax Loss Harvesting interface built for the KoinX Frontend Intern Assignment.

## Tech Stack

- React
- TypeScript
- Vite
- CSS
- Mock API using local promises

## Features

- Pre-harvesting and after-harvesting capital gains summary
- Real-time tax harvesting calculation
- Individual holding selection
- Select all holdings
- Sorting by short-term and long-term gains
- View All / View Less holdings table
- Responsive desktop and mobile layout
- Loading and error states
- Reusable component structure
- Coin logo fallback handling

## Folder Structure

```txt
src/
  api/
    mockApi.ts
  components/
    CapitalGainsCard.tsx
    Disclaimer.tsx
    HoldingsTable.tsx
    Loader.tsx
    TooltipInfo.tsx
  data/
    capitalGains.ts
    holdings.ts
  hooks/
    useTaxHarvesting.ts
  types/
    index.ts
  utils/
    calculations.ts
    formatters.ts
  App.tsx
  main.tsx
  index.css
```

## Setup Instructions

```bash
git clone <your-repo-url>
cd koinx-tax-loss-harvesting
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Mock API

The project uses promise-based local mock APIs:

- `getCapitalGains()` returns the capital gains summary.
- `getHoldings()` returns the holdings list.

Both are located in `src/api/mockApi.ts`.

## Calculation Logic

Net Capital Gains:

```txt
Net Gain = Profits - Losses
```

Realised / Effective Capital Gains:

```txt
Realised Capital Gains = Short-Term Net Gain + Long-Term Net Gain
```

When a holding is selected:

- Positive STCG gain is added to short-term profits.
- Negative STCG gain is added to short-term losses using the absolute value.
- Positive LTCG gain is added to long-term profits.
- Negative LTCG gain is added to long-term losses using the absolute value.

Savings are shown only when:

```txt
Pre Harvesting Realised Capital Gains > After Harvesting Realised Capital Gains
```

## Assumptions

- APIs are mocked using local promises.
- Tooltip and disclaimer text is placeholder content, as allowed in the assignment demo.
- Currency is formatted in INR.
- The table shows four rows by default and supports View All / View Less.

## Deployment

Recommended Vercel settings:

```txt
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

## Screenshots

Add screenshots here after running the project locally.
