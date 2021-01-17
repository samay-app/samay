RocketMeet is a free and open source meeting scheduling app for quickly finding the best time for team meetings and one-on-ones. The meeting host creates a poll marked with their favorite times and shares the invite link with participants. They mark their favorite times after which the host decides the final time which works for everyone. Check out [rocketmeet.me](https://rocketmeet.me/)!.

## Community

Come say hi at our [chatroom](https://gitter.im/RocketMeet/community) for discussions, voicing new ideas or getting help!

## API Documentation

You can find the complete API documentation [here](#).

## One-click Heroku deployment

[button here]

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

Make a copy of the .env.example file to .env

### Run

```bash
$ npm dev
```

You will be able to access the API from http://localhost:5000

### Testing

```bash
$ npm test
```

### Deployment

In your .env, change the `NODE_ENV` to `production` and set the `DB_HOST`, `DB_USER` and `DB_USER_PWD` variables corresponding to your MongoDB Atlas instance.

## Contributing

Check out our [contributing guide](https://github.com/RocketMeet/RocketMeet-server/blob/main/CONTRIBUTING.md)!


## License

RocketMeet is distributed under the [MIT License](https://github.com/RocketMeet/RocketMeet-server/blob/main/LICENSE).
