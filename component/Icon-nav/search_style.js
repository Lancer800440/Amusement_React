import React, { useEffect, useState } from "react";
import styles from "@/component/Icon-nav/Icon-nav.module.css";

const ALL = 0;
const MICKY = 1;
const MINNIE = 2;
const DUCK = 3;
const DOG = 4;
const BEAR = 5;


export default function SearchStyleType(props) {
  const [searchStyleType, setSearchStyleType] = useState(ALL);

  useEffect(() => {
    // 由props得到父母元件傳來的方法，傳入自己本身的內部狀態並呼叫(回送資料給父母)
    props.setDataFromStyleType(searchStyleType);
  }, [searchStyleType]);

  return (
    <>
      <div className={styles.icon_nav}>
        <button className={styles.icon_button}
          onClick={() => {
            setSearchStyleType(MICKY);
          }}
        >
          米奇
        </button>

        <button className={styles.icon_button}
          onClick={() => {
            setSearchStyleType(MINNIE);
          }}
        >
          米妮
        </button>

        <button className={styles.icon_button}
          onClick={() => {
            setSearchStyleType(DUCK);
          }}
        >
          唐老鴨
        </button>

        <button className={styles.icon_button}
          onClick={() => {
            setSearchStyleType(DOG);
          }}
        >
          高飛
        </button>

        <button className={styles.icon_button}
          onClick={() => {
            setSearchStyleType(BEAR);
          }}
        >
          維尼
        </button>

        <button
          className={styles.clean}
          onClick={() => {
            setSearchStyleType(ALL);
          }}
        >
          重新篩選
        </button>
      </div>
    </>
  );
}
