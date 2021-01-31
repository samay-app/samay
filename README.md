![RocketMeet](/mailer.png)
### Find the best time for team meetings and one-on-ones with RocketMeet. [Try now](https://rocketmeet.me)!

[![License](https://img.shields.io/github/license/Rocketmeet/RocketMeet-mailer?color=%23000000&style=for-the-badge)](https://github.com/RocketMeet/RocketMeet-mailer/blob/main/LICENSE)
[![Chat on Gitter](https://img.shields.io/badge/chat--on-gitter-brightgreen?color=%23000000&style=for-the-badge&logo=gitter)](https://gitter.im/RocketMeet/community)
![Code Climate maintainability](https://img.shields.io/codeclimate/maintainability/RocketMeet/RocketMeet-mailer?style=for-the-badge)
![GitHub contributors](https://img.shields.io/github/contributors/RocketMeet/RocketMeet-mailer?color=%23000000&&style=for-the-badge)

## Community

Come say hi at our [chatroom](https://gitter.im/RocketMeet/community) for discussions, voicing new ideas or getting help!

## API Documentation

You can find the complete API documentation [here](https://documenter.getpostman.com/view/9605987/TW6wHo7V#intro).

## Getting Started

### Prerequisites
* `NodeJS v14`

### Installation

```bash
$ git clone https://github.com/<your-username>/RocketMeet-mailer.git

$ cd RocketMeet-mailer

$ npm install
```

### Setup

Go to Firebase and create a project. In the authentication section, enable sign-in with Google. Then generate a private key from Project Overview > Project Settings > Service Accounts > Firebase Admin SDK. Next, make a copy of the .env.example file to .env and set the vars corresponding to the private key you generated. Then set the `EMAIL` and `PASSWORD` variables corresponding to your Gmail account used with Nodemailer. Make sure to use a spare account and [Turn on less secure app access](https://myaccount.google.com/lesssecureapps)

### Run

```bash
$ npm run dev
```

You will be able to access the API from http://localhost:8000

### Testing

```bash
$ npm run test
```

### Deployment

In your .env, change the `NODE_ENV` to `production` and set the `EMAIL` and `PASSWORD` variables corresponding to your Gmail account. Make sure to use a spare account and [Turn on less secure app access](https://myaccount.google.com/lesssecureapps). Then set the CORS_URL to the domain running RocketMeet-client.
Make sure the Firebase credentials in .env are correct and that you added your domain to the 'Authorized domains' section in your Firebase project.

## Contributing

Check out our [contributing guide](https://github.com/RocketMeet/RocketMeet-mailer/blob/main/CONTRIBUTING.md)!

## License

RocketMeet-mailer is distributed under the [MIT License](https://github.com/RocketMeet/RocketMeet-mailer/blob/main/LICENSE).
