import React, { useEffect } from "react";
import styles from "@/styles/user.module.css";
import Head from "next/head";
import AuthContext from "@/context/auth-context";
import { useState, useContext } from "react";
import { Layout } from "@/component/ride-layout";
import Link from "next/link";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function TicketUserBuy() {
  // 會員中心查看已購票券表格
  const { parkAuth, logout } = useContext(AuthContext);
  const router = useRouter();
  const Alert = withReactContent(Swal);
  const [data, setData] = useState({
    sid: 0,
    tc1_name: "",
    tc2_name: "",
    tc_amount: "",
    beginTime: "",
    endTime: "",
    description: "",
  });

  const [cartQuantities, setCartQuantities] = useState({});
  const [applyCoupon, setApplyCoupon] = useState(false);
  const handleCouponCheckboxChange = () => {
    setApplyCoupon(!applyCoupon);
  };

  const [cartLS, setCartLS] = useState([]);
  useEffect(() => {
    const ticketCartData = window.localStorage.getItem("ticketCartData");
    const items = ticketCartData ? JSON.parse(ticketCartData) : [];
    setCartLS(items);

    // 初始化購物車數量
    const quantities = {};
    items.forEach((item) => {
      quantities[item.sid] = item.user_buy_qty;
    });
    setCartQuantities(quantities);
  }, []);

  const decrementQuantity = (productId) => {
    if (cartQuantities[productId] > 1) {
      setCartQuantities({
        ...cartQuantities,
        [productId]: cartQuantities[productId] - 1,
      });

      // 更新cartLS中對應商品數量
      const updatedCart = cartLS.map((item) =>
        item.sid === productId
          ? { ...item, user_buy_qty: cartQuantities[productId] - 1 }
          : item
      );
      setCartLS(updatedCart);

      // 儲存更新後的cartLS到localStorage
      window.localStorage.setItem(
        "ticketCartData",
        JSON.stringify(updatedCart)
      );
    }
  };

  const incrementQuantity = (productId) => {
    setCartQuantities({
      ...cartQuantities,
      [productId]: cartQuantities[productId] + 1,
    });

    // 更新cartLS中對應商品數量
    const updatedCart = cartLS.map((item) =>
      item.sid === productId
        ? { ...item, user_buy_qty: cartQuantities[productId] + 1 }
        : item
    );
    setCartLS(updatedCart);

    // 儲存更新後的cartLS到localStorage
    window.localStorage.setItem("ticketCartData", JSON.stringify(updatedCart));
  };

  const removeItem = (productId) => {
    // 從cartLS裡移除item
    const updatedCart = cartLS.filter((item) => item.sid !== productId);
    setCartLS(updatedCart);

    // 從cartQuantities裡移除數量
    const { [productId]: removedQuantity, ...updatedQuantities } =
      cartQuantities;
    setCartQuantities(updatedQuantities);
    window.localStorage.setItem("ticketCartData", JSON.stringify(updatedCart));
  };

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
              <button className={styles.button}>會員訂單</button>
              <button className={styles.selected_button}>入園票券</button>
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
            <h2 className={styles.title}>入園票券</h2>
            <>
              <table className={styles.table}>
                <tbody>
                  <tr>
                    <th className={styles.th}>入園票種</th>
                    <th className={styles.th}>入園票名</th>
                    <th className={styles.th}>票券金額</th>
                    <th className={styles.th}>票券數量</th>
                    <th className={styles.th}>刪除票券</th>
                  </tr>
                  <td className={styles.td}>入園票</td>
                  <td className={styles.td}>成人票</td>
                  <td className={styles.td}>1000</td>
                  <td className={styles.td}>3</td>
                  <td className={styles.td}>
                    <button
                      className={styles.reservation_delete_button}
                      onClick={() => {
                        Alert.fire({
                          titleText: "確定要刪除預約嗎？",
                          showCancelButton: true,
                        }).then(() => {
                          removeItem(v.sid);
                        });
                      }}
                    >
                      取消票券
                    </button>
                  </td>
                  {cartLS.map((v, i) => {
                    return (
                      <tr key={v.sid}>
                        <td className={styles.td}>{v.tc1_name}</td>
                        <td className={styles.td}>{v.tc2_name}</td>
                        <td className={styles.td}>{v.tc_amount}</td>
                        <td className={styles.td}>{v.user_buy_qty}</td>
                        <td className={styles.td}>
                          <button
                            className={styles.reservation_delete_button}
                            onClick={() => {
                              Alert.fire({
                                titleText: "確定要刪除預約嗎？",
                                showCancelButton: true,
                              }).then(() => {
                                removeItem(v.sid);
                              });
                            }}
                          >
                            取消票券
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          </div>
        </div>
      </Layout>
      <Head>
        <title>會員中心</title>
      </Head>
    </>
  );
}
