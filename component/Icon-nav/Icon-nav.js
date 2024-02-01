import React from "react";
import styles from "@/component/Icon-nav/Icon-nav.module.css";
import { AB_LIST } from "@/component/product-const";
import { useRouter } from "next/router";
import { useState, useContext, useEffect } from "react";
import SearchCateType from "@/component/Icon-nav/search_type";

// import Link from "next/link";

export default function Card() {
  const [data, setData] = useState({});
  const router = useRouter();
  const [dataFromCateType, setDataFromCateType] = useState(0);

  const getListData = async () => {
    try {
      const r = await fetch(
        AB_LIST +
          "?" +
          (dataFromCateType === 0 ? "" : `pdcate_id=${dataFromCateType}`)
      );
      const d = await r.json();
      setData(d);
    } catch (ex) {
      console.log(ex);
    }
  };
  useEffect(() => {
    getListData();
  }, [dataFromCateType]);
  return (
    <>
      <SearchCateType setDataFromCateType={setDataFromCateType} />
      <div className={styles.icon_nav}>
        <button
          onClick={() => {
            setSearchCateType(searchCateType === 3 || 4 ? 1 : 0);
            setSearchCateType(searchCateType === 1 ? 0 : 1);
          }}
        >
          <img src="\images\icon-button\iconshirt.png" className="" alt="..." />
        </button>
        <button
          onClick={() => {
            setSearchCateType(searchCateType === 1 || 4 ? 3 : 0);
            setSearchCateType(searchCateType === 3 ? 0 : 3);
          }}
        >
          <img src="\images\icon-button\iconbag.png" classname="" alt="..." />
        </button>
        <button
          onClick={() => {
            setSearchCateType(searchCateType === 1 || 3 ? 4 : 0);
            setSearchCateType(searchCateType === 4 ? 0 : 4);
          }}
        >
          <img src="\images\icon-button\icontoy.png" classname="" alt="..." />
        </button>
      </div>
    </>
  );
}
