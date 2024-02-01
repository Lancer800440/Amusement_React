import React, { useEffect, useState } from 'react'
import styles from '@/styles/ride_search.module.css'

export default function SearchCategory (props) {
  const [searchCategory,setSearchCategory]=useState(0)
  useEffect(() => {
    // 由props得到父母元件傳來的方法，傳入自己本身的內部狀態並呼叫(回送資料給父母)
    props.setDataFromCategory(searchCategory)
  }, [searchCategory])

  return (
    <>
      <span className={styles.search_flex} style={{width:500}}>
        <span className={styles.button} style={{width:50}}>類型</span>
        <span className={searchCategory===1? styles.selected_children_button: styles.children_button} style={{width:85}}
        onClick={()=>{
          setSearchCategory(searchCategory===2||3? 1:0);
          setSearchCategory(searchCategory===1? 0:1);
        }
          }>兒童友善</span>
        <span className={searchCategory===2? styles.selected_children_button: styles.children_button} style={{width:85}} 
        onClick={()=>{
          setSearchCategory(searchCategory===1||3? 2:0);
          setSearchCategory(searchCategory===2? 0:2);
          }
          }>親子同樂</span>
        <span className={searchCategory===3? styles.selected_children_button: styles.children_button} style={{width:85}} 
        onClick={()=>{
          setSearchCategory(searchCategory===1||2? 3:0);
          setSearchCategory(searchCategory===3? 0:3);
          }
          }>刺激冒險</span>
      </span>
    </>
  )
}
