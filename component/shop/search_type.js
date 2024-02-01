import React, { useEffect, useState } from 'react'
import styles from '@/styles/shop_search.module.css'


export default function SearchShopType (props) {
  
  const [searchShopType,setSearchShopType]=useState(0)
  
  useEffect(() => {
    // 由props得到父母元件傳來的方法，傳入自己本身的內部狀態並呼叫(回送資料給父母)
    props.setDataFromShopType(searchShopType)
  }, [searchShopType])

  return (
    <>
      <div className={styles.flex_center} style={{marginBottom:20}}>
        <span className={styles.search_flex} style={{width:500}}>
        {/* <p>{searchShopType}</p> */}
        <span className={searchShopType===1? styles.selected_children_button: styles.children_button} style={{width:85}}
        onClick={()=>{
          setSearchShopType(searchShopType===2||3||4||5? 1:0);
          setSearchShopType(searchShopType===1? 0:1);
        }
          }>下午茶</span>
        <span className={searchShopType===2? styles.selected_children_button: styles.children_button} style={{width:85}} 
        onClick={()=>{
          setSearchShopType(searchShopType===1||3||4||5? 2:0);
          setSearchShopType(searchShopType===2? 0:2);
          }
          }>日式料理</span>
        <span className={searchShopType===3? styles.selected_children_button: styles.children_button} style={{width:85}} 
        onClick={()=>{
          setSearchShopType(searchShopType===1||2||4||5? 3:0);
          setSearchShopType(searchShopType===3? 0:3);
          }
          }>美式料理</span>
          <span className={searchShopType===4? styles.selected_children_button: styles.children_button} style={{width:85}} 
        onClick={()=>{
          setSearchShopType(searchShopType===1||2||3||5? 4:0);
          setSearchShopType(searchShopType===4? 0:4);
          }
          }>義式料理</span>
          <span className={searchShopType===5? styles.selected_children_button: styles.children_button} style={{width:85}} 
        onClick={()=>{
          setSearchShopType(searchShopType===1||2||3||4? 5:0);
          setSearchShopType(searchShopType===5? 0:5);
          }
          }>鍋物</span>
      </span>
      </div>
    </>
  )
}
