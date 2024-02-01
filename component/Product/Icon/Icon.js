import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "@/component/Product/Icon/Icon.module.css";
import { FaRegHeart } from "react-icons/fa";
import { IoCart } from "react-icons/io5";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function Icon({ data }) {
  console.log("913", data);
  const [getData, setGetData] = useState({
    product_id: "",
    product_name: "",
    product_pic: [],
    product_size: "",
    product_color: "",
    stock_quantity: "",
    product_description: "",
  });
  const [cartQuantity, setCartQuantity] = useState(1);
  const Alert = withReactContent(Swal);

  const router = useRouter();

  useEffect(() => {
    const product_id = +router.query.product_id || 1;
    // console.log({ product_id, row: router.query.product_id });
    // 有抓到值時
    if (router.query.product_id !== undefined) {
      if (!product_id) {
        router.push("/product/list"); // product_id 是 NaN 就跳到列表頁
      } else {
        // 取得單筆資料
        fetch(AB_LIST + "/" + product_id)
          .then((r) => r.json())
          .then((data) => {
            if (!data.success) {
              router.push("/product/list"); // 沒拿到資料, 跳到列表頁
            } else {
              setGetData({ ...data.row });
            }
          })
          .catch((ex) => console.log(ex));
      }
    }
  }, [router]);

  const setNewLocalS = (selectProduct) => {
    //判斷購物車是否有資料 =>如果有 :
    if (localStorage.getItem("cartData")) {
      // 判斷這個商品有沒有被加進購物車
      let nowCart = JSON.parse(localStorage.getItem("cartData"));
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
        localStorage.setItem("cartData", JSON.stringify(nowCart));
      } else {
        // 如果沒有相同商品 => 將就的購物車+選擇的這個商品
        const newSelect = [...nowCart, selectProduct];
        localStorage.setItem("cartData", JSON.stringify(newSelect));
      }
    } else {
      // 購物車沒東西 => 將選擇商品加進去
      const array = [selectProduct];
      localStorage.setItem("cartData", JSON.stringify(array));
    }
  };
  return (
    <>
      <div className={styles["icon-button"]}>
        <FaRegHeart size={30} />
        <IoCart
          size={30}
          onClick={() => {
            // 先抓取商品資料、使用者選的數量
            // 把這些資料加進localstorage
            setNewLocalS({
              product_pic: data.product_pic,
              product_id: data.product_id,
              product_name: data.product_name,
              product_price: data.product_price,
              subTotalPrice: data.product_price * cartQuantity,
              user_buy_qty: cartQuantity,
            });
            Alert.fire({
              titleText: "加入購物車",
              text: "成功加入1筆購物車",
            });
          }}
        />
      </div>
    </>
  );
}
