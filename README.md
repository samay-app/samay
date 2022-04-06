[![Kukkee](./public/banner.png)](https://kukkee.com)

[![License](https://img.shields.io/github/license/Kukkee/Kukkee?color=%23000000&style=for-the-badge)](https://github.com/Kukkee/Kukkee/blob/main/LICENSE)
[![Chat on Gitter](https://img.shields.io/badge/chat--on-gitter-brightgreen?color=%23000000&style=for-the-badge&logo=gitter)](https://gitter.im/Kukkee/community)
[![GitHub contributors](https://img.shields.io/github/contributors/Kukkee/Kukkee?color=%23000000&&style=for-the-badge)](https://github.com/Kukkee/Kukkee/graphs/contributors)
[![Try the live demo](https://shields.io/badge/style-live%20demo-black?&style=for-the-badge&label=Check%20out)](https://demo.kukkee.com/)
[![Check out the docs](https://shields.io/badge/style-docs-black?&style=for-the-badge&label=Check%20out)](https://docs.kukkee.com/)

### Bring people together at the right time while taking control of your data and branding.

--


# Website

Learn more about Kukkee at our [website](https://www.kukkee.com).

# Try live demo

Experience Kukkee for yourself by getting access to a [hosted Kukkee deployment](https://demo.kukkee.com).

# Community

Come say hello at our [chatroom](https://gitter.im/Kukkee/community) for discussions, voicing new ideas or getting help!

# Self-hosting

We're happy that you've decided to get your own Kukkee up and running!

This guide is divided into three sections: database, customization, and deployment.

## Database

Kukkee uses MongoDB, hence you would need a MongoDB server hosted somewhere.

### MongoDB Atlas

In case you don't have a hosted MongoDB server, you can [get started with MongoDB Atlas](https://www.mongodb.com/basics/mongodb-atlas-tutorial) for free.
If you're planning to use Vercel to deploy your own Kukkee, you must add all IP addresses (0.0.0.0/0) to the IP access list of your Atlas cluster since it is not possible to determine the IP addresses of Vercel deployments.

## Customization

1. Fork this repo to your own GitHub account and then clone it.

   ```sh
   git clone https://github.com/<your-username>/Kukkee.git
   ```

2. Go to the project folder

   ```sh
   cd Kukkee
   ```

3. To change the logo, replace `/public/logo.svg` with your own logo.

4. To change the favicon, replace `/public/favicon.svg` with your own favicon.

5. To change the logo height, logo width and brand color, edit `src/styles/variables.scss`

## Deployment

Kukkee is built with Next.js. Hence, you would need to deploy Kukkee to a platform that supports Next.js.

For example, Vercel, AWS EC2 or a DigitalOcean Droplet.

### Vercel

In case you don't have a platform already, you can get started with Vercel for free.

1. Go to https://vercel.com/dashboard
2. Create a new project
3. Import your forked git repository
4. Set the environment variables (according to the instructions in .env.example)
5. Deploy

# Contributing

We're thrilled that you'd like to contribute to Kukkee!

## Issues and PRs

If you have suggestions for how this project could be improved, or want to report a bug, open an issue! We'd love all and any contributions. If you have questions, too, we'd love to hear them. [Join our community](https://gitter.im/Kukkee/community) on Gitter or [start a new discussion](https://github.com/Kukkee/Kukkee/discussions/new) on GitHub!

We'd also love PRs. If you're thinking of a large PR, please open up an issue first to discuss your proposed changes with a project maintainer!

## Development

First, make sure you have [Node.js](https://nodejs.org/en/) and [MongoDB](https://www.mongodb.com/docs/manual/installation/#mongodb-installation-tutorials) installed. Then, to develop locally:

1. Fork this repo to your own GitHub account and then clone it.

   ```sh
   git clone https://github.com/<your-username>/Kukkee.git
   ```

2. Go to the project folder

   ```sh
   cd Kukkee
   ```

3. Create a new branch:

   ```sh
   git checkout -b MY_BRANCH_NAME
   ```

4. Install the dependencies with:

   ```sh
   npm i
   ```

5. Copy `.env.example` to `.env`

   ```sh
   cp .env.example .env
   ```

6. Set the env variables according to the instructions in the .env file

7. Start developing and watch for code changes:

   ```sh
   npm run dev
   ```

## Building

You can build the project with:

```bash
npm run build
```

Please be sure that you can make a full production build before pushing code.

## Submitting a pull request

1. Fork and clone the repository.
2. Configure and install the dependencies.
3. Make sure the tests and linters pass on your machine.
4. Create a new branch.
5. Make your change, add tests, and make sure the tests still pass.
6. Push to your fork and open a pull request against the `main` branch.
7. Pat your self on the back and wait for your pull request to be reviewed and merged.

Here are a few things you can do that will increase the likelihood of your PR being accepted:

- Keep your changes as focused as possible. If there are multiple changes you would like to make that are not dependent upon each other, consider submitting them as separate pull requests.
- Write a [good commit message](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html).

"WIP" PRs are also welcome to get feedback early on, or if there is something blocking you.

## Acknowledgements

Special thanks to these amazing projects which help power Kukkee:

- [react-available-times](https://github.com/trotzig/react-available-times)
- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Vercel](https://vercel.com)
- [Day.js](https://day.js.org)
- [Bootstrap](https://getbootstrap.com)
- [MongoDB Atlas](https://www.mongodb.com)
- [Mongoose](https://mongoosejs.com)

## License

Kukkee is distributed under the [MIT License](https://github.com/Kukkee/Kukkee/blob/main/LICENSE).
