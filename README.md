![RocketMeet](/server.png)

### Find the best time for team meetings and one-on-ones with RocketMeet. [Try now](https://rocketmeet.me)!

[![License](https://img.shields.io/github/license/Rocketmeet/RocketMeet-server?color=%23000000&style=for-the-badge)](https://github.com/RocketMeet/RocketMeet-server/blob/main/LICENSE)
[![Chat on Gitter](https://img.shields.io/badge/chat--on-gitter-brightgreen?color=%23000000&style=for-the-badge&logo=gitter)](https://gitter.im/RocketMeet/community)
[![Code Climate maintainability](https://img.shields.io/codeclimate/maintainability/RocketMeet/RocketMeet-server?style=for-the-badge)](https://codeclimate.com/github/RocketMeet/RocketMeet-server)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/RocketMeet/RocketMeet-server/Tests?label=Tests&style=for-the-badge)
[![GitHub contributors](https://img.shields.io/github/contributors/RocketMeet/RocketMeet-server?color=%23000000&&style=for-the-badge)](https://github.com/RocketMeet/RocketMeet-server/graphs/contributors)

## [Under active development]

## Community

Come say hello at our [chatroom](https://gitter.im/RocketMeet/community) for discussions, voicing new ideas or getting help!

## API Documentation

You can find the API documentation [here](https://documenter.getpostman.com/view/10544125/TW6wJodh).

## Getting Started

### Prerequisites
* `NodeJS v14`
* `MongoDB v4.4`

### Installation

```bash
$ git clone https://github.com/<your-username>/RocketMeet-server.git

$ cd RocketMeet-server

$ npm install
```

### Setup

Go to [Firebase](https://firebase.google.com/) and create a new project. In the authentication section at Firebase, enable sign-in with Google. Then generate a private key from your Project Overview > Project Settings > Service Accounts > Firebase Admin SDK. Next, make a copy of the .env.example file to .env and set the vars corresponding to your Firebase project. Generate and set the public encryption key and IV variables too which is used for email encryption.

### Run

Make sure to start MongoDB first. Then run the RocketMeet-server using:

```bash
$ npm run dev
```

You will be able to access the API from http://localhost:5000

### Testing

```bash
$ npm run test
```
If got an error related to NODE_ENV then, use

```bash
$ npm install -g win-node-env
```

### Deployment

In your .env, change the `NODE_ENV` to `production`. Launch a MongoDB Atlas instance and set the corresponding `DB_HOST`, `DB_USER` and `DB_USER_PWD` variables in the .env. Set the `CORS_URL` to the domain pointing to RocketMeet-client. Make sure to add that domain to the 'Authorized domains' section in your Firebase project. Make sure the Firebase and email encryption variables are set and correct.

## Heroku 
 
You can deploy the app using Heroku 
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## Contributing

Check out our [contributing guide](https://github.com/RocketMeet/RocketMeet-server/blob/main/CONTRIBUTING.md)!

## License

RocketMeet-server is distributed under the [MIT License](https://github.com/RocketMeet/RocketMeet-server/blob/main/LICENSE).
