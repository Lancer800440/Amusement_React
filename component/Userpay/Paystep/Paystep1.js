import React from "react";
import Image from "next/image";
// import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import styles from '@/component/Userpay/Paystep/Paystep1.module.css'

export default function Paystep({
  product_name = "女鞋",
  product_price = 1990,
}) {
  return (
    <>
      <div className={styles.shopping_step}>
        <div>1. 您的購物車</div>
        <div>
          <FaChevronRight />
        </div>
        <div>2. 填寫付款資料</div>
        <div>
          <FaChevronRight />
        </div>
        <div>3. 成立訂單</div>
      </div>
    </>
  );
}
