import React from 'react'
import styles from '@/styles/restaurant_detail.module.css'
import { FaPhoneAlt } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaUtensils } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";
import Link from 'next/link'
import { useRouter } from 'next/router'
import Head from 'next/head';
import { SHOP_GET_ONE, GET_SAME_TYPE_SHOP } from '@/component/ride-const';
import { useState,useEffect } from 'react';
import { Layout } from '@/component/ride-layout';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content' 


export default function RestaurantDetail() {
  const [getData, setGetData] = useState({
    shop_id:"",
    shop_name:"",
    shop_name2:"",
    shop_type_id:'',
    shop_type_name:"",
    shop_type_name2:"",
    shop_img:"", 
    shop_img1:"", 
    shop_img2:"", 
    shop_img3:"", 
    shop_img4:"",
    menu:'',
    phone:"" 
  });
  const [getTypeData, setGetTypeData] = useState({});
  const Alert = withReactContent(Swal) ;
  const router = useRouter();


  useEffect(() => {
    const shop_id = +router.query.shop_id;
    console.log({shop_id, raw: router.query.shop_id });
    // 有抓到值時
    if (router.query.shop_id !== undefined) {
      if (!shop_id) {
        router.push("/shop"); //shop_id 是 NaN 就跳到列表頁
      } else {
        // 取得單筆資料
        fetch(SHOP_GET_ONE + "/" + shop_id)
          .then((r) => r.json())
          .then((data) => {
            if (!data.success) {
              router.push("/shop"); // 沒拿到資料, 跳到列表頁
            } else {
              setGetData({ ...data.row });
            }
          })
          .catch((ex) => console.log(ex));
      }
    }
  },[router.query.shop_id]);

  const showMenu = () => {
    Alert.fire({ 
      didOpen: () => { 
          Alert.fire({
            titleText:getData.shop_name+' Menu',
            width:900,
            imageUrl:`/images/restaurant/${getData.shop_type_name2}/${getData.shop_name2}/menu/${getData.menu}`,
            imageWidth:'100%',
            imageHeight:'100%' 
          })
        }
  })
  };

  const getTypeList = async()=>{
    try {
      const r = await fetch(
        GET_SAME_TYPE_SHOP + 
        '?' + `shop_type_id=${getData.shop_type_id}` + '&'
        + `shop_id=${getData.shop_id}`);
        const d = await r.json();
        setGetTypeData(d);
    } catch (ex) {
      console.log(ex)
    }
  }
  
  useEffect(()=>{
    getTypeList()
  },[getData.shop_type_id,getData.shop_id]);
  return (
        <Layout key={getData.shop_id}>
          <h2 className={styles.title}>餐廳詳細資料</h2>
          <div className={styles.button_flex}>
            <Link href='/restaurant'>
              <button className={styles.button}>返回餐廳列表頁</button>
            </Link>
          </div>
          
          <div className={styles.flex_center}>
          <img className={styles.img} src={`/images/restaurant/${getData.shop_type_name2}/${getData.shop_name2}/food/${getData.shop_img}`}/>
            <div style={{width:600, lineHeight:2.3,paddingLeft:50}}>
            
            <h2>{getData.shop_name}</h2>
              <p>類型：{getData.shop_type_name}</p>
              <p className={styles.menu} onClick={showMenu}><FaUtensils /> 菜單</p>
              <p><FaRegClock /> 星期一：11：00~19：00 </p>
              <p style={{marginLeft:20}}>星期二：11：00~19：00 </p>
              <p style={{marginLeft:20}}>星期三：11：00~19：00 </p>
              <p style={{marginLeft:20}}>星期四：11：00~19：00 </p>
              <p style={{marginLeft:20}}>星期五：11：00~20：00 </p>
              <p style={{marginLeft:20}}>星期六：10：00~20：00 </p>
              <p style={{marginLeft:20}}>星期日：10：00~20：00 </p>
              <p ><FaPhoneAlt /> {getData.phone}</p>
              <div className={styles.space_between}>
                <span><FaRegCheckCircle /> 有座位</span>
                <span><FaRegCheckCircle /> 可外帶</span>
              </div>
            </div>
          </div>
          <div className={styles.food_img}>
            <img className={styles.mini_img} src={`/images/restaurant/${getData.shop_type_name2}/${getData.shop_name2}/food/${getData.shop_img1}`}/>
            <img className={styles.mini_img} src={`/images/restaurant/${getData.shop_type_name2}/${getData.shop_name2}/food/${getData.shop_img2}`}/>
            <img className={styles.mini_img} src={`/images/restaurant/${getData.shop_type_name2}/${getData.shop_name2}/food/${getData.shop_img3}`}/>
            <img className={styles.mini_img} src={`/images/restaurant/${getData.shop_type_name2}/${getData.shop_name2}/food/${getData.shop_img4}`}/>
          </div>
          <h2 className={styles.title}>類似餐廳</h2>
          <div className={styles.card_flex}>
            {/* <div className={styles.card}>
              <img className={styles.card_img} src='/images/restaurant/teatime/street_churros/food/street_churros_food1.webp'/>
              <div style={{padding:5}}>
                <div className={styles.card_title}>餐廳名稱</div>
                <div>餐廳敘述餐廳敘述餐廳敘述餐廳敘述餐廳敘述餐廳敘述餐廳敘述餐廳敘述餐廳敘述餐廳敘述</div>
            </div>
          </div>
          <div className={styles.card}>
            <img className={styles.card_img} src='/images/restaurant/teatime/street_churros/food/street_churros_food1.webp'/>
            <div style={{padding:5}}>
              <div className={styles.card_title}>餐廳名稱</div>
              <div>餐廳敘述餐廳敘述餐廳敘述餐廳敘述餐廳敘述餐廳敘述餐廳敘述餐廳敘述餐廳敘述餐廳敘述</div>
            </div>
          </div>
          <div className={styles.card}>
            <img className={styles.card_img} src='/images/restaurant/teatime/street_churros/food/street_churros_food1.webp'/>
            <div style={{padding:5}}>
              <div className={styles.card_title}>餐廳名稱</div>
              <div>餐廳敘述餐廳敘述餐廳敘述餐廳敘述餐廳敘述餐廳敘述餐廳敘述餐廳敘述餐廳敘述餐廳敘述</div>
            </div>
          </div> */}
          {getTypeData.rows && getTypeData.rows.map((i)=>{
                return(
                  <div key={i.shop_id} className={styles.card}>
                    <Link href={`/restaurant/details/${i.shop_id}`}>
                      <img className={styles.card_img} src={`/images/restaurant/${i.shop_type_name2}/${i.shop_name2}/food/${i.shop_img}`}/>
                      <div style={{padding:10}}>
                        <div className={styles.space_between2}>
                          <div className={styles.card_title}>{i.shop_name}</div>
                          <div className={styles.tag} style={{backgroundColor:i.tag_color}}>{i.shop_type_name}</div>
                        </div>
                      </div>
                    </Link>
                  </div>
                )
              })
              }
          </div>
        <Head><title>餐廳資訊</title></Head>
        </Layout>
  )
}
