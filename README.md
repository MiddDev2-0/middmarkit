# Project Skeleton

## Description
Middmarkit is a resale platform for Middlebury College. This application is a secure online marketplace for students to buy and sell items to one another, facilitating interactions between buyer and seller and maintaining an updated page of available listings.

## Features

- User Authentication: Users can sign up and log in using their Google accounts to access the platform.
- Product Listing: Users can create listings with product details, descriptions, and images for resale.
- Admin Review: Before items are posted, they must first be reviewed by a Middmarkit admin.
- Automated Instagram Posting: Once reviewed, the items are automatically posted to @middmarkit on Instagram for broader visibility.
- User Dashboard: Users can manage their listings through an intuitive dashboard.
- Search: The platform offers search options to help users find relevant items easily.

## Technologies Used

- Next.js
- React.js
- Material UI
- Google OAuth 2.0
- Cloudinary for image storage
- Neon.tech for PostgreSQL database management
- Instagram Graph API for image posting

## Creation

This is a Next.JS application, created with create-next-app `💻 npx create-next-app@latest`, which uses Jest and Testing Library for testing, ESLint for static analysis, Prettier for styling, and is configured to use GitHub actions for testing pull requests.

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

###### Application Link

https://killington.csci312.dev/

[![Node.js CI](https://github.com/csci312a-s23/project-killington/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/csci312a-s23/project-killington/actions/workflows/node.js.yml)
