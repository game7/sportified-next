import { GetServerSideProps, NextApiRequest, NextPage } from "next";
import { parseBody } from "next/dist/next-server/server/api-utils";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  console.log(ctx.req.method);
  console.log(ctx.query);
  const body = await parseBody(ctx.req as NextApiRequest, "1mb");
  console.log(JSON.stringify(body));
  return {
    props: {},
  };
  // return {
  //   notFound: true,
  // };
};

const Foobar: NextPage = () => {
  return (
    <div
      style={{
        width: 960,
        margin: "auto",
        marginTop: 40,
        border: "1px dashed #ccc",
        padding: 20,
      }}
    >
      <div>foobar!</div>
      <hr />
      <form method="POST" encType="application/x-www-form-urlencoded">
        <input type="text" name="text"></input>
        <button type="submit" name="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Foobar;
