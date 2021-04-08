import { AppProps } from "next/dist/next-server/lib/router/router";
import "../styles/globals.css";
import { Provider } from "next-auth/client";
import "semantic-ui-css/semantic.min.css";
import { withTRPC } from "@trpc/next";
import { AppRouter } from "./api/rpc/[trpc]";

const SportifiedNext = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default withTRPC<AppRouter>(({}) => {
  if (process.browser) {
    return {
      url: "/api/rpc",
      getHeaders() {
        return {
          "x-powered-by": "sportified",
        };
      },
    };
  }
  return {
    url: "http://localhost:3000/api/trpc",
    getHeaders() {
      return {
        "x-powered-by": "sportified",
      };
    },
  };
})(SportifiedNext);
