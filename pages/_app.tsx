import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";

import "../src/styles/global.scss";

const App = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps): JSX.Element => {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default App;
