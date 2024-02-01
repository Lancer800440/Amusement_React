import Navbar from "@/component/ride-navbar";
import Head from "next/head";
import Footer from "@/component/Footer/ride_footer";

export function Layout({ children }) {
  return (
    <>
      {/* <Head>
        <title>遊樂園網站</title>
      </Head> */}
      <Navbar />
      <div className="container">
        {children}
      </div>
      <Footer/>
    </>
  );
}
