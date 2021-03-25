import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { signIn, signOut, useSession } from 'next-auth/client'
import Link from 'next/link'

export default function Home() {
  const [ session, loading ] = useSession()
  return (
    <div className={styles.container}>
      <Head>
        <title>Sportified</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Sportified
        </h1>
        <Link href="/admin/pages">
          <a href="">Admin/Pages</a>
        </Link>
      </main>

    </div>
  )
}
