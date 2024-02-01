import { useState, useEffect } from "react";
import { Layout } from "@/component/Layout";
import { AB_ORDER_DETAILS, AB_ORDER_DETAILS2 } from "@/component/product-const";
import { useRouter } from "next/router";
import styles from "@/component/Order/Order.module.css";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import Detail from "@/component/Detail/Detail";
import Detail2 from "../Detail/Detail2";
import dayjs from "dayjs";

export default function Card(v) {
  const [details, setDetails] = useState({});
  const [details2, setDetails2] = useState({});
  const [showDetails, setShowDetails] = useState(false);
  const getOrderDetailsData = async (id) => {
    const target_id = id;
    // let page = +router.query.page || 1;

    // if (page < 1) page = 1;

    try {
      const r = await fetch(AB_ORDER_DETAILS, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ order_id: target_id }),
      });
      const d = await r.json();
      // console.log("eddie", d);
      setDetails(d);
    } catch (ex) {
      console.log(ex);
    }
  };

  const getOrderDetails2Data = async (id) => {
    const target_id = id;
    // let page = +router.query.page || 1;

    // if (page < 1) page = 1;

    try {
      const r = await fetch(AB_ORDER_DETAILS2, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ order_id: target_id }),
      });
      const d = await r.json();
      // console.log("eddie", d);
      setDetails2(d);
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    
    <div className={styles.w_100}>
      <div className={styles.order_navs} key={v.data.order_id} data={v}>
        <div className={styles.order_nav}>
          <div className={styles.order_nav_code}>{v.data.order_id}</div>
          <div className={styles.order_nav_titles}>
            <div>{dayjs(v.data.order_date).format('YYYY/MM/DD HH:mm')}</div>
            <div>{v.data.odstatus_name}</div>
            <div>
              {showDetails ? (
                <IoIosArrowUp
                  className={styles.order_icon}
                  onClick={() => {
                    setShowDetails((showDetails) => {
                      if (showDetails) {
                        return false;
                      } else {
                        return true;
                      }
                    });
                  }}
                />
              ) : (
                <IoIosArrowDown
                  className={styles.order_icon}
                  onClick={() => {
                    getOrderDetailsData(v.data.order_id),
                      getOrderDetails2Data(v.data.order_id),
                      setShowDetails((showDetails) => {
                        if (showDetails) {
                          return false;
                        } else {
                          return true;
                        }
                      });
                  }}
                />
              )}
            </div>
          </div>
        </div>
        {details.order_details?.length && showDetails && (
          <div className={styles.order_detail_nav1}>
            <div className={styles.order_detail_nav_title1}>商品圖片</div>
            <div className={styles.order_details}>
              <div>商品名稱</div>
              <div>數量</div>
              <div>單價</div>
              <div>小計</div>
            </div>
          </div>
        )}
        {details.order_details?.length &&
          showDetails &&
          details.order_details.map((v, i) => {
            return (
              <Detail
                key={v.order_details_id}
                name={v.product_name}
                price={v.product_price}
                amount={v.product_price * v.order_quantity}
                quantity={v.order_quantity}
                photo={v.product_pic.split(",")[0]}
              />
            );
          })}
      </div>
      {details2.order_details2?.length && showDetails && (
        <Detail2
          key={details2.order_details2[0].order_id}
          userpay={details2.order_details2[0].userpay_name}
          bill={details2.order_details2[0].bill_name}
          recipient_address={details2.order_details2[0].recipient_address_name}
          address_detail={details2.order_details2[0].address_detail}
        />
      )}
    </div>
  );
}