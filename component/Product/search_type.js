import React, { useEffect, useState } from 'react'
import styles from '@/styles/shop_search.module.css'


export default function SearchProductType (props) {
  
  const [searchProductType,setSearchProductType]=useState(0)
  
  useEffect(() => {
    // 由props得到父母元件傳來的方法，傳入自己本身的內部狀態並呼叫(回送資料給父母)
    props.setDataFromShopType(searchProductType)
  }, [searchProductType])

  return (
    <>
      <div className={styles.flex_center} style={{marginBottom:20}}>
        <span className={styles.search_flex} style={{width:500}}>
        {/* <p>{searchProductType}</p> */}
        <span className={searchProductType===1? styles.selected_children_button: styles.children_button} style={{width:85}}
        onClick={()=>{
          setSearchProductType(searchProductType===2||3||4||5? 1:0);
          setSearchProductType(searchProductType===1? 0:1);
        }
          }>下午茶</span>
        <span className={searchProductType===2? styles.selected_children_button: styles.children_button} style={{width:85}} 
        onClick={()=>{
          setSearchProductType(searchProductType===1||3||4||5? 2:0);
          setSearchProductType(searchProductType===2? 0:2);
          }
          }>日式料理</span>
        <span className={searchProductType===3? styles.selected_children_button: styles.children_button} style={{width:85}} 
        onClick={()=>{
          setSearchProductType(searchProductType===1||2||4||5? 3:0);
          setSearchProductType(searchProductType===3? 0:3);
          }
          }>美式料理</span>
          <span className={searchProductType===4? styles.selected_children_button: styles.children_button} style={{width:85}} 
        onClick={()=>{
          setSearchProductType(searchProductType===1||2||3||5? 4:0);
          setSearchProductType(searchProductType===4? 0:4);
          }
          }>義式料理</span>
          <span className={searchProductType===5? styles.selected_children_button: styles.children_button} style={{width:85}} 
        onClick={()=>{
          setSearchProductType(searchProductType===1||2||3||4? 5:0);
          setSearchProductType(searchProductType===5? 0:5);
          }
          }>鍋物</span>
      </span>
      </div>
    </>
  )
}
