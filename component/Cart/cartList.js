import React from "react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { AB_LIST } from "@/component/cartConst";
import { FaChevronRight } from "react-icons/fa";
import styles from "@/component/Cart/cart_withing.module.css";
import Paystep1 from "../Userpay/Paystep/Paystep1";

export default function CartList() {
  // const [data, setData] = useState({});
  //變更數量
  const [cartQuantities, setCartQuantities] = useState({});
  const [applyCoupon, setApplyCoupon] = useState(false);
  const handleCouponCheckboxChange = () => {
    setApplyCoupon(!applyCoupon);
  };

  const [cartLS, setCartLS] = useState([]);
  useEffect(() => {
    const cartData = window.localStorage.getItem("cartData");
    const items = cartData ? JSON.parse(cartData) : [];
    setCartLS(items);

    // 初始化購物車數量
    const quantities = {};
    items.forEach((item) => {
      quantities[item.product_id] = item.user_buy_qty;
    });
    setCartQuantities(quantities);
  }, []);

  const decrementQuantity = (productId) => {
    if (cartQuantities[productId] > 1) {
      setCartQuantities({
        ...cartQuantities,
        [productId]: cartQuantities[productId] - 1,
      });
    }
  };

  const incrementQuantity = (productId) => {
    setCartQuantities({
      ...cartQuantities,
      [productId]: cartQuantities[productId] + 1,
    });
  };

  const removeItem = (productId) => {
    // 從cartLS裡移除item
    const updatedCart = cartLS.filter((item) => item.product_id !== productId);
    setCartLS(updatedCart);

    // 從cartQuantities裡移除數量
    const { [productId]: removedQuantity, ...updatedQuantities } =
      cartQuantities;
    setCartQuantities(updatedQuantities);
    window.localStorage.setItem("cartData", JSON.stringify(updatedCart));
  };

  return (
    <>
      <container className={styles.cartContainer}>
        <div className={styles.title}>購物車</div>
        <div className={styles.productDes}>
          <div>商品照片</div>
          <div className={styles.p_name}>商品名稱</div>
          <div className={styles.p_price}>單價</div>
          <div className={styles.p_amount}>數量</div>
          <div className={styles.p_totalPrice}>總計</div>
          <div className={styles.p_del}>刪除</div>
        </div>

        {cartLS.map((v, i) => {
          return (
            <div key={v.product_id}>
              {/* <pre>{JSON.stringify(v, null, 4)}</pre> */}
              <div className={styles.productIn}>
                <div className={styles.p_pic}>
                  <img src={`/images/product/list/${v.product_pic}`} />
                </div>
                <div className={styles.p_name}>{v.product_name}</div>
                <div className={styles.p_price}>{v.product_price}</div>
                <div className={styles.p_amount}>
                  <div>
                    <button onClick={() => decrementQuantity(v.product_id)}>
                      -
                    </button>
                  </div>
                  <div>
                    <button>{cartQuantities[v.product_id]}</button>
                  </div>
                  <div>
                    <button onClick={() => incrementQuantity(v.product_id)}>
                      +
                    </button>
                  </div>
                </div>
                <div className={styles.p_totalPrice}>
                  {v.product_price * cartQuantities[v.product_id]}
                </div>
                <div className={styles.p_del}>
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => {
                      removeItem(v.product_id);
                    }}
                  >
                    刪除
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        {/* <div>
          items: {cartData.totalItems} / total: {cartData.totalPrice}
          <br />
          {cartData.isEmpty && "購物車為空"}
          <hr />
        </div> */}
        <div>
          <div className={styles.title}>優惠券</div>

          <div className={styles.couponDes}>
            <div className={styles.c_name}>優惠券名稱</div>
            <div className={styles.c_price}>金額</div>
            <div className={styles.c_desc}>描述</div>
            <div className={styles.titleTotalPrice}>總計</div>
          </div>

          <div className={styles.coupon}>
            <div className={styles.c_name}>
              <input
                type="checkbox"
                className={styles.checkbox1}
                style={{ marginRight: "50px" }}
                onChange={handleCouponCheckboxChange}
              />
              {/* {i.ibon_name} */}$100折價券
            </div>
            <div className={styles.c_price}>$100</div>
            <div className={styles.c_desc}>消費$1000以上可使用</div>
            <div className={styles.totalPrice}>-$100</div>
          </div>
          <div className={styles.coupon}>
            <div className={styles.c_name}>
              <input
                type="checkbox"
                className={styles.checkbox1}
                style={{ marginRight: "50px" }}
                onChange={handleCouponCheckboxChange}
              />
              {/* {i.ibon_name} */}$200折價券
            </div>
            <div className={styles.c_price}>$200</div>
            <div className={styles.c_desc}>消費$2000以上可使用</div>
            <div className={styles.totalPrice}>-$200</div>
          </div>

          <div className={styles.totalDes}>
            <div className={styles.total}>總計</div>
            {cartLS.map((v, i) => {
              const productTotalPrice =
                v.product_price * cartQuantities[v.product_id];
              return <div key={v.product_id}></div>;
            })}

            <div className={styles.productTotalPrice}>
              {cartLS.reduce((total, v) => {
                const productTotalPrice =
                  v.product_price * cartQuantities[v.product_id];
                return total + productTotalPrice;
              }, 0) - (applyCoupon ? 100 : 0)}{" "}
            </div>

            <button className={styles.btn_checkout}>
              <a href="../userpay/list">去買單</a>
            </button>
          </div>
        </div>
      </container>
    </>
  );
}
