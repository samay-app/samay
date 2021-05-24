import Document, { Html, Head, Main, NextScript } from "next/document";

class CustomDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
          <script async src="https://apis.google.com/js/api.js" />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
