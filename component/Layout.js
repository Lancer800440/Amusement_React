import Head from "next/head";
import Navbar from "@/component/Navbar/Navbar"
import Footer from "@/component/Footer/Footer";
import styles from '@/component/Icon-nav/Icon-nav.module.css'


export function Layout({ children }) {
  return (
    <>
      <Head>
        <title>豬豬的網站</title>
      </Head>
      <Navbar /> 
      <div className={styles.product_container}>{children}</div>
      <Footer />
    </>
  );
}
