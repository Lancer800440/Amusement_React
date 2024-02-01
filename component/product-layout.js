import Navbar from "@/component/ride-navbar";
import Head from "next/head";
import Footer from "@/component/Footer/ride_footer";
import styles from '@/component/Icon-nav/Icon-nav.module.css'

export function Layout({ children }) {
  return (
    <>
      {/* <Head>
        <title>遊樂園網站</title>
      </Head> */}
      <Navbar />
      <div className={styles.product_container}>{children}</div>
      <Footer/>
    </>
  );
}
