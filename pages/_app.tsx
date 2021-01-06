import "../src/styles/global.css";
import "../src/styles/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AppProps } from "next/app";
import { useStore } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { wrapper } from "../src/store/store";

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  const store = useStore((state) => state);

  return (
    <PersistGate persistor={store.__persistor} loading={<div>Loading</div>}>
      <Component {...pageProps} />
    </PersistGate>
  );
};

export default wrapper.withRedux(App);
