import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Sportified</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Sportified</h1>
        <Link href="/admin/pages">
          <a href="">Admin/Pages</a>
        </Link>
      </main>
    </div>
  );
};

export default Home;
