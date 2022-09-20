# Click to view the test reports for Main 👩‍🔬🧪

[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/DTS-STN/next-template/E2E%20Test?label=E2E)](https://dts-stn.github.io/next-template/main/coverage/e2e-report)
[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/DTS-STN/next-template/Lint%20and%20Test?label=Lint%20and%20Unit)](https://dts-stn.github.io/next-template/main/coverage/lcov-report)

![Line Coverage Badge](https://img.shields.io/badge/dynamic/json?label=Line%20Coverage&query=%24.total.lines.pct&suffix=%25&url=https%3A%2F%2Fdts-stn.github.io%2Fnext-template%2Frefs%2Fheads%2Fmain%2Fcoverage%2Fcoverage-summary.json)
![Statements Coverage Badge](https://img.shields.io/badge/dynamic/json?label=Statement%20Coverage&query=%24.total.statements.pct&suffix=%25&url=https%3A%2F%2Fdts-stn.github.io%2Fnext-template%2Frefs%2Fheads%2Fmain%2Fcoverage%2Fcoverage-summary.json)
![Function Coverage Badge](https://img.shields.io/badge/dynamic/json?label=Function%20Coverage&query=%24.total.functions.pct&suffix=%25&url=https%3A%2F%2Fdts-stn.github.io%2Fnext-template%2Frefs%2Fheads%2Fmain%2Fcoverage%2Fcoverage-summary.json)
![Branch Coverage Badge](https://img.shields.io/badge/dynamic/json?label=Branch%20Coverage&query=%24.total.branches.pct&suffix=%25&url=https%3A%2F%2Fdts-stn.github.io%2Fnext-template%2Frefs%2Fheads%2Fmain%2Fcoverage%2Fcoverage-summary.json)

## Versions

![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/DTS-STN/next-template/next)
![GitHub package.json dependency version (dev dep on branch)](https://img.shields.io/github/package-json/dependency-version/DTS-STN/next-template/dev/tailwindcss)
![GitHub package.json dependency version (dev dep on branch)](https://img.shields.io/github/package-json/dependency-version/DTS-STN/next-template/dev/jest)
![GitHub package.json dependency version (dev dep on branch)](https://img.shields.io/github/package-json/dependency-version/DTS-STN/next-template/dev/cypress)

## Description

Quick starter template for DTS projects making use of one of our commonly-used [Next.js](https://nextjs.org/) setups.
This template uses the basic Next.js [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) bootstrap template.

### Technologies Implemented

This project uses

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Jest](https://jestjs.io/) for unit testing
- [Cypress](https://www.cypress.io/) for end-to-end testing.

## How to Implement/Get Started

### Values that need to be configured:

#### Replace next-template name to new project name

Search "next-template", replace in package.json, run "npm i" in terminal and confirm package-lock.json is updated

#### Update the Licence

In order to use any licence with your repository, you will need DG approval. Your PO should send an email to the DG resposible for the product to request a licence ("MIT" or other).

Until you have approval from your DG your LICENCE file should only state the following (updating the year)

```md
All Rights Reserved

Copyright (c) Her Majesty the Queen in Right of Canada, as represented by the Employment and Social Development Canada, 2021
```

Once approved by the DG, the copyright statement must still be included in the LICENCE.

#### Configuring Helm

In the helm template, the application name is next-template. this will need to be changed by the current application name.

For every Kubernetes cluster, a context.sh file needs to be defined. For example, one might be called context-dev.sh and the other context-prod.sh.

For more information, please visit the [DTS SRE deployment templates](https://github.com/DTS-STN/dts-sre-deployment-templates/tree/main/kubernetes-helm-template).

## PR Procedures/Definition of done

Have at least one person reviewing each PR before it can be merged. Each branch should be prefixed with the ID of the relevant ADO task. Eg. "379-update-readme"

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
