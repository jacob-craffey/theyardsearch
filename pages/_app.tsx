import type { AppProps } from "next/app";
import { Nunito_Sans } from "next/font/google";
import { Layout } from "../components/Layout";

const nunitoSans = Nunito_Sans({ subsets: ["latin"] });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <div className={nunitoSans.className}>
        <Component {...pageProps} />
      </div>
    </Layout>
  );
}

export default MyApp;
