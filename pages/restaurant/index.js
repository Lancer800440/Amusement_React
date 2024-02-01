import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/restaurant.module.css";
import { FaChevronRight } from "react-icons/fa6";
import { Layout } from "@/component/ride-layout";
import { SHOP_LIST } from "@/component/ride-const";
import { useRouter } from "next/router";
import { useState, useContext, useEffect } from "react";
import Link from "next/link";
import SearchShopType from "@/component/shop/search_type";

export default function Shop() {
  const [data, setData] = useState({});
  const router = useRouter();
  const [dataFromShopType, setDataFromShopType] = useState(0);

  const getListData = async () => {
    try {
      const r = await fetch(
        SHOP_LIST +
          "?" +
          (dataFromShopType === 0 ? "" : `shop_type_id=${dataFromShopType}`)
      );
      const d = await r.json();
      setData(d);
    } catch (ex) {
      console.log(ex);
    }
  };
  useEffect(() => {
    getListData();
  }, [dataFromShopType]);
  return (
    <Layout>
      <div className={styles.contain}>
        <img
          className={styles.head_img}
          width="100%"
          height={300}
          src={"/images/restaurant/food.jpg"}
        />
        <h2 className={styles.title}>餐廳列表</h2>
        {/* <p>篩選狀態：{dataFromShopType}</p> */}
        <SearchShopType setDataFromShopType={setDataFromShopType} />
        <div className={styles.card_contain}>
          <div className={styles.card_flex}>
            {data.rows &&
              data.rows.map((i) => {
                return (
                  <div key={i.shop_id}>
                    <Link href={`/restaurant/details/${i.shop_id}`}>
                      <div className={styles.card}>
                        <img
                          className={styles.card_img}
                          src={`/images/restaurant/${i.shop_type_name2}/${i.shop_name2}/food/${i.shop_img}`}
                        />
                        <div style={{ padding: 10 }}>
                          <div className={styles.space_between}>
                            <div className={styles.card_title}>
                              {i.shop_name}
                            </div>
                            <div
                              className={styles.tag}
                              style={{ backgroundColor: i.tag_color }}
                            >
                              {i.shop_type_name}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <Head>
        <title>餐廳列表</title>
      </Head>
    </Layout>
  );
}
