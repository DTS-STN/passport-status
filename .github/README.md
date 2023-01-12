# Passport Status

An unauthenticated front end application to check the status of a users passport application.

This application is not released yet.

## Technologies Implemented

This project uses

- [Next.js](https://nextjs.org/) ![Next JS Version](https://img.shields.io/github/package-json/dependency-version/DTS-STN/passport-status/next)
- [Tailwind CSS](https://tailwindcss.com/) ![Tailwind CSS Version](https://img.shields.io/github/package-json/dependency-version/DTS-STN/passport-status/dev/tailwindcss)
- [Jest](https://jestjs.io/) for unit testing ![Jest Version (dev dependancy)](https://img.shields.io/github/package-json/dependency-version/DTS-STN/passport-status/dev/jest)
- [Cypress](https://www.cypress.io/) for end-to-end testing. ![Cypress Version (dev dependancy)](https://img.shields.io/github/package-json/dependency-version/DTS-STN/passport-status/dev/cypress)

## Test reports for Main 👩‍🔬 🧪

![Default Tests Workflow Status](https://github.com/DTS-STN/passport-status/actions/workflows/default-tests.yml/badge.svg?branch=main)

![Line Coverage Badge](https://img.shields.io/badge/dynamic/json?label=Line%20Coverage&query=%24.total.lines.pct&suffix=%25&url=https%3A%2F%2Fdts-stn.github.io%2Fpassport-status%2Frefs%2Fheads%2Fmain%2Funit-test-results%2Fcoverage-summary.json)
![Statements Coverage Badge](https://img.shields.io/badge/dynamic/json?label=Statement%20Coverage&query=%24.total.statements.pct&suffix=%25&url=https%3A%2F%2Fdts-stn.github.io%2Fpassport-status%2Frefs%2Fheads%2Fmain%2Funit-test-results%2Fcoverage-summary.json)
![Function Coverage Badge](https://img.shields.io/badge/dynamic/json?label=Function%20Coverage&query=%24.total.functions.pct&suffix=%25&url=https%3A%2F%2Fdts-stn.github.io%2Fpassport-status%2Frefs%2Fheads%2Fmain%2Funit-test-results%2Fcoverage-summary.json)
![Branch Coverage Badge](https://img.shields.io/badge/dynamic/json?label=Branch%20Coverage&query=%24.total.branches.pct&suffix=%25&url=https%3A%2F%2Fdts-stn.github.io%2Fpassport-status%2Frefs%2Fheads%2Fmain%2Funit-test-results%2Fcoverage-summary.json)

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## logging

To change logging level, set the `LOGGING_LEVEL` environment variable OR edit `logging/log-level.js`. You can change the log level globally using the '\*' matcher, or set the level of a specific module. logging levels are fatal, error, warn, info, debug, trace or silent.

```js
const logLevelData = {
  '*': process.env.LOGGING_LEVEL ?? 'info',
  'middleware': 'debug',
}
```

### PR Procedures/Definition of done

Have at least one person reviewing each PR before it can be merged. Each branch should be prefixed with the ID of the relevant ADO task. Eg. "379-update-readme"

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Licence

Unless otherwise noted, the source code of this project is covered under [Crown Copyright, Government of Canada](https://www.canada.ca/en/canadian-heritage/services/crown-copyright-request.html), and is [unlicened](../LICENSE).

The Canada wordmark and related graphics associated with this distribution are protected under trademark law and copyright law.
No permission is granted to use them outside the parameters of the Government of Canada's corporate identity program.
For more information, see Federal identity requirements.
