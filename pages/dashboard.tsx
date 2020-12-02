import Link from 'next/link'

export default function dashboard() {
  return <div>
    <h1>Dashboard</h1>
    <h3><Link href="/"><a>Landing page</a></Link></h3>
  </div>
}
