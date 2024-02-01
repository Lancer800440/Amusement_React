import React from "react";
import Link from "next/link";
import styles from "@/styles/user.module.css";
import Head from "next/head";
import AuthContext from "@/context/auth-context";
import { useContext } from "react";
import { USER_GET_ONE, USER_EDIT } from "@/component/ride-const";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Layout } from "@/component/ride-layout";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function UserEditInfo() {
  const { parkAuth, logout } = useContext(AuthContext);
  const [data, setData] = useState({
    user_name: "",
    user_email: "",
    user_password: "",
    rePassword: "",
    birthday: "",
    phone: "",
    address: "",
    user_nickname: "",
  });
  const router = useRouter();
  const Alert = withReactContent(Swal);
  // const [displayInfo, setDisplayInfo] = useState(""); // "", "succ", "fail"
  const changeHandler = (e) => {
    const { name, id, value } = e.target;
    console.log({ name, id, value });
    // setDisplayInfo("");
    setData({ ...data, [id]: value });
  };
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const checkName = () => {
    if (data.user_name === "") {
      setNameError("姓名為必填");
    } else {
      setNameError("");
    }
  };

  const checkPhone = () => {
    const phoneRule = /^09\d{8}$/;
    if (data.phone !== "" && data.phone.search(phoneRule) === -1) {
      setPhoneError("手機號碼不符合格式");
    }
    if (
      data.phone === "" ||
      (data.phone !== "" && data.phone.search(phoneRule) !== -1)
    ) {
      setPhoneError("");
    }
  };

  useEffect(() => {
    checkName;
  }, [data.user_name]);

  // useEffect(()=>{
  //   checkEmail
  // },[data.user_email])

  useEffect(() => {
    checkPhone;
  }, [data.phone]);

  useEffect(() => {
    if (parkAuth.email) {
      const user_id = +router.query.user_id;
      if (!user_id) {
        router.push("/");
      } else {
        fetch(USER_GET_ONE + "/" + user_id)
          .then((r) => r.json())
          .then((data) => {
            if (!data.success) {
              router.push("/");
            } else {
              setData({ ...data.row });
            }
          })
          .catch((ex) => console.log(ex));
      }
    }
  }, [router.query.user_id]);

  useEffect(() => {
    if (!parkAuth.email && !data) {
      Alert.fire({
        didOpen: () => {
          Alert.fire({
            titleText: "尚未登入",
            text: "前往登入",
          }),
            Alert.fire({
              titleText: "尚未登入",
              text: "前往登入",
              willClose: () => {
                router.push("/login");
              },
            });
        },
      });
    }
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    // TODO: 檢查各個欄位的資料
    let ispass = true;
    if (data.user_name.trim().length == 0) {
      setNameError("姓名為必填");
      ispass = false;
    }

    const phoneRule = /^09\d{8}$/;
    if (data.phone !== "" && data.phone.search(phoneRule) === -1) {
      setPhoneError("手機號碼不符合格式");
      ispass = false;
    }

    if (!ispass) {
      // setDisplayInfo("fail");
      Alert.fire({
        didOpen: () => {
          Alert.fire({
            titleText: "編輯失敗",
            text: "請檢查輸入的資料是否符合格式",
          });
        },
      });
    }
    if (ispass) {
      const user_id = +router.query.user_id;
      const r = await fetch(USER_EDIT + "/" + user_id, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = await r.json();
      if (responseData.success) {
        // setDisplayInfo("succ");
        Alert.fire({
          didOpen: () => {
            Alert.fire({
              titleText: "編輯成功",
              text: "前往確認資料",
            }),
              Alert.fire({
                titleText: "編輯成功",
                text: "前往確認資料",
                willClose: () => {
                  router.push("/user");
                },
              });
          },
        });
      } else {
        // setDisplayInfo("fail");
        Alert.fire({
          didOpen: () => {
            Alert.fire({
              titleText: responseData.result,
              text: responseData.error,
            });
          },
        });
      }
    }
  };
  return (
    <Layout>
      <div style={{ padding: 30 }} className={styles.flex_center}>
        <div className={styles.left_section}>
          <div className={styles.user_info}>
            <img className={styles.img} src="/images/user/profile.png" />
            <p>{data.user_nickname}</p>
            <p>{data.user_email}</p>
          </div>
          <div className={styles.column}>
            <Link href="/user">
              <button className={styles.button}>會員資料</button>
            </Link>
            <Link href='/user/userorder'>
              <button className={styles.button}>會員訂單</button>
            </Link>
            <Link href='/user/userBuyTicket'>
                <button className={styles.button}>入園票券</button>
              </Link>
            <button className={styles.selected_button}>修改資料</button>
            <button
              className={styles.button}
              onClick={() => {
                if (parkAuth.email) {
                  router.push(`/user/show_reservation`);
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
              表演預約
            </button>
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
          <h2 className={styles.title}>編輯會員資料</h2>

          <form name="form1" onSubmit={onSubmit}>
            <div className={styles.flex}>
              <div style={{ width: 700 }}>
                <label htmlFor="user_name">
                  <div>
                    <span className={styles.red}>*</span>會員姓名：
                  </div>
                  <input
                    type="text"
                    className={styles.input}
                    id="user_name"
                    name="user_name"
                    value={data.user_name}
                    onChange={changeHandler}
                    onKeyUp={checkName}
                    placeholder="請輸入真實姓名"
                  />
                  <p style={{ color: "red", fontSize: 16 }}>{nameError}</p>
                </label>

                <label htmlFor="user_nickname" className={styles.label_flex}>
                  小名：
                  <br />
                  <input
                    className={styles.input}
                    placeholder="小名"
                    type="text"
                    id="user_nickname"
                    name="user_nickname"
                    value={data.user_nickname}
                    onChange={changeHandler}
                  />
                </label>

                <label htmlFor="user_phone" className={styles.label_flex}>
                  手機號碼：
                  <br />
                  <input
                    type="text"
                    className={styles.input}
                    id="phone"
                    name="phone"
                    value={data.phone}
                    onChange={changeHandler}
                    onKeyUp={checkPhone}
                    placeholder="請輸入手機號碼"
                  />
                </label>
                <p style={{ color: "red", fontSize: 16 }}>{phoneError}</p>
                <label htmlFor="birthday" className={styles.label_flex}>
                  生日：
                  <br />
                  <input
                    type="date"
                    className={styles.input}
                    id="birthday"
                    name="birthday"
                    value={data.birthday}
                    onChange={changeHandler}
                  />
                </label>

                <label htmlFor="address" className={styles.label_flex}>
                  地址：
                  <br />
                  <input
                    type="text"
                    className={styles.input}
                    id="address"
                    name="address"
                    value={data.address}
                    onChange={changeHandler}
                    placeholder="請輸入地址"
                  />
                </label>
              </div>
            </div>

            <div className={styles.flex}>
              <button type="submit" className={styles.form_button}>
                確定
              </button>
              {/* {displayInfo ? (
                    displayInfo === "succ" ? (
                      <div>
                        資料修改成功
                      </div>
                    ) : (
                      <div style={{color:'red'}}>
                        資料沒有修改
                      </div>
                    )
                  ) : null} */}
            </div>
          </form>
        </div>
      </div>
      <Head>
        <title>會員中心</title>
      </Head>
    </Layout>
  );
}
