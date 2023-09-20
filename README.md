<div align="center">
  <a href="https://www.kukkee.com/">
    <img
      src="./public/favicon.svg"
      alt="Kukkee Logo"
      height="64"
    />
  </a>
  <p>
    <b>
      Kukkee — free and open source meeting poll tool
    </b>
  </p>
  <p>

[![License](https://img.shields.io/github/license/Kukkee/Kukkee?color=%23000000&style=for-the-badge)](https://github.com/Kukkee/Kukkee/blob/main/LICENSE)
[![Polls created: 2500+](https://shields.io/badge/style-2500+-black?&style=for-the-badge&label=Polls%20created)](https://kukkee.com/)
[![Create a poll](https://shields.io/badge/style-Now-black?&style=for-the-badge&label=Create%20a%20poll)](https://kukkee.com/)

  </p>
  <br/>
</div>

Kukkee is a free and open source meeting poll tool to quickly find the perfect time which works for everyone without the back-and-forth texts/emails! Quickly create a meeting poll by choosing the time slots based on your availability. Copy and share the poll link with the participants to let them mark their availability. Find the most popular times and see who's free with "yes" votes - or who can be - with "if need be" votes, and book the meeting! Create a poll now at [Kukkee.com](https://kukkee.com/)!

## Motivation

After my GSoC '20 at LiberTEM, I wanted to have a video call with my mentors. They said yes, and since the next step was to find a suitable and common time, one of them sent me a link to a meeting poll created using a proprietary online service. It had surprisingly bad UX and was covered with advertisements. I searched for good, free and open source meeting poll tools, but didn't find any. So I decided to fix that problem.

## Get in touch

If you have suggestions for how Kukkee could be improved, please add your thoughts on a relevant discussion [here](https://github.com/Kukkee/Kukkee/discussions/) or start a new discussion. If you have any questions, I'd love to hear them too! If you want to report an issue, check if the issue is already opened [here](https://github.com/AnandBaburajan/Kukkee/issues) otherwise open a new one.

## Self-hosting

### Docker

Coming soon!

### Vercel and MongoDB Atlas

Kukkee is built with MongoDB and Next.js, so for a quick and free setup, you can use a free MongoDB Atlas cluster and Vercel's hobby plan.

You can get started with MongoDB Atlas for free [here](https://www.mongodb.com/basics/mongodb-atlas-tutorial). Make sure to add all IP addresses (0.0.0.0/0) to the IP access list of your Atlas cluster since it is not possible to determine the IP addresses of Vercel deployments.

You can get started with Vercel's hobby plan for free:

1. Fork this repo to your own GitHub account
2. Go to https://vercel.com/dashboard
3. Create a new project
4. Import your forked repository
5. Set the environment variables (according to the instructions in .env.example)
6. Deploy

## Contributing

### Development

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

8. Please make sure that you can make a full production build before opening a PR. You can build the project with:

   ```sh
   npm run build
   ```

## Acknowledgements

Thanks to FOSS United for selecting Kukkee as one of the [winning projects](https://forum.fossunited.org/t/foss-hack-3-0-results/1882) at FOSS Hack 3.0.

Thanks to these amazing projects which help power Kukkee:

- React-big-calendar
- React
- Next.js
- Day.js
- Bootstrap
- MongoDB
- Mongoose
- Inter
- Cal Sans

## License

Kukkee is distributed under the [MIT License](https://github.com/AnandBaburajan/Kukkee/blob/main/LICENSE).
