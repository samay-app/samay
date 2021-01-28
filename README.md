![RocketMeet](/server.png)
### Find the best time for team meetings and one-on-ones with RocketMeet. [Try now](https://rocketmeet.me)!

[badges here]

## Community

Come say hi at our [chatroom](https://gitter.im/RocketMeet/community) for discussions, voicing new ideas or getting help!

## API Documentation

You can find the API documentation [here](https://documenter.getpostman.com/view/10544125/TW6wJodh).

## Getting Started

### Prerequisites
* `NodeJS v14`
* `MongoDB v4.4`

### Installation

```bash
$ git clone https://github.com/RocketMeet/RocketMeet-server.git

$ cd RocketMeet-server

$ npm install
```

### Setup

Go to [Firebase](https://firebase.google.com/) and create a project. In the authentication section, enable sign-in with Google. Then generate a private key from Project Overview > Project Settings > Service Accounts > Firebase Admin SDK. Next, make a copy of the .env.example file to .env and set the vars corresponding to the private key you generated.

### Run

```bash
$ npm run dev
```

You will be able to access the API from http://localhost:5000

### Testing

```bash
$ npm run test
```

### Deployment

In your .env, change the `NODE_ENV` to `production` and set the `DB_HOST`, `DB_USER` and `DB_USER_PWD` variables corresponding to your MongoDB Atlas instance. Make sure the Firebase credentials in .env are correct and that you added your domain to the 'Authorized domains' section in your Firebase project.

## Contributing

Check out our [contributing guide](https://github.com/RocketMeet/RocketMeet-server/blob/main/CONTRIBUTING.md)!

## License

RocketMeet-server is distributed under the [MIT License](https://github.com/RocketMeet/RocketMeet-server/blob/main/LICENSE).
