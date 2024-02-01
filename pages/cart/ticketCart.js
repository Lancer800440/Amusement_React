import CartList from "@/component/Cart/ticketCartList";
import styles from "@/component/Cart/cart_withing.module.css";
import { Layout } from "@/component/ride-layout";
import Head from "next/head";
import TicketCartPayStep from "@/component/Cart/ticketCartPayStep";

export default function Cart() {
  return (
    <>
      <Layout>
        <TicketCartPayStep />
        <div className={styles["container"]}>
          <div className={styles["cart"]}>
            <CartList />
          </div>
        </div>
        <Head>
          <title>入園票券購買</title>
        </Head>
      </Layout>
    </>
  );
}
