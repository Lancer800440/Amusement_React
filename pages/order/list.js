import { useState, useContext, useEffect, useCallback } from "react";
import { Layout } from "@/component/product-layout";
import { AB_ORDER, AB_ORDER_DETAILS } from "@/component/product-const";
import { useRouter } from "next/router";
import styles from "@/component/Order/Order.module.css";
import Card from "@/component/Order/Card";
import AuthContext from "@/context/auth-context";

export default function List() {
  const [data, setData] = useState({});
  const router = useRouter();
  const authContext = useContext(AuthContext);
  console.log(authContext);

  const getListData = useCallback(async () => {
    let page = +router.query.page || 1;

    if (page < 1) page = 1;

    try {
      const r = await fetch(AB_ORDER, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ user_id: authContext.parkAuth.id }),
      });
      const d = await r.json();
      // console.log("eddie", d);
      setData(d);
    } catch (ex) {
      console.log(ex);
    }
  }, [router.query.page, authContext]);

  useEffect(() => {
    if (authContext.parkAuth.id) {
      getListData();
    }
  }, [authContext, getListData]);

  return (
    <>
      {/* <pre>{JSON.stringify(data, null, 4)}</pre> */}
      <main className={styles.order_container}>
        <div className={styles.order_title}>訂單列表</div>
        <div className={styles.order_nav_head}>
          <div className={styles.order_nav_codeT}>訂單編號</div>
          <div className={styles.order_nav_titles}>
            <div>訂單日期</div>
            <div>訂單狀態</div>
            <div>訂單明細</div>
          </div>
        </div>

        {data.orders?.length &&
          data.orders.map((v) => <Card key={v.order_id} data={v} />)}
      </main>
    </>
  );
}
