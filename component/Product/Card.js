import React from "react";
import styles from "@/component/product/Card.module.css";
import Icon from "./Icon/Icon";
import Link from "next/link";

export default function Card({ data }) {
  // 確保 data.product_pic 是字串
  const photoArray = typeof data.product_pic === 'string' ? data.product_pic.split(",") : [];

  // 確認陣列至少有一張圖片
  const firstImage = photoArray.length > 0 ? photoArray[0] : "";

  return (
    <>
      {/* <pre>{JSON.stringify(data, null, 4)}</pre> */}
      <div className={styles["w-262"]}>
        <Link href={`/product/${data.product_id}`}>
          <img
            src={`/images/product/list/${firstImage}`}
            className=""
            alt="..."
          />
          <p className={styles["card-text"]}>{data.product_name}</p>
          <span className={styles["price-text"]}>$ {data.product_price}</span>
        </Link>
        <Icon data={data} />
      </div>
    </>
  );
}
