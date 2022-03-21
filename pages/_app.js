import Head from 'next/head'
import '../styles/index.scss'
import Layouts from "../components/Layouts"
function MyApp({ Component, pageProps }) {
  return <Layouts >
    <Head>
        <title>Mickey-House</title>
        <link rel="icon" type="image/x-icon" href="/favicon.svg" />
      </Head>
    <Component {...pageProps} />
  </Layouts>
}

export default MyApp
