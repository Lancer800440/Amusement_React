import styles from "@/styles/user.module.css";
import Head from "next/head";
import AuthContext from "@/context/auth-context";
import { useState, useContext } from "react";
import { Layout } from "@/component/ride-layout";
import Link from "next/link";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  USER_RESERVATION,
  USER_RESERVATION_DELET,
} from "@/component/ride-const";
import { FaFileLines } from "react-icons/fa6";

export default function UserShowReservation() {
  // 會員中心查看表演預約表格
  const { parkAuth, logout } = useContext(AuthContext);
  const router = useRouter();
  const Alert = withReactContent(Swal);
  const [data, setData] = useState({
    show_reserve_id: 0,
    show_name: "",
    show_day: "",
    start: "",
    finish: "",
    seat_number: "",
  });
  const getListData = async () => {
    // const usp = new URLSearchParams(router.query)

    let page = +router.query.page || 1;

    if (page < 1) page = 1;

    if (parkAuth.id) {
      try {
        const r = await fetch(
          USER_RESERVATION + "?" + `user_id=${parkAuth.id}`
        );
        const d = await r.json();
        setData(d);
        // console.log(d)
        if (!d.rows) {
          Alert.fire({
            titleText: "您沒有預約紀錄",
            text: "要前往預約嗎？",
            showCancelButton: true,
          }).then((check) => {
            if (check.isConfirmed) {
              router.push("/show");
            }
          });
        }
      } catch (ex) {
        console.log(ex);
      }
    }
  };

  useEffect(() => {
    getListData();
  }, [parkAuth]);

  const checkRemove = (show_reserve_id) => {
    Alert.fire({
      titleText: "確定要刪除預約嗎？",
      showCancelButton: true,
    }).then((check) => {
      if (check.isConfirmed) {
        removeItemAndReload(show_reserve_id);
      }
    });
  };
  const removeItemAndReload = async (show_reserve_id) => {
    console.log({ show_reserve_id });
    const r = await fetch(USER_RESERVATION_DELET + "/" + show_reserve_id, {
      method: "DELETE",
    });
    const result = await r.json();
    console.log(result);
    if (result.success) {
      getListData();
      Alert.fire({
        titleText: "成功刪除預約",
        text: "去看看其他表演？",
        showCancelButton: true,
      }).then((check) => {
        if (check.isConfirmed) {
          router.push("/show");
        }
      });
      // router.reload(); 避免重載
    }
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
              <Link href="/user/userorder">
                <button className={styles.button}>會員訂單</button>
              </Link>

              <button className={styles.button}>優惠券</button>
              <button className={styles.button}>我的收藏</button>
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
              <button className={styles.selected_button}>表演預約</button>
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
            <h2 className={styles.title}>表演預約</h2>
            {data.rows && data.rows.length > 0 ? (
              <>
                <table className={styles.table}>
                  <tbody>
                    <tr>
                      <th className={styles.th}>演出節目</th>
                      <th className={styles.th}>演出日期</th>
                      <th className={styles.th}>演出時段</th>
                      <th className={styles.th}>演出地點</th>
                      <th className={styles.th}>預約座位</th>
                      <th className={styles.th}>查看表演資訊</th>
                      <th className={styles.th}>取消預約</th>
                    </tr>
                    {data.rows &&
                      data.rows.map((i) => {
                        return (
                          <tr key={i.show_reserve_id}>
                            <td className={styles.td}>{i.show_name}</td>
                            <td className={styles.td}>{i.show_day}</td>
                            <td className={styles.td}>
                              {i.start}-{i.finish}
                            </td>
                            <td className={styles.td}>廣場旁演藝廳</td>
                            <td className={styles.td}>
                              {i.seat_number.join(",")}
                            </td>
                            <td className={styles.td}>
                              <button
                                className={styles.show_info_button}
                                onClick={() => {
                                  router.push(`/show_reservation/${i.show_id}`);
                                }}
                              >
                                點我看表演資訊
                              </button>
                            </td>
                            <td className={styles.td}>
                              <button
                                className={styles.reservation_delete_button}
                                onClick={() => checkRemove(i.show_reserve_id)}
                              >
                                取消預約
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </>
            ) : (
              <>
                <div className={styles.center_column}>
                  <img src="/images/Document.png" height={100} width={100} />
                  <p>沒有預約資料</p>
                  <Link href="/show">
                    <p style={{ color: "#d7627b" }}>
                      前往查看目前可以預約的表演
                    </p>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </Layout>
      <Head>
        <title>會員中心</title>
      </Head>
    </>
  );
}
