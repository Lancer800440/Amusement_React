import React from "react";
import styles from "@/styles/ticket_detail.module.css";
import Head from "next/head";
import { TICKET_GET_ONE, TICKET_LIST } from "@/component/ticketConst";
import { useState, useEffect, useContext } from "react";
import AuthContext from "@/context/auth-context";
import { useRouter } from "next/router";
import Link from "next/link";
import { Layout } from "@/component/ride-layout";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function TicketDetail() {
  // 票券詳細頁預約頁面
  const [getData, setGetData] = useState({
    sid: 0,
    tc1_name: "",
    tc2_name: "",
    tc_amount: "",
    beginTime: "",
    endTime: "",
    description: "",
  });
  const { parkAuth } = useContext(AuthContext);
  const Alert = withReactContent(Swal);
  const [cartQuantity, setCartQuantity] = useState(1);

  const router = useRouter();

  useEffect(() => {
    // 取得該筆表演的詳細資料
    const sid = +router.query.sid;
    console.log({ sid, raw: router.query.sid });
    // 有抓到值時
    if (router.query.sid !== undefined) {
      if (!sid) {
        router.push("/ticket"); //sid 是 NaN 就跳到列表頁
      } else {
        // 取得單筆資料
        fetch(TICKET_GET_ONE + "/" + sid)
          .then((r) => r.json())
          .then((data) => {
            if (!data.success) {
              router.push("/ticket"); // 沒拿到資料, 跳到列表頁
            } else {
              setGetData({ ...data.row });
            }
          })
          .catch((ex) => console.log(ex));
      }
    }
  }, [router.query.sid]);

  const onSubmit = async (e) => {
    e.preventDefault();
    let ispass = true;
    if (!parkAuth.id || parkAuth.id === 0) {
      Alert.fire({
        didOpen: () => {
          Alert.fire({
            titleText: "購買失敗",
            text: "請先登入會員才能購票喔!",
          }),
            Alert.fire({
              titleText: "購買失敗",
              text: "請先登入會員才能購票喔!",
              willClose: () => {
                router.push("/login");
              },
            });
        },
      });
      return (ispass = false);
    } else {
      // 加入導向至"/ticketCart"
      router.push("/cart/ticketCart");

      setNewLocalS({
        tc1_id: getData.tc1_id,
        tc1_name: getData.tc1_name,
        tc2_name: getData.tc2_name,
        tc_amount: getData.tc_amount,
        subTotalPrice: getData.tc_amount * cartQuantity,
        user_buy_qty: cartQuantity,
      });
    }
  };

  const setNewLocalS = (selectProduct) => {
    //判斷購物車是否有資料 =>如果有 :
    if (localStorage.getItem("ticketCartData")) {
      // 判斷這個商品有沒有被加進購物車
      let nowCart = JSON.parse(localStorage.getItem("ticketCartData"));
      // 找有沒有在購物車裡
      let result = nowCart.find((d) => {
        if (d.product_id === selectProduct.product_id) {
          return true;
        }
        return false;
      });
      if (result) {
        // 如果有相同商品 => 更新數量
        nowCart.map((v) => {
          if (v.product_id === selectProduct.product_id) {
            v.user_buy_qty += selectProduct.user_buy_qty;
            v.subTotalPrice +=
              selectProduct.user_buy_qty * selectProduct.product_price;
          }
        });
        localStorage.setItem("ticketCartData", JSON.stringify(nowCart));
      } else {
        // 如果沒有相同商品 => 將就的購物車+選擇的這個商品
        const newSelect = [...nowCart, selectProduct];
        localStorage.setItem("ticketCartData", JSON.stringify(newSelect));
      }
      Alert.fire({
        titleText: "加入購物車",
        text: `成功加入${cartQuantity}筆進購物車！`,
      });
    } else {
      // 購物車沒東西 => 將選擇商品加進去
      const array = [selectProduct];
      localStorage.setItem("ticketCartData", JSON.stringify(array));

      Alert.fire({
        titleText: "加入購物車",
        text: `成功加入${cartQuantity}筆進購物車！`,
      });
      // alert(`成功加入${cartQuantity}筆進購物車！`);
    }
  };

  return (
    <>
      <div key={getData.sid}>
        <Layout>
          <div className={styles.contain}>
            <div style={{ width: 1200 }}>
              <img
                className={styles.img}
                width="100%"
                height={300}
                src={"/images/ticket/detailsbgi.jpg"}
              />
              <div className={styles.space_between}>
                <h2 className={styles.title}>《{getData.tc2_name}》</h2>
                <Link href={"/ticket"}>
                  <button className={styles.button} style={{ width: 150 }}>
                    返回列表頁
                  </button>
                </Link>
              </div>

              <h3 style={{ marginBottom: 20 }}>購票資訊</h3>
              <div style={{ lineHeight: 2 }}>
                <p>票種 : {getData.tc1_name}</p>
                <p>票名 : {getData.tc2_name}</p>
                <p>票券金額 : {getData.tc_amount}</p>
                <p>
                  演出時間：{getData.beginTime} 至 {getData.endTime}
                </p>
                <p>票種與購票說明 : {getData.description}</p>
              </div>
              <div className={styles.buyTicket}>
                <Link href={"/cart/ticketCart"}>
                  <button onClick={onSubmit} className={styles.button}>
                    購買
                  </button>
                </Link>
              </div>
              <Head>
                <title>票券詳細資訊</title>
              </Head>
            </div>
          </div>
        </Layout>
      </div>
    </>
  );
}
