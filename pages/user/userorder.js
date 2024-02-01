import styles from "@/styles/user.module.css";
import Head from "next/head";
import AuthContext from "@/context/auth-context";
import { useState, useContext, useEffect, useCallback } from "react";
import { Layout } from "@/component/ride-layout";
import Link from "next/link";
import { useRouter } from "next/router";
import { AB_ORDER, AB_ORDER_DETAILS } from "@/component/product-const";
import Card from "@/component/Order/Card";

export default function TicketUserBuy() {
  // 會員中心查看已購票券表格
  const { parkAuth, logout } = useContext(AuthContext);
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
      <Layout>
        <div style={{ padding: 30 }} className={styles.flex_center}>
          <div className={styles.left_section}>
            <div className={styles.user_info}>
              <img className={styles.img} src="/images/user/profile.png" />
              <p>{parkAuth.nickname}</p>
              <p>{parkAuth.email}</p>
            </div>
            <div className={styles.column}>
              <Link href="/user">
                <button className={styles.button}>會員資料</button>
              </Link>
              <Link href='/user/userorder'>
                <button className={styles.selected_button}>會員訂單</button>
              </Link>
              <button
                className={styles.button}
                onClick={() => {
                  if (parkAuth.email) {
                    router.push(`/user/edit/${parkAuth.id}`);
                  } else {
                    Alert.fire({
                      didOpen: () => {
                        Alert.fire({
                          titleText: "您尚未登入",
                          text: "前往登入",
                        }),
                          Alert.fire({
                            titleText: "您尚未登入",
                            text: "前往登入",
                            willClose: () => {
                              router.push("/login");
                            },
                          });
                      },
                    });
                  }
                }}
              >
                修改資料
              </button>
              <button className={styles.button}>表演預約</button>
              <button
                className={styles.button}
                onClick={(e) => {
                  e.preventDefault();
                  logout();
                  Alert.fire({
                    didOpen: () => {
                      Alert.fire({
                        titleText: "登出成功",
                        text: "前往首頁",
                      }),
                        Alert.fire({
                          titleText: "登出成功",
                          text: "前往首頁",
                          willClose: () => {
                            router.push("/");
                          },
                        });
                    },
                  });
                }}
              >
                登出
              </button>
            </div>
          </div>
          <div className={styles.info_section}>
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
          </div>
        </div>
      </Layout>
      <Head>
        <title>會員中心</title>
      </Head>
    </>
  );
}
