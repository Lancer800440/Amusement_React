import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/show.module.css'
import { FaChevronRight } from "react-icons/fa6";
import { Layout } from '@/component/ride-layout';
import { SHOW_LIST } from '@/component/ride-const';
import { useRouter } from 'next/router';
import { useState,useContext,useEffect } from 'react';
import Link from 'next/link';

export default function Show() {
  const [data, setData] = useState({});
  const router = useRouter();
  const getListData = async () => {
    
    try {
      const r = await fetch(SHOW_LIST);
      const d = await r.json();
      // console.log(value)
      setData(d);
    } catch (ex) {
      console.log(ex)
    }
  };
  useEffect(() => {
    getListData();
  },[]);
  return (
    <>
      <Layout>
        <div className={styles.contain}>
          <img className={styles.head_img} width='100%' height={300} src={'/images/show/show.jpg'} />
          <h2 className={styles.title}>表演節目</h2>
          <div className={styles.card_contain}>
            <div className={styles.card_flex}>
              {data.rows &&
                data.rows.map((i)=>{
                  return (
                    <div key={i.show_id}>
                      <Link href={`/show/details/${i.show_id}`}>
                        <div className={styles.card}>
                          <img className={styles.card_img} src={`/images/show/${i.show_pic}`}/>
                          <div style={{padding:15}}>
                            <div className={styles.card_title}>{i.show_group}</div>
                            <div className={styles.card_title}>{i.show_name}</div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  )
                })
              }
            </div>
          </div>
          
        </div>
      </Layout>
      <Head><title>表演列表</title></Head>
    </>
  )
}
