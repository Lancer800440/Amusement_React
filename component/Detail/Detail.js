import React, { useEffect } from "react";
import styles from "@/component/Order/Order.module.css";
import Image from "next/image";
// import Link from "next/link";

export default function Detail({
  photo,
  name,
  quantity,
  price,
  amount,
}) {
  return (
    <div className={styles.order_detail_nav}>
      <div className={styles.order_detail_nav_title}>
        <img
          src={`/images/product/list/${photo}`}
          alt="..."
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      <div className={styles.order_details1}>
        <div>{name}</div>
        <div>{quantity}</div>
        <div>{price}</div>
        <div>{amount}</div>
      </div>
    </div>
  );
}