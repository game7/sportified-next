import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { trpc } from "../src/utils/trpc";
import styles from "../styles/Home.module.css";

// export const getServerSideProps = handle<Props>(async (ctx) => {
//   trpc.
//   return {
//     props: { message: "hi" },
//   };
// });

const Home: NextPage = () => {
  const message = trpc.useQuery(["hello"]);

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
        <div style={{ marginTop: 20, backgroundColor: "lime" }}>
          {message.isLoading ? "loading..." : message.data?.greeting}
        </div>
      </main>
    </div>
  );
};

export default Home;
