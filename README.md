![RocketMeet](/client.png)

### Find the best time for team meetings and one-on-ones with RocketMeet. [Try now](https://rocketmeet.me)!

[![License](https://img.shields.io/github/license/Rocketmeet/RocketMeet-client?color=%23000000&style=for-the-badge)](https://github.com/RocketMeet/RocketMeet-client/blob/main/LICENSE)
[![Chat on Gitter](https://img.shields.io/badge/chat--on-gitter-brightgreen?color=%23000000&style=for-the-badge&logo=gitter)](https://gitter.im/RocketMeet/community)
![Code Climate maintainability](https://img.shields.io/codeclimate/maintainability/RocketMeet/RocketMeet-client?style=for-the-badge)
![GitHub contributors](https://img.shields.io/github/contributors/RocketMeet/RocketMeet-client?color=%23000000&&style=for-the-badge)

## Table of contents

- [Community](#community)
- [API Documentation](#api-documentation)
- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Setup](#setup)
  - [Development](#development)
  - [Testing](#test)
  - [Production](#production)
- [Deployment](#deployment)
  - [Deploy with vercel](#vercel)
- [Contributing](#contributing)
- [License](#license)

## Community

Come say hello at our [chatroom](https://gitter.im/RocketMeet/community) for discussions, voicing new ideas or getting help!

## API Documentation

You can find the API documentation for the server [here](https://documenter.getpostman.com/view/10544125/TW6wJodh) and the mailer [here](https://documenter.getpostman.com/view/9605987/TW6wHo7V).

## Getting Started

### Prerequisites

- `NodeJS v14`

### Installation

- Fork the repository

```bash
$ git clone https://github.com/<your-github-handle>/RocketMeet-client.git

$ cd RocketMeet-client

$ npm i
```

### Setup

- Make a copy of the `.env.development.example` and `.env.production.example` files to `.env.development` and `.env.production` files respectively.
- Create a firebase account , setup firebase authentication for google sign-in (firebase-console > Authentication > Sign-in methods > Google ), whitelist the client domain in the `Authorised domains` section. Set firebase config variables in `.env` files.
- Set the encryption variables and domain URLs in the `.env` files

### Development

```bash
$ npm run dev
```

Linting

```bash
$ npx eslint . --ext .tsx,.ts
```

> Note: Or simply setup automatic linting in `vscode`

Testing

```bash
$ npm run test
```

### Production

```bash
$ npm run build

$ npm start
```

## Deployment

Make a copy of the `.env.production.example` file to `.env.production` and set the environment variables.

## Deploy with vercel

> Note: You need to have the [RocketMeet-server](https://github.com/RocketMeet/RocketMeet-server) and [RocketMeet-mailer](https://github.com/RocketMeet/RocketMeet-mailer) setup before using this one-click deployment. Make sure to create a firebase account and setup `firebase-auth` for google signin.

Set the environment variables in `.env.production.example` to vercel in the next step.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2FRocketMeet%2FRocketMeet-client&project-name=rocketmeet-client-demo&repository-name=RocketMeet-client&demo-title=RocketMeet%20Demo)

## Contributing

Check out our [contributing guide](https://github.com/RocketMeet/RocketMeet-client/blob/main/CONTRIBUTING.md)!

## License

RocketMeet-client is distributed under the [MIT License](https://github.com/RocketMeet/RocketMeet-client/blob/main/LICENSE).
