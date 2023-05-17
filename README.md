# Project Skeleton

## Creation

This project skeleton has been setup similar to our assignments and practicals. It is a Next.JS application, created with create-next-app `💻 npx create-next-app@latest`, which uses Jest and Testing Library for testing, ESLint for static analysis, Prettier for styling, and is configured to use GitHub actions for testing pull requests.

Development dependencies installed with:

```
💻 npm install -D jest jest-environment-jsdom husky lint-staged prettier eslint-config-prettier @testing-library/react @testing-library/jest-dom
```

### Additional tools you might need

#### Mocking fetch

Tools for mocking fetch can be installed with

```
💻 npm install -D fetch-mock-jest node-fetch@2.6.7
```

#### Authentication

Tools for authentication can be installed with

```
💻 npm install --save next-auth
```

Note we need to pin the `node-fetch` version due to breaking changes when used with Jest in newer versions.

#### Material UI

```
💻 npm install --save @mui/material @emotion/react @emotion/styled @emotion/cache @emotion/server
```

##### Application Purpose

This applications aims to create a secure online marketplace for Middlebury College students to buy and sell items to one another, facilitating interactions between buyer and seller and maintaining an updated page of listings which are still for sale.

###### Application Link

https://killington.csci312.dev/

[![Node.js CI](https://github.com/csci312a-s23/project-killington/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/csci312a-s23/project-killington/actions/workflows/node.js.yml)
