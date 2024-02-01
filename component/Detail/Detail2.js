import React, { useEffect } from "react";
import styles from "@/component/Order/Order.module.css";
import Image from "next/image";
// import Link from "next/link";

export default function Detail2({
  userpay,
  bill,
  recipient_address,
  address_detail,
}) {
  return (
    <div className={styles.w_100}>
      <div className={styles.payment_details}>
        <span>付款方式: {userpay}</span>
        <span>發票類型: {bill}</span>
        <span>取貨方式: {recipient_address}</span>
        {/* <span>優惠券: {ibon_name}</span> */}
      </div>

      <div className={styles.payment_address}>
        <span>收貨地址: {address_detail}</span>
      </div>
    </div>
  );
}
