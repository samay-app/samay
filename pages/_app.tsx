import "../src/styles/global.css";
import "../src/styles/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AppProps } from "next/app";
import { useStore } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { wrapper } from "../src/store/store";

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  const store = useStore();
  const persistor = persistStore(store);

  return (
    <PersistGate persistor={persistor} loading={<div>Loading</div>}>
      <Component {...pageProps} />
    </PersistGate>
  );
};
export default wrapper.withRedux(App);
