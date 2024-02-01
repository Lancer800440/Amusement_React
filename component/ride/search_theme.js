import { useState } from 'react'
import React from 'react'
import styles from '@/styles/ride_search.module.css'
import { useEffect } from 'react'

export default function SearchTheme(props) {
  const [searchTheme,setSearchTheme]=useState(0)
  useEffect(() => {
    // 由props得到父母元件傳來的方法，傳入自己本身的內部狀態並呼叫(回送資料給父母)
    props.setDataFromTheme(searchTheme)
  }, [searchTheme])
  return (
    <>
      <span  className={styles.search_flex} style={{width:500}}>
        <span className={styles.button} style={{width:50}}>主題</span>
        <span className={searchTheme===1?styles.selected_children_button : styles.children_button} style={{width:70}} 
        onClick={()=>{
          setSearchTheme(searchTheme===2||3||4? 1:0);
          setSearchTheme(searchTheme===1? 0:1);
          }
          }>水世界</span>
        <span className={searchTheme===2?styles.selected_children_button :styles.children_button} style={{width:85}} 
        onClick={()=>{
          setSearchTheme(searchTheme===1||3||4? 2:0);
          setSearchTheme(searchTheme===2? 0:2);
          }
          }>冒險之旅</span>
        <span className={searchTheme===3?styles.selected_children_button : styles.children_button} style={{width:85}}
        onClick={()=>{
          setSearchTheme(searchTheme===1||2||4? 3:0);
          setSearchTheme(searchTheme===3? 0:3);
          }
          }>慢樂悠遊</span>
        <span className={searchTheme===4?styles.selected_children_button : styles.children_button} style={{width:85}} 
        onClick={()=>{
          setSearchTheme(searchTheme===1||2||3? 4:0);
          setSearchTheme(searchTheme===4? 0:4);
          }
          }>樂高天堂</span>
      </span>
    </>
  )
}
