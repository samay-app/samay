import "../styles/global.css";
import "../styles/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AppProps } from "next/app";

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  return <Component {...pageProps} />;
};

export default App;
