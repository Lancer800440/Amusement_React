import React from 'react'
import styles from '@/styles/ride_search.module.css'
import { FaStar } from "react-icons/fa6";
import { useState,useEffect } from 'react';


export default function SearchThrillerRating(props) {
  const [searchThrillerRating,setSearchThrillerRating]=useState(0)
  useEffect(() => {
    // 由props得到父母元件傳來的方法，傳入自己本身的內部狀態並呼叫(回送資料給父母)
    props.setDataFromThrillerRating(searchThrillerRating)
  }, [searchThrillerRating])
  return (
    <>
      <span className={styles.search_flex} style={{width:500}}>
        <span className={styles.button} style={{width:85}}>刺激程度</span>
        <span className={searchThrillerRating===1? styles.selected_children_button: styles.children_button} style={{width:35}} 
        onClick={()=>{
          setSearchThrillerRating(searchThrillerRating===2||3||4||5? 1:0);
          setSearchThrillerRating(searchThrillerRating===1? 0:1);
          }
          }><FaStar /></span>
        <span className={searchThrillerRating===2? styles.selected_children_button: styles.children_button} style={{width:50}} 
        onClick={()=>{
          setSearchThrillerRating(searchThrillerRating===1||3||4||5? 2:0);
          setSearchThrillerRating(searchThrillerRating===2? 0:2);
          }
          }><FaStar /><FaStar /></span>
        <span className={searchThrillerRating===3? styles.selected_children_button: styles.children_button} style={{width:65}} 
        onClick={()=>{
          setSearchThrillerRating(searchThrillerRating===1||2||4||5? 3:0);
          setSearchThrillerRating(searchThrillerRating===3? 0:3);}
          }><FaStar /><FaStar /><FaStar /></span>
        <span className={searchThrillerRating===4? styles.selected_children_button: styles.children_button} style={{width:80}} 
        onClick={()=>{
          setSearchThrillerRating(searchThrillerRating===1||3||2||5? 4:0);
          setSearchThrillerRating(searchThrillerRating===4? 0:4);
          }
          }><FaStar /><FaStar /><FaStar /><FaStar /></span>
        <span className={searchThrillerRating===5? styles.selected_children_button: styles.children_button} style={{width:95}} 
        onClick={()=>{
          setSearchThrillerRating(searchThrillerRating===1||3||4||2? 5:0);
          setSearchThrillerRating(searchThrillerRating===5? 0:5);
          }
          }><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></span>
      </span>
    </>
  )
}
