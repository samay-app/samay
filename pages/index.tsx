import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>RocketMeet</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          <Link href="/"><a>RocketMeet</a></Link>
        </h1>

        <div className="grid">
          <Link href="/poll/create">
            <a className="card">
              <h3>Create a poll &rarr;</h3>
            </a>
          </Link>

          <Link href="/help">
            <a className="card">
              <h3>How it works &rarr;</h3>
            </a>
          </Link>

          <Link href="/dashboard">
            <a className="card">
              <h3>Dashboard &rarr;</h3>
            </a>
          </Link>

        </div>
      </main>

      <footer>
        Footer
      </footer>

    </div>
  )
}
