import { AppProps } from "next/dist/next-server/lib/router/router";
import "../styles/globals.css";
import { Provider } from "next-auth/client";
import "semantic-ui-css/semantic.min.css";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
