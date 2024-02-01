import { useState, useEffect, useContext } from "react";
import { Layout } from "@/component/product-layout";
import { AB_ORDER_ADD, AB_711, AB_ECPAY } from "@/component/product-const";
import { useRouter } from "next/router";
import TicketPayStep from "@/component/Userpay/Paystep/ticketPaystep";
import styles from "@/component/Userpay/ticketUserPay.module.css";
import Link from "next/link";
import { useShip711StoreOpener } from "@/hooks/use-ship-711-store";
import AuthContext from "@/context/auth-context";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Head from "next/head";
import { HiChevronDown } from "react-icons/hi";
import { HiPlusSm } from "react-icons/hi";

export default function OrderADD() {
  const [getData, setGetData] = useState({
    sid: 0,
    tc1_name: "",
    tc2_name: "",
    tc_amount: "",
    beginTime: "",
    endTime: "",
    description: "",
  });
  const [cartQuantities, setCartQuantities] = useState({});
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

  const [cartNum, setCartNum] = useState("");
  const [cartName, setCartName] = useState("");
  const [saveNum, setSaveNum] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [cartPhone, setCartPhone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [telPhone, setTelPhone] = useState("");
  const [emailError, setEmailError] = useState("");
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [usertel, setUsertel] = useState("");
  const [usertelError, setUsertelError] = useState("");
  const [userphone, setUserphone] = useState("");
  const [userphoneError, setUserphoneError] = useState("");
  const [useraddress, setUseraddress] = useState("");
  const [useraddressError, setUseraddressError] = useState("");
  // const { setParkAuth } = useContext(AuthContext);
  const Alert = withReactContent(Swal);
  const router = useRouter();
  // const Alert = withReactContent(Swal);

  const { store711, openWindow } = useShip711StoreOpener(
    "http://localhost:3002/shipment/711"
  );
  // console.log(store711);

  const authContext = useContext(AuthContext);

  const checkEmail = (email) => {
    const emailRule =
      /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
    if (!email) {
      setEmailError("email為必填");
    } else if (email !== "" && email.search(emailRule) === -1) {
      setEmailError("email必須符合格式");
    } else {
      setEmailError("");
    }
  };

  const checkUsername = (username) => {
    const nameRule = /^[a-zA-Z0-9\s,.-]+$/;
    if (username === "") {
      setUsernameError("收件人名稱為必填");
    } else if (username !== "" && username.search(nameRule) === -1) {
      setUsernameError("收件人名稱必須符合格式");
    } else {
      setUsernameError("");
    }
  };

  const checkUserphone = (userphone) => {
    const phoneRule = /^09\d{8}$/;
    if (userphone === "") {
      setUserphoneError("收件人電話為必填");
    } else if (userphone !== "" && userphone.search(phoneRule) === -1) {
      setUserphoneError("收件人電話必須符合格式");
    } else {
      setUserphoneError("");
    }
  };

  const checkUsertel = (usertel) => {
    const telRule = /^\d{10}$/;
    if (usertel === "") {
      setUsertelError("收件人電話為必填");
    } else if (usertel !== "" && usertel.search(telRule) === -1) {
      setUsertelError("收件人電話必須符合格式");
    } else {
      setUsertelError("");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault(); // 不要讓表單以傳統的方式送出
    // console.log(e);
    let isPass = true;
    // 檢查格式
    const emailRule =
      /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
    if (!email) {
      isPass = false;
      setEmailError("email為必填");
    } else if (email !== "" && email.search(emailRule) === -1) {
      isPass = false;
      setEmailError("email必須符合格式");
    } else {
      setEmailError("");
    }

    const nameRule = /^[a-zA-Z0-9\s,.-]+$/;
    if (username === "") {
      isPass = false;
      setUsernameError("收件人名稱為必填");
    } else if (username !== "" && username.search(nameRule) === -1) {
      isPass = false;
      setUsernameError("收件人名稱必須符合格式");
    } else {
      setUsernameError("");
    }

    const phoneRule = /^09\d{8}$/;
    if (userphone === "") {
      isPass = false;
      setUserphoneError("收件人手機為必填");
    } else if (userphone !== "" && userphone.search(phoneRule) === -1) {
      isPass = false;
      setUserphoneError("收件人手機必須符合格式");
    } else {
      setUserphoneError("");
    }

    const telRule = /^\d{8}$/;
    if (usertel === "") {
      isPass = false;
      setUsertelError("收件人電話為必填");
    } else if (usertel !== "" && usertel.search(telRule) === -1) {
      isPass = false;
      setUsertelError("收件人電話必須符合格式");
    } else {
      setUsertelError("");
    }

    const addressRule = /^[a-zA-Z0-9\s,.-]+$/;
    if (useraddress === "") {
      isPass = false;
      setUseraddressError("收件人地址為必填");
    } else if (useraddress !== "" && useraddress.search(addressRule) === -1) {
      isPass = false;
      setUseraddressError("收件人地址必須符合格式");
    } else {
      setUseraddressError("");
    }

    const formElements = e.target.elements;

    console.log(formElements);
  };

  const [toggle1, setToggle1] = useState(false);
  const handleToggle1 = () => {
    setToggle1(true);
  };
  const [toggle2, setToggle2] = useState(false);
  const handleToggle2 = () => {
    setToggle2(true);
  };

  const handleCheckout = () => {
    Alert.fire({
      titleText: "購票完成!",
    });
    router.push("/user/userBuyTicket");
  };
  return (
    <div className={styles.w100}>
      <Layout>
        <TicketPayStep />

        {!toggle1 ? (
          <>
            <main className={styles.form_container}>
              <div className={styles.recipient_information}>
                <div className={styles.recipient_information_title1}>
                  購買票券 <HiChevronDown onClick={handleToggle1} />
                </div>
              </div>
            </main>
          </>
        ) : (
          <>
            <main className={styles.form_container}>
              <div className={styles.recipient_information}>
                <div className={styles.recipient_information_title1}>
                  購買票券 <HiChevronDown onClick={handleToggle1} />
                </div>
              </div>
            </main>
            <main className={styles.w80}>
              <div className={styles.form_container1}>
                <div className={styles.recipient_descs_ticketTitle}>
                  <div className={styles.recipient_descs_ticketTitle}>
                    票券種類
                  </div>
                  <div className={styles.recipient_descs_ticketTitle}>
                    票券名稱
                  </div>
                  <div className={styles.recipient_descs_ticketTitle}>單價</div>
                  <div className={styles.recipient_descs_ticketTitle}>數量</div>
                  <div className={styles.recipient_descs_ticketTitle}>總計</div>
                </div>
              </div>
              <hr />
              {cartLS.map((v, i) => {
                return (
                  <div key={v.sid}>
                    <div className={styles.recipient_descs_ticketContent}>
                      <div className={styles.recipient_descs_ticketTitle}>
                        {v.tc1_name}
                      </div>
                      <div className={styles.recipient_descs_ticketTitle}>
                        {v.tc2_name}
                      </div>
                      <div className={styles.recipient_descs_ticketTitle}>
                        {v.tc_amount}
                      </div>
                      <div className={styles.recipient_descs_ticketTitle}>
                        {cartQuantities[v.sid]}
                      </div>
                      <div className={styles.recipient_descs_ticketTitle}>
                        {v.tc_amount * cartQuantities[v.sid]}
                      </div>
                    </div>
                  </div>
                );
              })}
            </main>
          </>
        )}

        <main className={styles.form_container}>
          <div className={styles.recipient_information}>
            <div className={styles.recipient_information_title1}>
              收件人資料
              <div
                onClick={() => {
                  if (
                    email === "" ||
                    name === "" ||
                    phone === "" ||
                    telPhone === ""
                  ) {
                    setName("徐小顥");
                    setEmail("pigpig123@ispan.com");
                    setPhone("0981456678");
                    setTelPhone("0229291111");
                  } else {
                    setName("");
                    setEmail("");
                    setPhone("");
                    setTelPhone("");
                  }
                }}
              >
                <HiPlusSm className={styles.star} />
              </div>
            </div>
          </div>
        </main>

        <form onSubmit={onSubmit} className={styles.w101}>
          <main className={styles.w80}>
            <div className={styles.form_container1}>
              <div className={styles.recipient_descs}>
                <div className={styles.recipient_descs_title}>
                  <span>*</span> 收件人姓名
                </div>
                <div className={styles.recipient_descs_input}>
                  <input
                    type="text"
                    value={name}
                    placeholder="請輸入姓名"
                    onChange={(e) => {
                      checkUsername(e.target.value);
                      setUsername(e.target.value);
                    }}
                  />
                  <p style={{ color: "red", fontSize: 16 }}>{usernameError}</p>
                </div>
              </div>

              <div className={styles.recipient_descs}>
                <div className={styles.recipient_descs_title}>
                  <span>*</span> 收件人Email
                </div>
                <div className={styles.recipient_descs_input}>
                  <input
                    type="text"
                    value={email}
                    placeholder="請輸入Email"
                    onChange={(e) => {
                      checkEmail(e.target.value);
                      setEmail(e.target.value);
                    }}
                  />
                  <div style={{ color: "red", fontSize: 16 }}>{emailError}</div>
                </div>
              </div>
            </div>
            <div className={styles.form_container1}>
              <div className={styles.recipient_descs}>
                <div className={styles.recipient_descs_title}>
                  <span>*</span> 收件人手機
                </div>
                <div className={styles.recipient_descs_input}>
                  <input
                    type="text"
                    value={phone}
                    placeholder="請輸入手機"
                    onChange={(e) => {
                      checkUserphone(e.target.value);
                      setUserphone(e.target.value);
                    }}
                  />
                  <div style={{ color: "red", fontSize: 16 }}>
                    {userphoneError}
                  </div>
                </div>
              </div>

              <div className={styles.recipient_descs}>
                <div className={styles.recipient_descs_title}>
                  <span>*</span> 收件人電話
                </div>
                <div className={styles.recipient_descs_input}>
                  <input
                    type="text"
                    value={telPhone}
                    placeholder="請輸入電話"
                    onChange={(e) => {
                      checkUsertel(e.target.value);
                      setUsertel(e.target.value);
                    }}
                  />
                  <div style={{ color: "red", fontSize: 16 }}>
                    {usertelError}
                  </div>
                </div>
              </div>
            </div>
          </main>

          <main className={styles.form_container}>
            <div className={styles.logistics}>
              <div className={styles.logistics_title}>發票類型</div>
              <div className={styles.logistics_descs}>
                <div>
                  <input type="radio" name="bill" value="1" /> 雲端發票
                </div>
                <div>
                  <input type="radio" name="bill" value="2" /> 公司發票
                </div>
                <div className={styles.ml30}>
                  <input type="radio" name="bill" value="1" /> 發票捐贈
                </div>
              </div>
            </div>

            {!toggle2 ? (
              <>
                <div className={styles.logistics}>
                  <div className={styles.logistics_title}>付款方式</div>
                  <div className={styles.logistics_descs}>
                    <div>
                      <input type="radio" name="pay" value="1" /> 行動支付
                    </div>
                    <div>
                      <input
                        type="radio"
                        name="pay"
                        value="2"
                        onClick={handleToggle2}
                      />{" "}
                      信用卡支付
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className={styles.logistics}>
                  <div className={styles.logistics_title}>付款方式</div>
                  <div className={styles.logistics_descs}>
                    <div>
                      <input type="radio" name="pay" value="1" /> 行動支付
                    </div>
                    <div className={styles.mobilePayment}>
                      <input
                        type="radio"
                        name="pay"
                        value="2"
                        onClick={handleToggle2}
                      />{" "}
                      信用卡支付
                      <div
                        onClick={() => {
                          if (
                            cartNum === "" ||
                            cartName === "" ||
                            saveNum === "" ||
                            cartPhone === "" ||
                            month === "" ||
                            year === ""
                          ) {
                            setCartNum("3569 6962 2222 2222");
                            setCartName("徐小顥");
                            setSaveNum("0981456678");
                            setCartPhone("0229291111");
                            setMonth("11");
                            setYear("2028");
                          } else {
                            setCartNum("");
                            setCartName("");
                            setSaveNum("");
                            setCartPhone("");
                            setMonth("");
                            setYear("");
                          }
                        }}
                      >
                        <HiPlusSm className={styles.star} />
                      </div>
                    </div>
                  </div>
                </div>
                <main className={styles.w100} style={{ marginTop: 30 }}>
                  <div className={styles.form_container1}>
                    <div className={styles.recipient_descs}>
                      <div className={styles.recipient_descs_title}>
                        信用卡號碼
                      </div>
                      <div className={styles.recipient_descs_input}>
                        <input
                          type="text"
                          value={cartNum}
                          placeholder="XXXX XXXX XXXX XXXX"
                        />
                      </div>
                    </div>

                    <div className={styles.recipient_descs}>
                      <div className={styles.recipient_descs_title}>
                        持卡人姓名
                      </div>
                      <div className={styles.recipient_descs_input}>
                        <input
                          type="text"
                          value={cartName}
                          placeholder="請輸入持卡人姓名"
                        />
                      </div>
                    </div>
                  </div>

                  <div className={styles.form_container1}>
                    <div className={styles.recipient_descs_input}>
                      <div className={styles.recipient_descs_inputTitle}>
                        有效年月
                      </div>
                      <div className={styles.recipient_descs_dateInput}>
                        <input type="text" value={month} placeholder="MM∇" />
                        <input type="text" value={year} placeholder="YYYY∇" />
                      </div>
                    </div>

                    <div className={styles.recipient_descs}>
                      <div className={styles.recipient_descs_title}>安全碼</div>
                      <div className={styles.recipient_descs_input}>
                        <input
                          type="text"
                          value={saveNum}
                          placeholder="請輸入安全碼"
                        />
                      </div>
                    </div>
                  </div>
                  <div className={styles.form_container1}>
                    <div className={styles.recipient_descs}>
                      <div className={styles.recipient_descs_title}>
                        手機號碼
                      </div>
                      <div className={styles.recipient_descs_input}>
                        <input
                          type="text"
                          value={cartPhone}
                          placeholder="請輸入手機號碼"
                        />
                      </div>
                    </div>
                  </div>
                </main>
              </>
            )}

            <div className={styles.total_container}>
              <div className={styles.total_info}>
                <p>總計</p>
                {cartLS.map((v, i) => {
                  return (
                    <div key={v.sid}>
                      <div className={styles.totalPrice}>
                        ${v.tc_amount * cartQuantities[v.sid]}
                      </div>
                    </div>
                  );
                })}
                <p className={styles.pay_button}>
                  <button
                    className={styles.pay_button_word}
                    onClick={handleCheckout}
                  >
                    結帳
                  </button>
                </p>
              </div>
            </div>
          </main>
        </form>
        <Head>
          <title>入園票券購買</title>
        </Head>
      </Layout>
    </div>
  );
}
