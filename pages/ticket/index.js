import Head from "next/head";
import styles from "@/styles/ticket.module.css";
import { Layout } from "@/component/ride-layout";
import { TICKET_LIST } from "@/component/ticketConst";
import { useRouter } from "next/router";
import { useState, useContext, useEffect } from "react";
import Link from "next/link";

export default function Ticket() {
  const [data, setData] = useState({});
  const router = useRouter();
  const getListData = async () => {
    try {
      const r = await fetch(TICKET_LIST);
      const d = await r.json();
      // console.log(value)
      setData(d);
    } catch (ex) {
      console.log(ex);
    }
  };
  useEffect(() => {
    getListData();
  }, []);
  return (
    <>
      <Layout>
        <div className={styles.contain}>
          <img
            className={styles.head_img}
            width="100%"
            height={300}
            src={"/images/ticket/amusement-park.jpg"}
          />
          <h2 className={styles.title}>入園票券</h2>
          <div className={styles.card_contain}>
            <div className={styles.card_flex}>
              {data.rows &&
                data.rows.map((i) => {
                  return (
                    <div key={i.sid}>
                      <Link href={`/ticket/details/${i.sid}`}>
                        <div className={styles.card}>
                          <img
                            className={styles.card_img}
                            src={"/images/ticket/ticket.jpg"}
                          />
                          <div style={{ padding: 10 }}>
                            <div className={styles.card_title}>
                              {i.tc1_name} : 《{i.tc2_name}》
                            </div>
                            <div className={styles.card_title}>
                              售票金額 : {i.tc_amount}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </Layout>
      <Head>
        <title>購票資訊</title>
      </Head>
    </>
  );
}
