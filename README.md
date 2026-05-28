# KoinX Tax Loss Harvesting Tool

Frontend internship assignment for KoinX. The app shows a tax loss harvesting dashboard where a user can select holdings and see how those selections change their post-harvesting capital gains.

## Tech Stack

- React
- TypeScript
- Vite
- CSS
- Mock API functions with local data

## Features

- Dark dashboard layout with a Tax Optimisation heading
- How it works tooltip
- Important Notes And Disclaimers collapsible section
- Pre Harvesting and After Harvesting summary cards
- Real-time after-harvesting calculation based on selected holdings
- Individual holding selection and select all
- Amount to Sell updates only for selected holdings
- Sorting by short-term and long-term gains
- View All / View Less for the holdings table
- Loading and error states
- Responsive layout for desktop and mobile

## Setup

```bash
npm install
npm run dev
```

For a production build:

```bash
npm run build
```

## Calculation Logic

The Pre Harvesting card always uses the original capital gains data from the mock API.

The After Harvesting card starts with the same values. When holdings are selected, each selected holding is added to the after-harvesting values:

- Positive STCG gain adds to short-term profits.
- Negative STCG gain adds to short-term losses using its absolute value.
- Positive LTCG gain adds to long-term profits.
- Negative LTCG gain adds to long-term losses using its absolute value.

Net capital gains are calculated as:

```txt
Net Capital Gains = Profits - Losses
```

Effective capital gains are calculated as:

```txt
Effective Capital Gains = STCG Net + LTCG Net
```

The savings message is shown only when the after-harvesting effective gain is lower than the pre-harvesting realised gain.

## Assumptions

- API calls are mocked using local promise-based functions.
- Currency is shown in INR.
- Placeholder text is used for the tooltip and disclaimer, as allowed in the assignment demo.
- Four holdings are shown by default, with an option to view the full list.
- One mock holding has a larger short-term loss so the harvesting behavior is easy to see during review.

