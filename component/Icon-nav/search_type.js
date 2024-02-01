import React, { useEffect, useState } from "react";
import styles from "@/component/Icon-nav/Icon-nav.module.css";

const ALL = 0;
const CLOTHES = 1;
const DOLLS = 3;
const BAGS = 4;

export default function SearchCateType(props) {
  const [searchCateType, setSearchCateType] = useState(ALL);

  useEffect(() => {
    // 由props得到父母元件傳來的方法，傳入自己本身的內部狀態並呼叫(回送資料給父母)
    props.setDataFromCateType(searchCateType);
  }, [searchCateType]);

  return (
    <>
      <div className={styles.icon_nav}>
        <button
          onClick={() => {
            setSearchCateType(CLOTHES);
          }}
        >
          <img src="\images\icon-button\iconshirt.png" classname="" alt="..." />
        </button>

        <button
          onClick={() => {
            setSearchCateType(BAGS);
          }}
        >
          <img src="\images\icon-button\iconbag.png" classname="" alt="..." />
        </button>

        <button
          onClick={() => {
            setSearchCateType(DOLLS);
          }}
        >
          <img src="\images\icon-button\icontoy.png" classname="" alt="..." />
        </button>

        <button
          className={styles.clean}
          onClick={() => {
            setSearchCateType(ALL);
          }}
        >
          重新篩選
        </button>
      </div>
    </>
  );
}
