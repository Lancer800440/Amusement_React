import React from "react";
import styles from "@/component/Icon-nav/Icon-nav.module.css";
import { AB_LIST } from "@/component/product-const";
import { useRouter } from "next/router";
import { useState, useContext, useEffect } from "react";
import SearchStyleType from "@/component/Icon-nav/search_style";

// import Link from "next/link";

export default function Card() {
  const [data, setData] = useState({});
  const router = useRouter();
  const [dataFromStyleType, setDataFromStyleType] = useState(0);

  const getListData = async () => {
    try {
      const r = await fetch(
        AB_LIST +
          "?" +
          (dataFromStyleType === 0 ? "" : `pdstyle_id=${dataFromStyleType}`)
      );
      const d = await r.json();
      setData(d);
    } catch (ex) {
      console.log(ex);
    }
  };
  useEffect(() => {
    getListData();
  }, [dataFromStyleType]);
  return (
    <>
      <SearchStyleType setDataFromStyleType={setDataFromStyleType} />
      <div className={styles.icon_nav}>
        <button
          onClick={() => {
            setSearchStyleType(searchStyleType === 2 || 3 || 4 || 5 ? 1 : 0);
            setSearchStyleType(searchStyleType === 1 ? 0 : 1);
          }}
        >
          米奇
        </button>

        <button
          onClick={() => {
            setSearchStyleType(searchStyleType === 1 || 3 || 4 || 5? 2 : 0);
            setSearchStyleType(searchStyleType === 2 ? 0 : 2);
          }}
        >
          米妮
        </button>

        <button
          onClick={() => {
            setSearchStyleType(searchStyleType === 1 || 2 || 4 || 5? 3 : 0);
            setSearchStyleType(searchStyleType === 3 ? 0 : 3);
          }}
        >
          唐老鴨
        </button>

        <button
          onClick={() => {
            setSearchStyleType(searchStyleType === 1 || 2 || 3 || 5? 4 : 0);
            setSearchStyleType(searchStyleType === 4 ? 0 : 4);
          }}
        >
          高飛
        </button>

        <button
          onClick={() => {
            setSearchStyleType(searchStyleType === 1 || 2 || 3 || 4? 5 : 0);
            setSearchStyleType(searchStyleType === 5 ? 0 : 5);
          }}
        >
          維尼
        </button>
      </div>
    </>
  );
}
