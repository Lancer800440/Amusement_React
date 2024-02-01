import React from "react";
import { useState, useEffect } from "react";
import { FaChevronRight } from "react-icons/fa";
import styles from "@/component/Cart/ticketCart_withing.module.css";

export default function TicketCartList() {
  // const [data, setData] = useState({});
  //變更數量
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
      <container className={styles.cartContainer}>
        <div className={styles.title}>票券</div>
        <div className={styles.productDes}>
          <div>票券種類</div>
          <div className={styles.p_name}>票券名稱</div>
          <div className={styles.p_price}>單價</div>
          <div className={styles.p_amount}>數量</div>
          <div className={styles.p_totalPrice}>總計</div>
          <div className={styles.p_del}>刪除</div>
        </div>

        {cartLS.map((v, i) => {
          return (
            <div key={v.sid}>
              <div className={styles.productIn}>
                <div className={styles.p_pic}>{v.tc1_name}</div>
                <div className={styles.p_name}>{v.tc2_name}</div>
                <div className={styles.p_price}>{v.tc_amount}</div>
                <div className={styles.p_amount}>
                  <div>
                    <button className={styles.changeNumber} onClick={() => decrementQuantity(v.sid)}>-</button>
                  </div>
                  <div>
                    <button className={styles.cartNumber}>{cartQuantities[v.sid]}</button>
                  </div>
                  <div>
                    <button className={styles.changeNumber} onClick={() => incrementQuantity(v.sid)}>+</button>
                  </div>
                </div>
                <div className={styles.p_totalPrice}>
                  {v.tc_amount * cartQuantities[v.sid]}
                </div>
                <div className={styles.p_del}>
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => {
                      removeItem(v.sid);
                    }}
                  >
                    刪除
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        <div>
          <div className={styles.totalDes}>
            <div className={styles.total}>總計</div>
            {cartLS.map((v, i) => {
              const productTotalPrice = v.tc_amount * cartQuantities[v.sid];
              return (
                <div key={v.sid}>
                  <div className={styles.productTotalPrice}>
                    {applyCoupon ? productTotalPrice - 100 : productTotalPrice}
                  </div>
                </div>
              );
            })}

            <button className={styles.btn_checkout}>
              <a href="../userpay/ticketUserPayList">去買單</a>
            </button>
          </div>
        </div>
      </container>
    </>
  );
}
