import { useContext, useEffect, useState } from "react";
import { Layout } from "@/component/product-layout";
import { AB_LIST } from "@/component/product-const";
// import ThemeContext from "@/context/ThemeContext";
import Link from "next/link";
import { useRouter } from "next/router";
import Card from "@/component/Product/Card";
// import Slider from "@/component/Slider/Slider";
import styles from "@/component/Page-select/Page-select.module.css";
import SearchCateType from "@/component/Icon-nav/search_type";
// import SearchStyleType from "@/component/Icon-nav/search_style";
import Head from "next/head";

export default function List() {
  const [data, setData] = useState({});
  const router = useRouter();
  const [dataFromCateType, setDataFromCateType] = useState(0);
  // const [dataFromStyleType, setDataFromStyleType] = useState(0);

  const getListData = async () => {
    let page = +router.query.page || 1;

    if (page < 1) page = 1;

    try {
      const r = await fetch(
        `${AB_LIST}?page=${page}` +
          (dataFromCateType === 0 ? "" : `&pdcate_id=${dataFromCateType}`)
          // +
          // (dataFromStyleType === 0 ? "" : `&pdstyle_id=${dataFromStyleType}`)
      );
      const d = await r.json();
      setData(d);
    } catch (ex) {
      console.log(ex);
    }
  };

  useEffect(() => {
    getListData();
  }, [router.query.page, dataFromCateType]);

  return (
    <>
      <Layout>
        <Head>
          <title>產品頁面</title>
        </Head>
        {/* <SearchStyleType setDataFromStyleType={setDataFromStyleType} /> */}
        <SearchCateType setDataFromCateType={setDataFromCateType} />
        <div className={styles.product_container}>
          {data.rows?.length &&
            data.rows.map((v) => {
              return <Card key={v.product_id} data={v} />;
            })}

          <div className={styles.page_nav}>
            {data.success && data.totalPages
              ? Array(7)
                  .fill(1)
                  .map((v, i) => {
                    const p = data.page - 3 + i;
                    if (p < 1 || p > data.totalPages) return null;
                    return (
                      <div
                        key={p}
                        className={
                          p === data.page
                            ? `${styles.page_item} ${styles.active}`
                            : styles.page_item
                        }
                      >
                        <Link className={styles.page_link} href={"?page=" + p}>
                          {p}
                        </Link>
                      </div>
                    );
                  })
              : null}
          </div>
        </div>
      </Layout>
    </>
  );
}
